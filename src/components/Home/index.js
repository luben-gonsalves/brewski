import React, { useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import Beer from "../Beer/index";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { Search } = Input;
  const [pageNumber, setPageNumber] = useState(1);
  const [beers, setBeers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [beer, updateBeer] = useState({ name: "", description: ""});

  const onSearch = (value) => {
    if (!value) {
      setBeers([])
      fetchBeers(1);
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
    let beer = beers.slice();
    beer.splice(index, 1);
    setBeers(beer);
  };

  const fetchBeers =(page) => {
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=50`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBeers((prevState) => [...prevState,...data]);
      });
  }

  useEffect(() => {
      fetchBeers(pageNumber)
  }, [pageNumber]);

  const showModal = (index) => {
    updateBeer(beers[index]);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let tempBeers = beers;
    for (let b of tempBeers) {
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
    <>
      <Row justify="center">
        <Col lg={{ span: 12 }} style={{ marginTop: "20px" }}>
          <Search
            placeholder="Search for beer..."
            allowClear
            size="large"
            enterButton
            onSearch={onSearch}
          />
        </Col>
      </Row>

      <InfiniteScroll
        dataLength={beers.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={true}
        style={{ overflowX: "hidden", marginTop: "20px" }}
      >
        <Row gutter={[16, 16]} justify="center">
          {beers &&
            beers.map((beer, index) => (
              <Col xs={24} md={12} xl={7} lg={7}>
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
         <label htmlFor="name">Name :</label>
         <Input
              placeholder="Basic usage"
              type="text"
              name="name"
              value={beer.name}
              defaultValue={beer.name}
              onChange={onChange}
              style={{marginTop:"5px",marginBottom:"10px"}}
            />  
        <label htmlFor="description" style={{marginTop:"10px"}}>Description :</label>
            <TextArea
              placeholder="Enter beer description"
              name="description"
              autoSize ={{minRows: "5"}}
              value={beer.description}
              defaultValue={beer.description}
              onChange={onChange}
              style={{marginTop:"5px"}}
            />
      </Modal>
    </>
  );
};

export default Home;
