import "./App.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginform";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route path="login" index element={<LoginForm />} />
              <Route path="movies" element={<Movies />} />
              <Route path="movies/:id" index element={<MovieForm />} />
              <Route path="customers" element={<Customers />} />
              <Route path="rentals" element={<Rentals />} />
              <Route path="/" index element={<Movies />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
