import React, { useState } from "react";
import GrHeading from "../GrHeading/GrHeading";
import Input from "../Input/Input";
import { StyledForm } from "./LoginForm.styled";
import { StyledSubmitButton } from "../../styles/GlobalStyles";
import { connect } from "react-redux";
import { login, loginErrorReset } from "../../actions/authActions";
import Popup from "../Popup/Popup";
import { withRouter } from "react-router-dom";

function Form(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleFormSubmit = (e) => {
    e.preventDefault();
    let loginData = { email, password };
    props.login(loginData, props.history);
  };

  let handlePopupClose = () => {
    props.loginErrorReset();
  };

  let renderPopup = () => {
    if (props.loginFormErrors) {
      return (
        <Popup
          message={props.loginFormErrors.message}
          closePopup={handlePopupClose}
        />
      );
    }
  };
  return (
    <StyledForm onSubmit={handleFormSubmit}>
      {renderPopup()}
      <div className="header-wrapper">
        <GrHeading>Login to your account</GrHeading>
      </div>
      <Input
        label="Email Address"
        type="email"
        onInputChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        label="Password"
        type="password"
        onInputChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <StyledSubmitButton>Submit</StyledSubmitButton>
    </StyledForm>
  );
}
let mapStateToProps = (state) => {
  return {
    loginFormErrors: state.authState.error,
  };
};
export default connect(mapStateToProps, { login, loginErrorReset })(
  withRouter(Form)
);
