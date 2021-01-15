import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import SinglePokemon from "./pages/SinglePokemon";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/pokemon/:pokemonID">
          <SinglePokemon />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
