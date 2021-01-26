import React from "react";
import { StyledUserProfile } from "./UserProfile.styled";
import UserProfileForm from "../Form/UserProfileForm";
import PasswordResetForm from "../Form/PasswordResetForm";

export default function UserProfile() {
  return (
    <StyledUserProfile>
      <div className="user-detail">
        <UserProfileForm />
      </div>
      <div className="user-password">
        <PasswordResetForm />
      </div>
    </StyledUserProfile>
  );
}
