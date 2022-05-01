import React from 'react';
import Search from './components/Search';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    movies: [],

    searchQuery: ""
  }

  /* async componentDidMount() {
    const baseURL = "http://localhost:3002/movies";
    const response = await fetch(baseURL);
    const data = await response.json();
    this.setState({movies: data})
  } */

  async componentDidMount() {
    const response = await axios.get("http://localhost:3002/movies");
    this.setState({ movies: response.data })
  }

  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  /* deleteMovie = (movie) => {
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    // this.setState({ movies: newMovieList })

    this.setState(state => ({
      movies: newMovieList
    }))
  } */

  // Fetch API
  /* deleteMovie = async (movie) => {

    const baseURL = `http://localhost:3002/movies/${movie.id}`;
    await fetch(baseURL, {
      method: "DELETE"
    })

    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    this.setState(state => ({
      movies: newMovieList
    }))
  } */

  // Axios
  deleteMovie = async (movie) => {

    axios.delete(`http://localhost:3002/movies/${movie.id}`);

    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    this.setState(state => ({
      movies: newMovieList
    }))
  }

  render() {

    let filteredMovies = this.state.movies.filter(
      (movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    )

    return (
      <Router>

        <div className='container'>
          <Routes>
            <Route path='/' element={
              <>
                <div className='row'>
                  <div className='col-lg-12'>
                    <Search searchMovieProp={this.searchMovie} />
                  </div>
                </div>

                <MovieList
                  movies={filteredMovies}
                  deleteMovieProp={this.deleteMovie}
                />
              </>}>
            </Route>

            <Route path='/add' element={<AddMovie />}></Route>
          </Routes>
        </div>

      </Router>
    )
  }
}

export default App;
