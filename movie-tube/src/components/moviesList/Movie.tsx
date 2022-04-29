import * as React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {useDispatch} from "react-redux";
import {selectMovie} from "../../actions/movies";
import ReactCardFlipper from "react-card-flipper";
import MovieCard from "./MovieCard";

const Movie = ({movie}) => {
    const dispatch = useDispatch();
    const { title, poster_path, vote_average, release_date, id, overview } = movie;

    const onCardClicked = () => {
        dispatch(selectMovie(movie));
    };

    return (
        <ReactCardFlipper
            width="250px"
            height="340px"
            behavior="hover"
        >
            <div className="text-center">
                <MovieCard id={id} onCardClicked={onCardClicked}>
                    <CardMedia
                        component="img"
                        height="330"
                        src={'https://image.tmdb.org/t/p/w200' + poster_path}
                        alt="green iguana"
                    />
                    <CardContent className="CardContent">
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span className="secondaryText">
                                <span className="voteRate">
                                     <StarIcon/>
                                     <span className="value">{vote_average}</span>
                                </span>
                                <span
                                    className="releaseDate">{release_date ? new Date(release_date).getFullYear() : ''}</span>
                            </span>
                        </Typography>
                    </CardContent>
                </MovieCard>
            </div>
            <div className="text-center">
                <MovieCard id={id} onCardClicked={onCardClicked}>
                    <CardContent className="CardContent">
                        <Typography gutterBottom variant="h5" component="div">
                            <em className="overviewContent">
                                <h1 className="title">Overview</h1>
                                <div className="content">{overview || 'Not found'}</div>
                            </em>
                        </Typography>
                    </CardContent>
                </MovieCard>
            </div>
        </ReactCardFlipper>
    );
};

export default Movie;