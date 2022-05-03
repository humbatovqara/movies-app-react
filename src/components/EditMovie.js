import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';

class EditMovie extends React.Component {

    state = {
        name: "",
        rating: "",
        overview: "",
        imgURL: ""
    }

    async componentDidMount() {
        const id = window.location.pathname.replace("/edit/", "");

        const response = await axios.get(`http://localhost:3002/movies/${id}`)

        const movie = response.data;

        this.setState({
            name: movie.name,
            rating: movie.rating,
            overview: movie.overview,
            imgURL: movie.imgURL
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        /* const name = this.state.name;
        const rating = this.state.rating;
        const overview = this.state.overview;
        const imgURL = this.state.imgURL; */

        const { name, rating, overview, imgURL } = this.state;

        const id = window.location.pathname.replace("/edit/", "");

        const updatedMovie = { name, rating, overview, imgURL };

        this.props.onEditMovie(id, updatedMovie);
        this.props.navigate('/');
    }

    render() {

        return (
            <div className="container">
                <form className="my-5" onSubmit={this.handleFormSubmit}>
                    <input className="form-control mb-2" id="disabledInput" type="text" placeholder="EDIT The Form To UPDATE A Movie.." disabled />
                    <div className="row form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange}
                                required />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.onInputChange}
                                required />
                        </div>
                    </div>
                    <div className="row form-row my-3">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imgURL"
                                value={this.state.imgURL}
                                onChange={this.onInputChange}
                                required />
                        </div>
                    </div>
                    <div className="row form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                required
                                value={this.state.overview}
                                className="form-control"
                                name="overview" rows="5"
                                onChange={this.onInputChange}></textarea>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-warning w-100 mt-2" value="Edit Movie" />
                </form>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <EditMovie {...props} navigate={navigate} />
}

export default WithNavigate;