import { Col, Row } from "antd";
import React, { useContext } from "react";
import { FavouritesContext } from "../../App";
import Beer from "../Beer";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
      <Row gutter={[16, 16]}>
        {favourites &&
          favourites.map((beer) => (
            <Col
              lg={8}
              style={{ borderRadius: "12px", backgroundColor: "#edf0f9" }}
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
  );
};

export default Favourites;
