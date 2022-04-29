import * as React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const Error = ({error}) => {
    return (
        error ? (
            <div style={{height: '100vh'}}>
                <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                    <strong>Oops.. Something went wrong!</strong>
                </Alert>
            </div>
        ) : null
    );
};

export default Error;