import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LatestPage from "./views/LandingPage/LatestPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import MovieDetail from "./views/MovieDetail/MovieDetail"
import Favouritepage from './views/FavouritePage/FavouritePage';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          {/* default route */}
          <Route exact path="/"> <Redirect to="/discover/popular" /></Route>
          <Route exact path="/discover/popular" component={Auth(LandingPage, null)} />
          <Route exact path="/discover/latest" component={Auth(LatestPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/discover/favourites" component={Auth(Favouritepage, true)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
