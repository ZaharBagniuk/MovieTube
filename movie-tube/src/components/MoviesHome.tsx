import * as React from 'react';
import {useEffect} from 'react';
import SearchInput from "./SearchInput";
import MovieDetail from "./MovieDetail";
import MoviesList from "./moviesList/MoviesList";
import {MoviesActions, searchForMovie} from "../actions/movies";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { Route, Routes } from "react-router-dom";
import './MovieHome.css';

const MoviesHome = () => {
    const dispatch: ThunkDispatch<{}, {}, MoviesActions> = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryStr = params.has('movie') ? params.get('movie') : '';
        onSearch(queryStr || 'Canal+');
    }, []);

    const onSearch = async (searchTerm: string) => {
        await dispatch(searchForMovie(searchTerm));
    };

    return (
            <div className="ui container">
                <Routes>
                    <Route path="/" element={
                        <>
                            <SearchInput onSearch={onSearch} />
                            <div className="ui grid">
                                <div className="ui row">
                                    <div className="eleven wide column">
                                        <MovieDetail />
                                    </div>
                                    <div className="five wide column">
                                        <MoviesList />
                                    </div>
                                </div>
                            </div>
                        </>
                    }>
                    </Route>
                </Routes>
            </div>
    );
};

export default MoviesHome;