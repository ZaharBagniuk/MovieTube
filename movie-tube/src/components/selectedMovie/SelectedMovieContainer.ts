import styled from "styled-components";

const SelectedMovieContainer = styled.div`
  display: flex;
  margin-top: 25px;
  width: 100%;
  margin-bottom: 25px;
  justify-content: center;

  .backgroundWrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    background-size: cover;
    height: 700px;
    align-items: center;
    opacity: .2;
    position: relative;
  }

  .mainInfo {
    position: absolute;
    padding-left: 25px;
    margin-top: 50px;
    width: 1500px;
    display: flex;

    img {
      width: 350px;
      height: 500px;
      border-radius: 20px;
    }

    .generalInfoContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-left: 50px;
      gap: 20px;

      .detailsSection {
        display: flex;
        flex-direction: column;
        gap: 20px;
      
        .title {
          color: white;
          font-size: 55px;
          max-width: 800px;
          margin-bottom: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }

        .voteRate {
          .Rating {
            font-size: 35px;
          }
        }

        .secondaryInfo {
          display: flex;
          gap: 30px;

          .releaseYear {
            color: white;
            font-size: 20px;
          }

          .genres {
            display: list-item;
            color: white;
            font-size: 20px;
            font-weight: 100;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;  
            overflow: hidden;
            max-width: 600px;
          }
        }
      }
      
      .overviewSection {
            max-width: 800px;
            color: white;
            
            .content {
                font-size: 20px;
                font-weight: 100;
                display: -webkit-box;
                -webkit-line-clamp: 9;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                max-width: 800px;
            }
      }
    }
  }
`;

export default SelectedMovieContainer;