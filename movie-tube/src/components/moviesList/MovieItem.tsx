import * as React from 'react';
import {useDispatch} from "react-redux";
import {selectMovie} from "../../actions/movies";
import styled from "styled-components";
import {Movie} from "../../reducers/types";

const MovieItemWrapper = styled.div`
    display: flex !important;
    align-items: center !important;
    cursor: pointer;
    
    &.item img {
        max-width: 180px;
    }
`;

const MovieItem = ({ movie }: {movie: Movie}) => {
    const dispatch = useDispatch();

    const onMovieSelect = (movie: Movie) => {
        dispatch(selectMovie(movie));
    };

    return (
        <MovieItemWrapper onClick={() => onMovieSelect(movie)} className='item'>
            <img
                alt={movie.snippet.title}
                className="ui image"
                src={movie.snippet.thumbnails.medium.url}
            />
            <div className="content">
                <div className="header">{movie.snippet.title}</div>
            </div>
        </MovieItemWrapper>
    );
};

export default MovieItem;