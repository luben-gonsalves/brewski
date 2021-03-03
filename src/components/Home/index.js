import React, { useEffect, useState } from "react";
import { Col, Input, Pagination, Row, Space } from "antd";
import Beer from "../Beer/index";
import { FlexBox } from "../CommonComponents";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { Search } = Input;
  const [pageNumber, setPageNumber] = useState(1);
  const [beers, setBeers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [beer, updateBeer] = useState({ name: "", description: "" });
  const onSearch = (value) => {
    if (!value) {
      console.log("e");
      setBeers([]);
      return;
    }
    const apiUrl = `https://api.punkapi.com/v2/beers?beer_name=${value}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
      });
  };

  const onDelete = (index) => {
    let dummyBeer = beers.slice();
    dummyBeer.splice(index, 1);
    setBeers(dummyBeer);
  };

  useEffect(() => {
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=5`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBeers([...beers, ...data]);
      });
  }, [pageNumber]);

  const showModal = (index) => {
    let beer = beers[index];
    updateBeer(beer);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let dummyBeers = beers;
    for (let b of dummyBeers) {
      if (b.id === beer.id) {
        b.name = beer.name;
        b.description = beer.description;
      }
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    updateBeer({ ...beer, [e.target.name]: e.target.value });
  };

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

      <InfiniteScroll
        dataLength={beers.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={true}
      >
        <Row gutter={[16, 16]}>
          {beers &&
            beers.map((beer, index) => (
              <Col
                lg={8}
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#edf0f9",
                  margin: "0px 0px",
                }}
              >
                <Beer
                  name={beer.name}
                  description={beer.description}
                  image={beer.image_url}
                  beerData={beer}
                  key={beer.id}
                  onDelete={onDelete}
                  index={index}
                  type="home"
                  showModal={showModal}
                />
              </Col>
            ))}
        </Row>
      </InfiniteScroll>
      <Modal
        title="Edit"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Basic usage"
          value={beer.name}
          defaultValue={beer.name}
          name="name"
          addonAfter="Title"
          type="text"
          onChange={onChange}
        />
        <TextArea
          placeholder="Autosize height based on content lines"
          name="description"
          autoSize
          value={beer.description}
          defaultValue={beer.description}
          onChange={onChange}
        />
      </Modal>
    </Space>
  );
};

export default Home;
