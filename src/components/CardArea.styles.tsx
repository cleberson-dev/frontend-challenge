import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  width: 100%;
`;

export const LoadingContainer = styled(Container)`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlaceList = styled(Container)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  justify-items: center;

  @media(max-width: 882px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media(max-width: 741px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media(max-width: 551px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 381px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PlaceItem = styled.li`
  width: 100%;
  list-style: none;
`;