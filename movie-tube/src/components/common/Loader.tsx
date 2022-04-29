import * as React from 'react';
import {useContext} from 'react';
import {Box, CircularProgress} from "@mui/material";
import LoadingContext from "./LoadingContext";

const Loader = () => {
    const { loading } = useContext(LoadingContext);

    return (
        loading &&
            <span data-testid="Loader">
                <Box sx={{ display: 'flex', color: 'white', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress size={200} color="inherit" />
                </Box>
            </span>
    );
};

export default Loader;