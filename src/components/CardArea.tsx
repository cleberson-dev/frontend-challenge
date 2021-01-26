import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import PlaceCard from "./PlaceCard";
import EditPlaceDialog, { EditPlaceDialogProps } from "./EditPlaceDialog";
import { AppState } from "../store";
import { editPlace, removePlace } from "../slices/placesSlice";
import { notify } from "../slices/notificationSlice";

export default function CardArea() {
  const { places, countries } = useSelector<AppState, AppState>(
    (state) => state
  );
  const dispatch = useDispatch();

  const [
    editDialogProps,
    setEditDialogProps,
  ] = useState<EditPlaceDialogProps | null>(null);

  const defaultSx = {
    paddingX: 5,
    paddingY: 8,
    width: "100%",
  };

  if (countries.length === 0)
    return (
      <Box
        sx={{
          ...defaultSx,
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      component="ul"
      sx={{
        ...defaultSx,
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        justifyItems: "center",
        gridColumnGap: 30,
        gridRowGap: 30,
        boxSizing: "border-box"
      }}
    >
      {places.length > 0 &&
        places.map((place: any) => {
          const country = countries.find((c) => c.id === place.countryCode);
          return (
            <Box sx={{ width: "100%" }} key={place.id}>
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
            </Box>
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
    </Box>
  );
}
