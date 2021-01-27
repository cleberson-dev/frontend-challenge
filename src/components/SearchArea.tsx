import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import Select from "./Select";
import Input from "./Input";
import Button from "./Button";
import FormControl from "./FormControl";
import { AppState } from "../store";
import { CountriesState } from "../slices/countriesSlice";
import { addPlace } from "../slices/placesSlice";
import { notify } from "../slices/notificationSlice";
import { placeValidator } from "../validators";
import * as S from "./SearchArea.styles";

function SearchArea() {
  const dispatch = useDispatch();
  const countries = useSelector<AppState, CountriesState>(
    (state) => state.countries
  );
  const [country, setCountry] = useState("");
  const [goal, setGoal] = useState("");
  const [local, setLocal] = useState("");

  function clearInputs() {
    setCountry("");
    setGoal("");
    setLocal("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      countryCode: country,
      name: local,
      goal,
    };

    const { valid, message } = placeValidator(payload);
    if (!valid) {
      return dispatch(notify({ type: "error", message }));
    }

    try {
      const response = await fetch("http://localhost:5000/places", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      dispatch(addPlace(data));
      dispatch(
        notify({
          type: "success",
          message: "Lugar adicionado com sucesso!",
        })
      );
      clearInputs();
    } catch (err) {
      dispatch(
        notify({
          type: "error",
          message: "Ooops! Algo deu errado. Tente novamente.  =(",
        })
      );
      console.log(err);
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      {/* País */}
      <FormControl label="País">
        <Select
          options={countries}
          value={country}
          onChange={(e) => setCountry(String(e.target.value))}
        />
      </FormControl>

      {/* Local */}
      <FormControl label="Local">
        <Input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Digite o local que deseja conhecer"
          minLength={2}
          maxLength={32}
          required
        />
      </FormControl>

      {/* Meta */}
      <FormControl label="Meta">
        <InputMask
          mask="99/9999"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        >
          {(inputProps: any) => (
            <Input {...inputProps} label="Meta" placeholder="mês/ano" />
          )}
        </InputMask>
      </FormControl>

      <Button bgColor="#006C18" color="#FFF" title="Adicionar" type="submit" />
    </S.Form>
  );
}

export default SearchArea;
