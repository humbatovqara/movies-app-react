import React from "react";
import { Link } from "react-router-dom";

function MovieList(props) {

    const truncateOverview = (str, maxLength) => {
        if (!str) return null;
        if (str.length < maxLength) return str;
        return `${str.substring(0, maxLength)} ...`;
    }

    return (
        <div className="row">

            {
                props.movies.map((movie, i) => (
                    <div className="col-lg-4" key={i}>
                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imgURL} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={() => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>

                                    <Link to={`edit/${movie.id}`} type="button" className="btn btn-md btn-outline-warning">Edit</Link>

                                    <h2><span className="badge bg-info">{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default MovieList;