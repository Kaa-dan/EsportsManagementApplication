import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuthMutation } from "../../../../application/slice/user/authApiSlice";
function GoogleButton() {
  const [GoogleAuthApi] = useGoogleAuthMutation();

  const successHandler = async (credentialResponse) => {
    try {
      const responce = await GoogleAuthApi(credentialResponse).unwrap();
      console.log(responce);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="App" style={{paddingTop:8}}>
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
