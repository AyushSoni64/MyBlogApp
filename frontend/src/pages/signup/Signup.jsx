import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToastContext } from "../../context/ToastContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { showSuccess } = useToastContext();

  const [firstnameBlurred, setFirstnameBlurred] = useState(false);
  const [lastnameBlurred, setLastnameBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  useEffect(() => {
    if (
      emailRegex.test(email) &&
      nameRegex.test(firstname) &&
      nameRegex.test(lastname) &&
      passwordRegex.test(password) &&
      password === confirmPassword
    ) {
      setIsButtonDisabled(false);
      setError("");
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstname, lastname, email, password, confirmPassword]);

  const handleFirstnameBlur = () => setFirstnameBlurred(true);
  const handleLastnameBlur = () => setLastnameBlurred(true);
  const handleEmailBlur = () => setEmailBlurred(true);
  const handlePasswordBlur = () => setPasswordBlurred(true);
  const handleConfirmPasswordBlur = () => setConfirmPasswordBlurred(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { firstname, lastname, email, password };
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/v1/register",
        data
      );
      if (response.status === 201) {
        showSuccess("User Registered Successfully");
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Registration failed inside catch block");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleFirstnameBlur}
              />
              {firstnameBlurred &&
                !nameRegex.test(firstname) &&
                firstname !== "" && (
                  <p className="text-red-500 text-sm">Invalid first name</p>
                )}
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={handleLastnameBlur}
              />
              {lastnameBlurred &&
                !nameRegex.test(lastname) &&
                lastname !== "" && (
                  <p className="text-red-500 text-sm">Invalid last name</p>
                )}
            </div>
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
            />
            {confirmPasswordBlurred &&
              password !== confirmPassword &&
              confirmPassword !== "" && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            Signup
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
