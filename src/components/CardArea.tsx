import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import PlaceCard from "./PlaceCard";
import EditPlaceDialog, { EditPlaceDialogProps } from "./EditPlaceDialog";
import { AppState } from "../store";
import { editPlace, removePlace } from "../slices/placesSlice";
import { notify } from "../slices/notificationSlice";
import * as S from './CardArea.styles';

export default function CardArea() {
  const { places, countries } = useSelector<AppState, AppState>(
    (state) => state
  );
  const dispatch = useDispatch();

  const [
    editDialogProps,
    setEditDialogProps,
  ] = useState<EditPlaceDialogProps | null>(null);

  if (countries.length === 0)
    return (
      <S.LoadingContainer>
        <CircularProgress />
      </S.LoadingContainer>
    );

  return (
    <S.PlaceList>
      {places.length > 0 &&
        places.map((place: any) => {
          const country = countries.find((c) => c.id === place.countryCode);
          return (
            <S.PlaceItem key={place.id}>
              <PlaceCard
                flag={country?.flag || ""}
                country={country?.name || ""}
                name={place.name}
                goal={place.goal}
                onEdit={() => {
                  setEditDialogProps({
                    open: true,
                    id: place.id,
                    countryCode: country?.id || "",
                    goal: place.goal,
                    name: place.name,
                  });
                }}
                onRemove={() => {
                  fetch(`http://localhost:5000/places/${place.id}`, {
                    method: "DELETE",
                  })
                  .then(() => {
                    dispatch(removePlace(place.id));
                    dispatch(
                      notify({
                        type: "success",
                        message: "Removido com sucesso!",
                      })
                    );
                  })
                  .catch(err => {
                    console.error(err);
                    dispatch(
                      notify({ type: "error", message: "Erro interno no servidor =(" })
                    );
                  });
                }}
              />
            </S.PlaceItem>
          );
        })}
      {editDialogProps && (
        <EditPlaceDialog
          open
          id={editDialogProps.id}
          countryCode={editDialogProps.countryCode}
          name={editDialogProps.name}
          goal={editDialogProps.goal}
          onClose={() => setEditDialogProps(null)}
          onSubmit={(newData) => {
            const payload = {
              countryCode: newData.countryCode,
              name: newData.name,
              goal: newData.goal,
            };

            fetch(`http://localhost:5000/places/${newData.id}`, {
              method: "PUT",
              body: JSON.stringify(payload),
            })
              .then(() => {
                dispatch(editPlace(newData));
                dispatch(
                  notify({
                    type: "success",
                    message: "Atualizado com sucesso!",
                  })
                );
              })
              .catch((err) => {
                console.error(err);
                dispatch(
                  notify({
                    type: "error",
                    message: "Ooops! Algo deu errado! =(",
                  })
                );
              })
              .finally(() => {
                setEditDialogProps(null);
              });
          }}
        />
      )}
    </S.PlaceList>
  );
}
