import React, { useEffect, useState } from "react";
import { StyledUserProfileForm } from "./UserProfileForm.styled";
import Input from "../Input/Input";
import { connect } from "react-redux";
import { StyledSubmitButton } from "../../styles/GlobalStyles";
import {
  updateUserProfile,
  signupErrorsReset,
} from "../../actions/authActions";
import Popup from "../Popup/Popup";

function UserProfileForm(props) {
  let [formState, setFormState] = useState({ name: "", email: "" });
  let [image, setImage] = useState(null);

  let name;
  let email;
  if (props.user) {
    name = props.user.name;
    email = props.user.email;
  }
  useEffect(() => {
    setFormState({ name, email });
  }, [name, email]);

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  let handleFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("photo", image);
    formData.append("email", formState.email);
    formData.append("name", formState.name);
    props.updateUserProfile(formData);
  };
  let onPopupClose = () => {
    props.signupErrorsReset();
  };
  let renderPopup = () => {
    if (props.error) {
      return <Popup message={props.error.message} closePopup={onPopupClose} />;
    }
  };
  return (
    <StyledUserProfileForm>
      {renderPopup()}
      <form className="user-profile-form" onSubmit={handleFormSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          value={formState.name}
          onInputChange={handleInputChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formState.email}
          onInputChange={handleInputChange}
        />
        <div className="avatar">
          <img
            src={`/img/users/${props.user && props.user.photo}`}
            alt={props.user && props.user.name}
            className="avatar-pic"
          />
          <input
            type="file"
            id="avatar-file"
            className="avatar-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="avatar-file" className="avatar-label">
            choose a profile pic
          </label>
        </div>
        <div className="button-wrapper">
          <StyledSubmitButton>
            {props.loading ? "Updating....." : "Update"}
          </StyledSubmitButton>
        </div>
      </form>
    </StyledUserProfileForm>
  );
}

let mapStateToProps = (state) => {
  return {
    user: state.authState.user,
    loading: state.authState.loading,
    error: state.authState.error,
  };
};

export default connect(mapStateToProps, {
  updateUserProfile,
  signupErrorsReset,
})(UserProfileForm);
