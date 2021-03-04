import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Layout, Menu, message } from "antd";
import "./App.css";

import Home from "./components/Home";
import Favourites from "./components/Favourites";

export const FavouritesContext = React.createContext();

function App() {
  const { Header } = Layout;
  const [favourites, setFavourites] = useState([]);

  const onFavouriteChange = (beerData) => {
    let tempFav = favourites.slice();
    for (let i = 0; i < tempFav.length; i++) {
      if (tempFav[i].id === beerData.id) {
        tempFav.splice(i, 1);
        setFavourites(tempFav);
        return;
      }
    }
    message.success(`${beerData.name} added to favourites`);
    setFavourites([...favourites, beerData]);
  };

  return (
    <Router>
      <Layout className="layout">
        <Header style={{ padding: 0 }}>
          <a
            href="/"
            style={{ color: "white", fontSize: "26px", marginLeft: "10px" }}
          >
            Brewski
          </a>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ float: "right" }}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/fav">Favourites</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>

      <FavouritesContext.Provider value={{ favourites, onFavouriteChange }}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
          <Route exact path="/fav" component={Favourites} />
        </Switch>
      </FavouritesContext.Provider>
    </Router>
  );
}

export default App;
