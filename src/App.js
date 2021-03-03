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

function App() {
  const { Header, Content, Footer } = Layout;

  
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
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/fav">Favourites</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>

      <Switch>
        <Route exact path="/home" component={Home} />
      </Switch>
      <Switch>
        <Route exact path="/favourites" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
