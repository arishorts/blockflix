import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import Filter from "./filter";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleLike = (movie) => {
    let getLiked = movie.liked ? false : true;
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = getLiked;
    this.setState({ movies: movies });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      currentGenre,
    } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <Filter
              textProperty="name"
              valueProperty="_id"
              items={allGenres}
              onGenreSelect={this.handleGenreChange}
              currentGenre={currentGenre}
            />
            {/* <div className="list-group">{this.renderGenres(allGenres)}</div> */}
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies in the database</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderMovies(movies)}</tbody>
            </table>
            <Pagination
              numberPages={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderMovies(movies) {
    return movies.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.handleDelete(movie)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }
}

export default Movies;
