import styled from "styled-components";

const SearchWrapper = styled.div`
    input {
        background-color: white;
        border: 2px solid #5a0289;
        border-right: none;
        font-size: 18px;
        padding: 15px;
        height: 60px;
        width: 900px;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        
        &.hasResults {
            border-bottom-left-radius: 0;
            border-bottom: none;
        }
        
        &:focus {
            outline: none;
        }
        
        &:hover {
            cursor: pointer;
        }
    }
    
    .searchInputs {
        display: flex;
        
        .searchIcon {
            height: 60px;
            width: 50px;
            background-color: white;
            display: grid;
            place-items: center;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            border: 2px solid #5a0289;
            border-left: none;
            
            &.hasResults {
                border-bottom-right-radius: 0;
                border-bottom: none;
            }
            
            svg {
                font-size: 35px;
            }
        }
    
        #clearBtn {
            cursor: pointer;
        }
    }
    
    .dataResult {
            border-top: groove;
            width: 950px;
            max-height: 500px;
            min-height: 114px;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            overflow: hidden;
            overflow-y: auto;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            position: absolute;
            z-index: 1;
            border: 2px solid #5a0289;
            border-top: none;
            
            .dataItem {
                width: 100%;
                height: 120px;
                display: flex;
                align-items: center;
                color: black;
                font-size: 15px;
                
                img {
                    margin-left: 10px;
                    width: 50px;
                    height: 75px;
                    display: flex;
                }
                
                span.generalInfo {
                    display: flex;
                    flex-direction: row;
                    padding-left: 15px;
                    width: 500px;
                    text-decoration: none;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: bold;
                    
                    .voteRate {
                        color: green;
                        padding-left: 15px;
                        display: flex;
                        
                        .value {
                            font-weight: bold;
                            padding-left: 5px;
                        }
                    }
                }
                
                em {
                    &.details {
                        padding-left: 15px;
                        opacity: .5;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                        width: 650px;
                    }
                }
                
                .detailsWrapper {
                    display: flex;
                    flex-direction: column;
                }
                
                &:hover {
                    cursor: pointer;
                    background-color: lightgrey;
                }
            }
    }
        
    .dataResult::-webkit-scrollbar {
        display: none;
    }
`;

export default SearchWrapper;