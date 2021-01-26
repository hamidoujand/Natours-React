import React, { useState } from "react";
import { connect } from "react-redux";
import GrHeading from "../GrHeading/GrHeading";
import { StyledSignupForm } from "./SignupForm.styled";
import Input from "../Input/Input";
import { StyledSubmitButton } from "../../styles/GlobalStyles";
import { signup, signupErrorsReset } from "../../actions/authActions";
import Popup from "../Popup/Popup";
import { withRouter } from "react-router-dom";

function SignupForm(props) {
  let [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  let handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  let handleFormSubmit = (e) => {
    e.preventDefault();
    props.signup(formState, props.history);
  };

  let handlePopupClose = () => props.signupErrorsReset();

  let renderPopup = () => {
    if (props.signUpError) {
      return (
        <Popup
          message={props.signUpError.message}
          closePopup={handlePopupClose}
        />
      );
    }
  };
  return (
    <StyledSignupForm onSubmit={handleFormSubmit}>
      {renderPopup()}
      <div className="header-wrapper">
        <GrHeading>Create your account</GrHeading>
      </div>
      <Input
        name="name"
        value={formState.name}
        onInputChange={handleInputChange}
        type="text"
        label="name"
      />
      <Input
        name="email"
        value={formState.email}
        onInputChange={handleInputChange}
        type="email"
        label="Email"
      />
      <Input
        name="password"
        value={formState.password}
        onInputChange={handleInputChange}
        type="password"
        label="Password"
      />
      <Input
        name="passwordConfirm"
        value={formState.passwordConfirm}
        onInputChange={handleInputChange}
        type="password"
        label="Password Confirm"
      />
      <StyledSubmitButton>Signup</StyledSubmitButton>
    </StyledSignupForm>
  );
}

let mapStateToProps = (state) => {
  return { signUpError: state.authState.error };
};

export default connect(mapStateToProps, { signup, signupErrorsReset })(
  withRouter(SignupForm)
);
