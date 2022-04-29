import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {fetchGenres, fetchMovieById, MoviesActions} from "../../actions/movies";
import SelectedMovieWrapper from "./SelectedMovieWrapper";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StyledRating from "./StyledRating";
import LoadingContext from "../common/LoadingContext";

const IMAGE_GENERAL_PATH = 'https://image.tmdb.org/t/p/w500';

const SelectedMovie = () => {
    const dispatch: ThunkDispatch<{}, {}, MoviesActions> = useDispatch();
    const [movieGenres, setMovieGenres] = useState([]);
    const params = useParams();
    const {selectedMovie, genres} = useSelector(({movies}) => {
        return {
          selectedMovie: movies.movies.selectedMovie,
          genres: movies.movies.genres
        };
    });
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

    const backDropImg = selectedMovie?.backdrop_path;
    const formattedGenres = movieGenres.map(i => i.name).join(', ');

    return (
        selectedMovie && (
            <SelectedMovieWrapper>
                <div className="container">
                    {backDropImg && <div className="backgroundWrapper" style={{backgroundImage: `url(${IMAGE_GENERAL_PATH + backDropImg})`}} />}
                    <div className="mainInfo">
                        <img src={IMAGE_GENERAL_PATH + selectedMovie.poster_path} alt="Not Found" />
                        <div className="generalInfoContainer">
                            <section className="detailsSection">
                                <h1 className="title">{selectedMovie.title}</h1>
                                <span className="secondaryInfo">
                                <em className="releaseYear">
                                    {new Date(selectedMovie.release_date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'})}
                                </em>
                                <span className="genres" title={formattedGenres}>{formattedGenres}</span>
                            </span>
                                <span className="voteRate">
                                <StyledRating
                                    className="Rating"
                                    name="customized-color"
                                    value={calcRate(selectedMovie.vote_average)}
                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.1}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    readOnly
                                />
                            </span>
                            </section>
                            <section className="overviewSection">
                                <h1 title='Overview' className="title">
                                    Overview
                                </h1>
                                <p title={selectedMovie.overview} className="content">
                                    {selectedMovie.overview}
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </SelectedMovieWrapper>
        )
    );
};

const calcRate = (rate: number) => {
    return Math.round(rate/2 * 10) / 10;
};

const findGenresForMovie = (genres, movie) => {
    return genres.filter(g => movie.genre_ids.includes(g.id));
};

export default SelectedMovie;