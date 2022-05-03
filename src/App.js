import React from 'react';
import Search from './components/Search';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    movies: [],

    searchQuery: ""
  }

  async componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    const response = await axios.get("http://localhost:3002/movies");
    this.setState({ movies: response.data })
  }

  // Search Movie
  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  // Add Movie
  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState(state => ({
      movies: state.movies.concat([movie])
    }))
    this.getMovies();
  }

  // Edit Movie
  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
    this.getMovies();
  }

  // Delete Movie
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
    ).sort((a, b) => {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });

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

            <Route path='/add' element={<AddMovie onAddMovie={(movie) => { this.addMovie(movie) }} />}></Route>

            <Route path='/edit/:id' element={<EditMovie onEditMovie={(id, movie) => { this.editMovie(id, movie) }} />}></Route>
          </Routes>
        </div>

      </Router>
    )
  }
}

export default App;
