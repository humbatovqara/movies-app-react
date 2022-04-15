import React from "react";

class Search extends React.Component {

    formSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.formSubmit}>
                <div className="form-row my-2">
                    <div className="col-12">
                        <input
                            onChange={this.props.searchMovieProp}
                            // value={this.state.searchQuery}
                            type="text"
                            className="form-control"
                            placeholder="Search a movie"
                        />
                    </div>
                </div>
            </form>
        )
    }
}

export default Search;