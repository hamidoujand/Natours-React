import React, { useEffect } from "react";
import { TourDetailContainer } from "./TourDetail.styled";
import { connect } from "react-redux";
import { fetchSingleTour } from "../../actions/toursActions";
import DetailHeader from "../../components/DetailHeader/DetailHeader";
import TourDescription from "../../components/TourDescription/TourDescription";
import DetailImages from "../../components/DetailImages/DetailImages";
import Map from "../../components/Map/Map";
import Reviews from "../../components/Reviews/Reviews";
import DetailCta from "../../components/DetailCta/DetailCta";

function TourDetail(props) {
  let tourId = props.match.params.tourId;
  let { fetchSingleTour } = props;
  useEffect(() => {
    fetchSingleTour(tourId);
  }, [tourId, fetchSingleTour]);
  let renderTour = () => {
    if (props.tour) {
      let {
        name,
        duration,
        startLocation,
        imageCover,
        images,
        locations,
        reviews,
      } = props.tour;
      return (
        <div>
          <DetailHeader
            name={name}
            duration={duration}
            startLocation={startLocation.description}
            imageCover={imageCover}
          />
          <TourDescription tour={props.tour} />
          <DetailImages images={images} />
          <Map locations={locations} startLocation={startLocation} />
          <Reviews reviews={reviews} />
          <DetailCta images={images} duration={duration} />
        </div>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  };
  return <TourDetailContainer>{renderTour()}</TourDetailContainer>;
}

let mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.tourId;
  return {
    tour: state.toursState.tours.find((tour) => tour._id === id),
  };
};

export default connect(mapStateToProps, { fetchSingleTour })(TourDetail);
