import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import facebook_icon from "../assets/facebook-icon.png";
import google_icon from "../assets/google-icon.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isAuthenticated, login, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      login(data.accessToken, data.refreshToken);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  function facebookLogin(e) {
    e.preventDefault();
    var facebookEndpoint = `${import.meta.env.VITE_FACEBOOK_ENDPOINT}`;
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", facebookEndpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: `${import.meta.env.VITE_FACEBOOK_CLIENT_ID}`,
      redirect_uri: `${import.meta.env.VITE_FACEBOOK_LOGIN_REDIRECT_URL}`,
      response_type: "code",
      scope: "public_profile email",
      include_granted_scopes: "true",
      state: `${import.meta.env.VITE_FACEBOOK_STATE}`,
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  const redirectGoogleAuthPage = (e) => {
    e.preventDefault();
    //store state in session storage
    // const randomBytes = new Uint8Array(1024);
    // window.crypto.getRandomValues(randomBytes);
    // const hashBuffer = crypto.subtle.digest('SHA-256', randomBytes);
    // hashBuffer.then((hash) => {
    //   const hashArray = Array.from(new Uint8Array(hash)); // Chuyển đổi buffer thành mảng
    //   const state = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Chuyển mảng thành chuỗi hex

    //   // Lưu vào sessionStorage
    //   const timestampState = Date.now() + '.' + state;
    //   localStorage.setItem('state', timestampState);

    const nonce = `${import.meta.env.NONCE}`;

    //sleep
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email%20profile&client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_URI
    }&nonce=${nonce}`;
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center border border-gray-300 rounded-lg shadow-md">
      {isAuthenticated ? (
        <div>
          <h2 className="text-xl font-semibold text-green-600 mt-4">
            Hello again, {userData.name}!
          </h2>
          <p className="mt-2 text-gray-600">You are already logged in.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Login</h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col space-y-4"
          >
            <div className="text-left">
              <label className="font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="text-left">
              <label className="font-medium text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className={
                loading
                  ? "cursor-not-allowed px-4 py-2 bg-green-300 text-white font-medium rounded-lg"
                  : "px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
              }
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="flex flex-row gap-x-8 justify-center">
              <button onClick={facebookLogin}>
                <img src={facebook_icon} alt="facebook" className="w-[40px]" />
              </button>
              <button onClick={(redirectGoogleAuthPage)}>
                <img src={google_icon} alt="google" className="w-[40px]" />
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <p className="mt-6 text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-500 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
