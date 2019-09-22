import React, { useState } from "react";
import { FirebaseContext } from "../firebase";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordResent] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordResent(true);
      setPasswordResetError(null);
    } catch (error) {
      console.error("Error Sending email", error);
      setPasswordResetError(error.message);
      setIsPasswordResent(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={e => setResetPasswordEmail(e.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
