import styled from 'styled-components';

const NavBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 101;
    
    button {
        color: white;
        font-size: 50px;
    }
`;

export default NavBarContainer;