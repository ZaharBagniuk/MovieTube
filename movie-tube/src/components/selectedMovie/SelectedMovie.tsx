import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {fetchGenres, fetchMovieById, MoviesActions} from "../../actions/movies";
import SelectedMovieWrapper from "./SelectedMovieWrapper";
import LoadingContext from "../common/LoadingContext";
import SelectedMovieInfo from "./SelectedMovieInfo";

const SelectedMovie = () => {
    const dispatch: ThunkDispatch<{}, {}, MoviesActions> = useDispatch();
    const [movieGenres, setMovieGenres] = useState([]);
    const params = useParams();
    const {selectedMovie, genres} = useSelector(({movies}) => ({
        selectedMovie: movies.movies.selectedMovie,
        genres: movies.movies.genres
    }));
    const { showLoading, hideLoading } = useContext(LoadingContext);

    useEffect(() => {
        const fetchMovie = async () => {
            await dispatch(fetchMovieById(Number(params.id)));
        };

        if (params.id && !selectedMovie) {
            showLoading();
            fetchMovie().then(hideLoading);
        }
    }, []);

    useEffect(() => {
        const fetchAllGenres = async () => {
            await dispatch(fetchGenres());
        };
        if (selectedMovie && selectedMovie.genre_ids) {
            showLoading();
            fetchAllGenres().then(hideLoading);
        }
    }, [selectedMovie]);

    useEffect(() => {
        if (genres.length && selectedMovie && selectedMovie.genre_ids) {
            setMovieGenres(findGenresForMovie(genres, selectedMovie));
        } else if (selectedMovie && !selectedMovie.genre_ids) {
            setMovieGenres(selectedMovie.genres);
        }
    }, [genres, selectedMovie]);

    return (
        selectedMovie && (
            <SelectedMovieWrapper data-testid="SelectedMovie" >
                <SelectedMovieInfo
                    selectedMovie={selectedMovie}
                    movieGenres={movieGenres}
                />
            </SelectedMovieWrapper>
        )
    );
};

const findGenresForMovie = (genres, movie) => {
    return genres.filter(g => movie.genre_ids.includes(g.id));
};

export default SelectedMovie;