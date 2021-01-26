import React, { useState } from "react";
import { StyledPasswordResetForm } from "./PasswordResetForm.styled";
import Input from "../Input/Input";
import { StyledSubmitButton } from "../../styles/GlobalStyles";
import { updatePassword } from "../../actions/authActions";
import { connect } from "react-redux";

function PasswordResetForm(props) {
  let [formState, setFormState] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  let onInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  let handleFormSubmit = (e) => {
    e.preventDefault();
    props.updatePassword(formState);
  };
  return (
    <StyledPasswordResetForm>
      <form className="password-reset" onSubmit={handleFormSubmit}>
        <Input
          label="Current Password"
          type="password"
          name="password"
          value={formState.password}
          onInputChange={onInputChange}
          placeholder="********"
        />
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          value={formState.newPassword}
          onInputChange={onInputChange}
          placeholder="********"
        />
        <Input
          label="New Password Confirm"
          type="password"
          name="newPasswordConfirm"
          value={formState.newPasswordConfirm}
          onInputChange={onInputChange}
          placeholder="********"
        />
        <div className="button-wrapper">
          <StyledSubmitButton>
            {props.loading ? "Updating...." : "Update Password"}
          </StyledSubmitButton>
        </div>
      </form>
    </StyledPasswordResetForm>
  );
}
let mapStateToProps = (state) => {
  return {
    loading: state.authState.loading,
  };
};
export default connect(mapStateToProps, { updatePassword })(PasswordResetForm);
