import * as React from 'react';
import {IconButton} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";

const HomeBtn = () => ((
    <Link to='/' data-testid="HomeBtn">
        <IconButton aria-label="delete" size="large">
            <HomeIcon fontSize="inherit" />
        </IconButton>
    </Link>
));

export default HomeBtn;