import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb, Input } from "antd";
import Home from "./components/Home";
import React, { useState } from "react";
import Favourites from "./components/Favourites";

export const FavouritesContext = React.createContext();

function App() {
  const { Header } = Layout;
  const [favourites, setFavourites] = useState([]);

  const onFavouriteChange = (beerData) => {
    let tempFav = favourites.slice();
    for(let i = 0; i < tempFav.length; i++) {
      if(tempFav[i].id === beerData.id) {
        tempFav.splice(i,1);
        setFavourites(tempFav);  
        return;
      }
    }  
    setFavourites([...favourites,beerData]);      
  }

  return (
    <Router>
      <Layout className="layout">
        <Header style={{ padding: 0 }}>
          <span style={{ color: "white", fontSize: "24px" }}>Brewski</span>

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

      <FavouritesContext.Provider value={{favourites,onFavouriteChange}} >
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
