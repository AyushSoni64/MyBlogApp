import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, authMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showSuccess, showError } = useToastContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  useEffect(() => {
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsButtonDisabled(false);
      setError("");
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleEmailBlur = () => setEmailBlurred(true);
  const handlePasswordBlur = () => setPasswordBlurred(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/v1/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data.data;
        login(token, user);
        showSuccess("User Logged in Successfully");
        navigate("/");
      } else {
        setError("Login failed");
        showError("Login Failed");
      }
    } catch (err) {
      console.log("Error from login\n", err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {authMessage && <p className="text-red-500 mb-4">{authMessage}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {emailBlurred && !emailRegex.test(email) && email !== "" && (
              <p className="text-red-500 text-sm">Invalid email address</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
            {passwordBlurred &&
              !passwordRegex.test(password) &&
              password !== "" && (
                <p className="text-red-500 text-sm">
                  Password must be at least 8 characters long, contain at least
                  one letter, one number, and one special character
                </p>
              )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
