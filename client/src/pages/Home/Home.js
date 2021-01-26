import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HomeContainer } from "./Home.styles";
import { fetchTours } from "../../actions/toursActions";
import TourCard from "../../components/TourCard/TourCard";

function Home(props) {
  let { fetchTours, tours } = props;
  //fetch all tours
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  let renderTourCards = () => {
    if (tours.length) {
      return tours.map((tour) => (
        <TourCard key={tour.name} tour={{ ...tour }} />
      ));
    } else {
      return <h2>Loading...</h2>;
    }
  };

  return (
    <HomeContainer>
      <div className="tours-container">{renderTourCards()}</div>
    </HomeContainer>
  );
}

let mapStateToProps = (state) => {
  return {
    tours: state.toursState.tours,
  };
};

export default connect(mapStateToProps, { fetchTours })(Home);
