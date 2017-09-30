import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

/*Hello friends! Here is a Google oAUth login React component.
onSuccess callback:
    If responseType is not 'code', callback will return the GoogleAuth object.

    If responseType is 'code', callback will return the offline token for use on your server.

    If you use the hostedDomain param, make sure to validate the id_token (a JSON web token) returned by Google on your backend server:

    In the responseGoogle(response) {...} callback function, you should get back a standard JWT located at response.hg.id_token
    Send this token to your server (preferably as an Authorization header)
    Have your server decode the id_token by using a common JWT library such as jwt-simple or by sending a GET request to https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=YOUR_TOKEN_HERE
    The returned decoded token should have an hd key equal to the hosted domain you'd like to restrict to.

For documentation, see: https://www.npmjs.com/package/react-google-login
*/

const responseGoogle = (response) => {
  console.log(response);
}

ReactDOM.render(
    <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        />,
  document.getElementById('root')
);

export default GoogleLogin;