import React, { useState } from "react";
import { BeerCard, Name,Description } from "./style";
import { FlexEnd, SpaceBetween } from "../CommonComponents/index";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const Beer = ({name, description,image, addToFav}) => {
  const [favourite, setFavourite] = useState(false);
    

  return (
    <BeerCard>
      <FlexEnd>
        {favourite ? (
          <StarFilled onClick={() => addToFav(name)} />
        ) : (
          <StarOutlined onClick={() => addToFav(name)} />
        )}
      </FlexEnd>
      <SpaceBetween>
        <img
          src={image}
          alt="beer"
          style={{ maxHeight: "100px",marginRight:"10px"}}
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
