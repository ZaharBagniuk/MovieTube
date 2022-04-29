import * as React from 'react';
import StyledRating from "./StyledRating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const IMAGE_GENERAL_PATH = 'https://image.tmdb.org/t/p/w500';

const SelectedMovieInfo = ({selectedMovie, movieGenres}) => {
    const formattedGenres = movieGenres.map(i => i.name).join(', ');
    const formattedRate = calcRate(selectedMovie.vote_average);

    return (
        <div data-testid="SelectedMovieInfo" className="container">
            {selectedMovie?.backdrop_path && <div className="backgroundWrapper" style={{backgroundImage: `url(${IMAGE_GENERAL_PATH + selectedMovie.backdrop_path})`}} />}
            <div className="mainInfo">
                <img src={IMAGE_GENERAL_PATH + selectedMovie.poster_path} alt="Not Found" />
                <div data-testid="generalInfoContainer" className="generalInfoContainer">
                    <section data-testid="detailsSection" className="detailsSection">
                        <h1 className="title" data-testid="Title">{selectedMovie.title}</h1>
                        <span data-testid="secondaryInfo" className="secondaryInfo">
                                <em className="releaseYear" data-testid="ReleaseYear">
                                    {new Date(selectedMovie.release_date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'})}
                                </em>
                                <span className="genres" data-testid="Genres" title={formattedGenres}>{formattedGenres}</span>
                        </span>
                        <span className="voteRate" title={formattedRate.toString()} data-testid="VoteRate">
                                <StyledRating
                                    className="Rating"
                                    name="customized-color"
                                    value={formattedRate}
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
                        <p title={selectedMovie.overview} data-testid="Overview" className="content">
                            {selectedMovie.overview}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

const calcRate = (rate: number) => {
    return Math.round(rate/2 * 10) / 10;
};

export default SelectedMovieInfo;