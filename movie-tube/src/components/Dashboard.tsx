import * as React from 'react';
import {useRoutes} from "react-router-dom";
import DashboardWrapper from "./DashboardWrapper";
import MoviesList from "./moviesList/MoviesList";
import SelectedMovie from "./selectedMovie/SelectedMovie";
import NavBar from "./navBar/NavBar";
import Loader from "./common/Loader";
import LoadingProvider from "./common/LoadingProvider";
import Error from "./common/Error";
import {useSelector} from "react-redux";

const MoviesRoutes = () => useRoutes([
    {path: "/", element: <MoviesList/>},
    {path: "/search", element: <MoviesList/>},
    {path: "/movie/:id", element: <SelectedMovie/>}
]);

const Dashboard = () => {
    const error = useSelector(({movies}) => movies.movies.error);

    return (
        <DashboardWrapper>
            <LoadingProvider>
                <NavBar/>
                <Loader/>
                {!error ?
                    <MoviesRoutes/> :
                    <Error error={error} />
                }
            </LoadingProvider>
        </DashboardWrapper>
    );
};

export default Dashboard;
