import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Filter from "./common/filter";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      currentGenre,
      sortColumn,
    } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

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
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
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
}

export default Movies;
