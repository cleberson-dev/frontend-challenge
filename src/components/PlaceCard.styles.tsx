import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';

export const FlagWrapper = styled.div`
  width: 60px;
  height: 50px;
`;

export const Flag = styled.img`
  width: 100%;
`;

export const Container = styled(Card)`
  position: relative;
  padding: 16px;
`;

export const Header = styled.div`
  margin-bottom: 16px;
`;

export const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Content = styled.div`
  margin-top: 16px;
`;

export const CountryName = styled(Typography)`
  text-transform: uppercase;
  color: green;
`;

export function CountryInfo(props: any) {
  return (
    <Typography
      sx={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      variant="body1"
      component="p"
      {...props}
    />
  );
}