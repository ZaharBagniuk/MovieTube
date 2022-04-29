import * as React from 'react';
import {Card, CardActionArea} from "@mui/material";
import {Link} from "react-router-dom";

const MovieCard = props => ((
    <Link to={`/movie/${props.id}`} onClick={props.onCardClicked}>
        <Card sx={{ height: 420, width: 250 }} className="CardWrapper">
            <CardActionArea>
                {props.children}
            </CardActionArea>
        </Card>
    </Link>
));

export default MovieCard;