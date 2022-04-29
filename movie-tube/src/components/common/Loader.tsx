import * as React from 'react';
import {useContext} from "react";
import {Box, CircularProgress} from "@mui/material";
import LoadingContext from "./LoadingContext";

const Loader = () => {
    const { loading } = useContext(LoadingContext);

    return (
        loading &&
        <Box sx={{ display: 'flex', color: 'white', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size={200} color="inherit" />
        </Box>
    );
};

export default Loader;