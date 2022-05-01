import React from "react";
import { Link } from "react-router-dom";

class Search extends React.Component {

    formSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.formSubmit}>
                <div className="row form-row my-4">
                    <div className="col-10">
                        <input
                            onChange={this.props.searchMovieProp}
                            // value={this.state.searchQuery}
                            type="text"
                            className="form-control"
                            placeholder="Search a movie"
                        />
                    </div>

                    <div className="col-2">
                        <Link
                            to="/add"
                            type="button"
                            className="btn btn-md btn-primary"
                            style={{ float: 'right' }}>Add movie
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default Search;