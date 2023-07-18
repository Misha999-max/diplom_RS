import "./App.css";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/main";
import ContactPage from "./components/page/contact";
import AddressPage from "./components/page/address";
import NotFaundPage from "./components/page/notFaund";
import HeaderComponent from "./components/header";

function App() {
  return (
    <>
      <HeaderComponent />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/contakt/" component={ContactPage} />
        <Route path="/Address/:id?" component={AddressPage} />
        <Route component={NotFaundPage} />
      </Switch>
    </>
  );
}

export default App;
