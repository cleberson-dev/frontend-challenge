import { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CardLoading from "./CardLoading";

type ClickHandler = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

type Props = {
  flag: string;
  country: string;
  name: string;
  goal: string;
  onEdit?: ClickHandler;
  onRemove?: ClickHandler;
};

function PlaceCard(props: Props) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Card sx={{ position: "relative" }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <img width="60px" src={props.flag} alt="" />
            <CardActions disableSpacing>
              {props.onEdit && (
                <IconButton
                  size="small"
                  aria-label="Editar"
                  onClick={(e) => {
                    setIsDisabled(true);
                    props.onEdit && props.onEdit(e);
                    setIsDisabled(false);
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {props.onRemove && (
                <IconButton
                  size="small"
                  aria-label="Remover"
                  onClick={(e) => {
                    setIsDisabled(true);
                    props.onRemove && props.onRemove(e);
                    setIsDisabled(false);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </CardActions>
          </Box>
          <Typography
            variant="subtitle1"
            style={{ textTransform: "uppercase", color: "green" }}
          >
            {props.country}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" component="p">
            Local: {props.name}
            <br />
            Meta: {props.goal}
          </Typography>
        </Box>
      </Box>
      <CardLoading open={isDisabled} />
    </Card>
  );
}

export default PlaceCard;
