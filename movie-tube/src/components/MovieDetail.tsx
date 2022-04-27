import * as React from 'react';
import {connect} from 'react-redux';
import {Movie} from "../reducers/types";

interface MovieDetailProps {
    selectedMovie: Movie
}

const MovieDetail = ({ selectedMovie }: MovieDetailProps) => {
    if (!selectedMovie) {
        return <div>Loading...</div>;
    }
    debugger;

    const movieSrc = `https://www.youtube.com/embed/${selectedMovie.id.videoId}`;

    return (
        <div>
            <div className="ui embed">
                <iframe title="video player" src={movieSrc} />
            </div>
            <div className="ui segment">
                <h4 className="ui header">{selectedMovie.snippet.title}</h4>
                <p>{selectedMovie.snippet.description}</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    selectedMovie: state.movies.movies.selectedMovie
})

export default connect(mapStateToProps)(MovieDetail);
