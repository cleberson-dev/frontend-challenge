import { useState } from "react";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CardLoading from "./CardLoading";
import * as S from "./PlaceCard.styles";

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
    <S.Container>
      <S.Header>
        <S.TopHeader>
          <S.FlagWrapper>
            <S.Flag src={props.flag} />
          </S.FlagWrapper>
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
        </S.TopHeader>
        <S.CountryName variant="subtitle1">{props.country}</S.CountryName>
      </S.Header>
      <Divider />
      <S.Content>
        <S.CountryInfo>
          Local: {props.name}
        </S.CountryInfo>
        <S.CountryInfo>
          Meta: {props.goal}
        </S.CountryInfo>
      </S.Content>
      <CardLoading open={isDisabled} />
    </S.Container>
  );
}



export default PlaceCard;
