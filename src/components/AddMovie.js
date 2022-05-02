import React from "react";
import serialize from 'form-serialize';
import { useNavigate } from 'react-router-dom';

class AddMovie extends React.Component {

    handleFormSubmit = (e) => {
        e.preventDefault();
        const newMovie = serialize(e.target, { hash: true });
        // console.log(newMovie);
        this.props.onAddMovie(newMovie);
        this.props.navigate('/');
    }

    render() {

        return (
            <div className="container">
                <form className="my-5" onSubmit={this.handleFormSubmit}>
                    <input className="form-control mb-2" id="disabledInput" type="text" placeholder="Fill The Form To Add A Movie.." disabled />
                    <div className="row form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                required />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
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
                                required />
                        </div>
                    </div>
                    <div className="row form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                required
                                className="form-control"
                                name="overview" rows="5"></textarea>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-danger w-100 mt-2" value="Add Movie" />
                </form>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <AddMovie {...props} navigate={navigate} />
}

export default WithNavigate;