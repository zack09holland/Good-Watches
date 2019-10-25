import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import MoviesList from "./pages/MoviesList";
import TopRated from "./pages/TopRated";



function App() {
  return (      
        <Router>
          <div>
            <Nav />
            <Switch> 
              <Route exact path="/" component={Home} />
              <Route exact path="/saved" component={Saved} />
              <Route exact path="/movieslist" component={MoviesList} />
              <Route exact path="/topratedmovies" component={TopRated} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
    
  );
}

export default App;
