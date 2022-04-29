import * as React from 'react';
import SearchBar from "./searchBar/SearchBar";
import HomeBtn from "./searchBar/HomeBtn";
import NavBarContainer from "./NavBarContainer";

const NavBar = () => {
    return (
        <NavBarContainer>
            <HomeBtn/>
            <SearchBar placeholder="Enter a movie title..."/>
        </NavBarContainer>
    );
};

export default NavBar;