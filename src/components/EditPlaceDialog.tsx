import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputMask from "react-input-mask";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AppState } from "../store";
import { CountriesState } from "../slices/countriesSlice";

function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      variant="outlined"
      margin="normal"
      size="small"
      style={{ width: "500px" }}
      {...props}
    />
  );
}

const Form = styled.form`
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export type EditPlaceDialogProps = {
  open?: boolean;
  id: string;
  countryCode: string;
  name: string;
  goal: string;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  onSubmit?: (newData: { id: string; countryCode: string; name: string; goal: string; }) => void;
};

function EditPlaceDialog(props: EditPlaceDialogProps) {
  const countries = useSelector<AppState, CountriesState>(state => state.countries);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    setCountry(props.countryCode);
    setName(props.name || "");
    setGoal(props.goal || "");
  }, [props.countryCode, props.name, props.goal]);

  return (
    <Dialog onClose={props.onClose} open={Boolean(props.open)}>
      <DialogTitle>Editar Diálogo</DialogTitle>
      <Form
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit && props.onSubmit({ 
            id: props.id,
            countryCode: country,
            name,
            goal
          });
        }}
      >
        <img alt="" width="100px" src={countries.find(c => c.id === country)?.flag} />
        <MuiSelect
          variant="outlined"
          label="País"
          value={country}
          onChange={(e) => setCountry(String(e.target.value))}
          native
        >
          {countries.map(c => (
            <option value={c.id}>{c.name}</option>
          ))}
          </MuiSelect>

        <TextField
          label="Local"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%' }}
        />

        <InputMask
          mask="99/9999"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              label="Meta"
              style={{ width: '100%' }}
            />
          )}
        </InputMask>

        <Button sx={{ mt: 2 }} variant="contained" type="submit">
          Atualizar
        </Button>
      </Form>
    </Dialog>
  );
}

export default EditPlaceDialog;
