import React, { useContext, useState } from "react";
import { BeerCard, Name, Description } from "./style";
import { FlexEnd, SpaceBetween } from "../CommonComponents/index";
import {
  StarOutlined,
  StarFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FavouritesContext } from "../../App";
import { Popconfirm, message } from "antd";
const Beer = ({
  name,
  description,
  image,
  beerData,
  index,
  onDelete,
  type,
  showModal,
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

  function confirm(e) {
    onDelete(index)
    message.success("Beer deleted successfully");
  }

  function cancel(e) {
    console.log(e);
  }

  return (
    <BeerCard>
      <FlexEnd>
        {isFavourite() ? (
          <StarFilled
            onClick={() => onFavouriteChange(beerData)}
            style={{ color: "#efc050" }}
          />
        ) : (
          <StarOutlined onClick={() => onFavouriteChange(beerData)} />
        )}
        {type === "home" ? (
          <EditOutlined
            style={{ marginLeft: "10px" }}
            onClick={() => showModal(index)}
          />
        ) : (
          ""
        )}
        {type === "home"
          ? (
                <Popconfirm
                  title="Are you sure to delete this Beer?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                <DeleteOutlined
                style={{ marginLeft: "10px", color: "#c71020" }}
              />
                </Popconfirm>
              )
    
          : ""}
      </FlexEnd>
      <SpaceBetween>
        <img
          src={image}
          alt="beer"
          style={{ maxHeight: "100px",maxWidth:"50px", marginRight: "10px",alignSelf:"flex-start",marginTop:"20px"}}
        />
        <div style={{marginTop:"10px"}}>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </div>
      </SpaceBetween>
    </BeerCard>
  );
};

export default Beer;
