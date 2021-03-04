import { Col, Row } from "antd";
import React, { useContext } from "react";
import { FavouritesContext } from "../../App";
import Beer from "../Beer";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div style={{ margin: "20px 0px" }}>
     {favourites && favourites.length > 0 ? (<h1 style={{textAlign:"center"}}> My Favourite Brewski</h1>) :  (<h1 style={{textAlign:"center"}}>You don't have any Favourite Brewski</h1>)}
      <Row gutter={[16, 16]} justify="center">
        {favourites &&
          favourites.map((beer) => (
            <Col
              xs={24} md={12} xl={7} lg={7} 
            >
              <Beer
                name={beer.name}
                description={beer.description}
                image={beer.image_url}
                beerData={beer}
                key={beer.id}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Favourites;
