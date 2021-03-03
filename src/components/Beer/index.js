import React, { useContext, useState } from "react";
import { BeerCard, Name, Description } from "./style";
import { FlexEnd, SpaceBetween } from "../CommonComponents/index";
import {
  StarOutlined,
  StarFilled,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { FavouritesContext } from "../../App";


const Beer = ({
  name,
  description,
  image,
  beerData,
  index,
  onDelete,
  type,
  showModal
}) => {
  const { favourites, onFavouriteChange } = useContext(FavouritesContext);

  
  const isFavourite = () => {
    let result = favourites.filter(function (item) {
      return item["id"] === beerData["id"];
    });
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };


  return (
    <BeerCard>
      <FlexEnd>
        {type === "home" ? <EditFilled style={{ marginRight: "5px" }} onClick={()=>showModal(index)}/> : ""}
        {type === "home" ? (
          <DeleteFilled
            style={{ marginRight: "5px" }}
            onClick={() => onDelete(index)}
          />
        ) : (
          ""
        )}

        {isFavourite() ? (
          <StarFilled onClick={() => onFavouriteChange(beerData)} />
        ) : (
          <StarOutlined onClick={() => onFavouriteChange(beerData)} />
        )}
      </FlexEnd>
      <SpaceBetween>
        <img
          src={image}
          alt="beer"
          style={{ maxHeight: "100px", marginRight: "10px" }}
        />
        <div>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </div>
      </SpaceBetween>
  
    </BeerCard>
  );
};

export default Beer;
