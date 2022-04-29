import styled from "styled-components";

const MoviesListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px 20px;
  margin-top: 25px;
  margin-bottom: 100px;

  .CardWrapper {
    border-radius: 30px;

    .CardContent {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 210px;
        overflow: hidden;
      }
      
      .overviewContent {
        .content {
           -webkit-line-clamp: 11;
        }
      }

      .secondaryText {
        display: flex;
        flex-direction: row;

        .voteRate {
          color: green;
          display: flex;

          .value {
            font-size: 16px;
            font-weight: bold;
            padding-left: 5px;
          }
        }

        .releaseDate {
          font-size: 16px;
          padding-left: 15px;
        }
      }
    }
  }
`;

export default MoviesListWrapper;