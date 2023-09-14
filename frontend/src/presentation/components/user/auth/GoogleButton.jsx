import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuthMutation } from "../../../../application/slice/user/authApiSlice"; // Redux Toolkit Query mutation
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../../application/slice/user/authSlice"; // Redux action for setting user credentials

function GoogleButton() {
  const [GoogleAuthApi] = useGoogleAuthMutation(); // Mutation function for Google OAuth
  const navigate = useNavigate(); // React Router's navigate function
  const dispatch = useDispatch(); // Redux dispatch function

  // Success handler for Google OAuth login
  const successHandler = async (credentialResponse) => {
    try {
      // GoogleAuth mutation
      const response = await GoogleAuthApi(credentialResponse).unwrap();

      const { message, ...user } = response;

      // If the response contains an email (successful login), proceed
      if (user.email) {
        //  storing user data in Redux
        dispatch(setCredentials({ ...user }));

        // Display a success toast message
        toast(message);

        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
      // Display an error
      toast(error.message);
    }
  };

  return (
    <div className="App" style={{ paddingTop: 8 }}>
      {/* Render the Google OAuth login button */}
      <GoogleLogin
        width={"100%"}
        onSuccess={successHandler}
        onError={() => {
          console.log("Login Failed");
        }}
        theme="filled_black"
        text="continue_with"
      />
    </div>
  );
}

export default GoogleButton;
