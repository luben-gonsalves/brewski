import React, { useEffect, useState } from "react";

import { Col, Input, Pagination, Row, Space } from "antd";
import Beer from "../Beer/index";
import { FlexBox } from "../CommonComponents";
const Home = () => {
  const { Search } = Input;
  const [pageNumber, setPageNumber] = useState(1);
  const [beers, setBeers] = useState([]);
  const onSearch = (value) => {
  
  };

  useEffect(() => {
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=50`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
      });
  }, [pageNumber]);

  const addToFav = (id) => {
    console.log(id);
  }

  return (
    <Space direction="vertical">
      <Row>
        <Col lg={{ span: 12, offset: 6 }} sm={24} style={{ marginTop: "20px" }}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {beers.map((beer) => (
          <Col
            lg={8}
            style={{ borderRadius: "12px", backgroundColor: "#edf0f9" }}
          >
            <Beer
              name={beer.name}
              description={beer.description}
              image={beer.image_url}
              key={beer.id}
              addToFav = {addToFav}
            />
          </Col>
        ))}
      </Row>
      <FlexBox>
        <Pagination
          defaultCurrent={1}
          current={pageNumber}
          total={50}
          onChange={(current) => setPageNumber(current)}
        />
      </FlexBox>
    </Space>
  );
};

export default Home;
