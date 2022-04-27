import * as React from 'react';
import {connect} from 'react-redux';
import MovieItem from './MovieItem';
import {Movie} from "../../reducers/types";

interface MoviesListProps {
    movies: Array<Movie>
}

const MoviesList = ({ movies }: MoviesListProps) => {
    return (
        <div className="ui relaxed divided list">
            {
                movies.map((movie: Movie) => {
                    return (
                        <MovieItem
                            key={movie.id.videoId}
                            movie={movie}
                        />
                    );
                })
            }
        </div>
    );
};

const mapStateToProps = state => ({
    movies: state.movies.movies.movies
});

export default connect(mapStateToProps)(MoviesList);
