import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import styled, { StyledComponentProps } from "styled-components";

const Container = styled.button<{ bgColor?: string }>`
  background-color: ${(props) => props.bgColor || "blue"};
  color: ${(props) => props.color};
  border-radius: 7px;
  border: none;
  outline: none;
  font-size: 1.1rem;
  padding: 1rem;
  cursor: pointer;
  max-height: 100%;
  width: 100%;

  &:hover {
    filter: brightness(0.9);
  }
`;

type Props = {
  title: string;
  bgColor?: string;
  color?: string;
} & StyledComponentProps<
  "button",
  any,
  {
    bgColor?: string | undefined;
  },
  never
>;

export default function Button({
  title,
  bgColor,
  color,
  onClick,
  ...props
}: Props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const content = isDisabled ? <CircularProgress size={15} /> : title;

  return (
    <Container
      disabled={isDisabled}
      bgColor={bgColor}
      color={color}
      onClick={(e) => {
        if (!onClick) return;
        setIsDisabled(true);
        onClick(e);
        setIsDisabled(false);
      }}
      {...props}
    >
      {content}
    </Container>
  );
}
