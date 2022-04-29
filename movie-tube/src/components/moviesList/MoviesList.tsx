import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from "@reduxjs/toolkit";
import {fetchTopRatedMovies, MoviesActions, searchForMoviesBySelectedQuery} from "../../actions/movies";
import Movie from "./Movie";
import MoviesListWrapper from "./MoviesListWrapper";
import {useSearchParams} from "react-router-dom";
import LoadingContext from "../common/LoadingContext";
import ResultsHeader from "./ResultsHeader";

const MoviesList = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('query');
    const movies = useSelector(({movies}) => movies.movies.selectedMovies) || [];
    const dispatch: ThunkDispatch<{}, {}, MoviesActions> = useDispatch();
    const { showLoading, hideLoading } = useContext(LoadingContext);

    useEffect(() => {
        const onTradingSearch = async () => {
            await dispatch(fetchTopRatedMovies());
        };

        const onMoviesSearch = async query => {
            await dispatch(searchForMoviesBySelectedQuery(query));
        };

        if (!searchTerm) {
            showLoading();
            onTradingSearch().then(hideLoading);
        } else {
            showLoading();
            onMoviesSearch(searchTerm).then(hideLoading);
        }
    }, [searchTerm]);

    return (
        <>
            <ResultsHeader />
            <MoviesListWrapper>
                {!!movies.length && (
                    movies.map(m => <Movie key={m.id} movie={m} />)
                )}
            </MoviesListWrapper>
        </>
    );
};

export default MoviesList;