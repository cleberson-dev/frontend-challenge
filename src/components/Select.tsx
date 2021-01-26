import styled from "styled-components";
import Box from "@material-ui/core/Box";

type Props = {
  value?: string;
  options: {
    id: string;
    name: string;
  }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Container = styled.select`
  background-color: white;
  padding: 1rem;
  border-radius: 7px;
  font-size: 16px;
  border: none;
  outline: none;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  position: absolute;
  top: calc(-1 * (1rem + 5px));
  left: 0;
  color: white;
`;

export default function SelectInput({ value, options, onChange }: Props) {
  return (
    <Box sx={{ position: "relative" }}>
      <Label>País</Label>
      <Container 
        value={value} 
        onChange={onChange}
        disabled={options.length === 0}
      >
        <option value="">Selecione...</option>
        {options
          .map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
      </Container>
    </Box>
  );
}
