import styled from "styled-components";
import Box from "@material-ui/core/Box";

const Label = styled.label`
  display: block;
  position: absolute;
  top: calc(-1 * (1rem + 5px));
  left: 0;
  color: white;
`;

type Props = {
  label?: string;
  children?: React.ReactNode;
};

export default function FormControl(props: Props) {
  return (
    <Box sx={{ position: "relative" }}>
      {props.label && <Label>{props.label}</Label>}
      {props.children}
    </Box>
  );
}
