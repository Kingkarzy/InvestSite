import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
const baseUrl = import.meta.env.VITE_BASE_URL;

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorss, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const newPass = async (values) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/forgetpass`,
        values
      );
      const passChanged = response.data;

      if (passChanged) {
        navigate("/login");
      }
    } catch (err) {
      setError(!errorss);
      setIsLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleOpen();
    newPass({
      username,
      password,
      email,
      lastName,
    });
  };

  if (password !== confirmPassword) {
    setPasswordMatch(false);
    setIsLoading(false);
    return;
  }
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  if (isLoading) {
    return <Loading handleClose={handleClose} open={open} />;
  }
  return (
    <div className="w-screen flex justify-center align-middle my-auto">
      <div className="m-8 lg:m-0 p-6 lg:p-16 w-10/12 md:w-7/12 lg:w-5/12 bg-white shadow-2xl rounded-t-3xl rounded-br-3xl">
        <h1 className="text-center text-2xl font-semibold">
          Enter your Account Info
        </h1>
        <form className="flex flex-wrap flex-col justify-center mt-5">
          <input
            className="flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm"
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          <input
            className="flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm"
            type="text"
            placeholder="Lastname"
            required
            onChange={(e) => setLastName(e.target.value.toLowerCase())}
          />
          <input
            className="flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm"
            type="text"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <div className="relative flex-1 mr-2 pr-2">
            <input
              className="flex-1 min-w-[40%] w-full m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base pr-[2.5rem]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              name="togglePassword"
              onClick={handleTogglePassword}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: "1.2rem" }} />
              ) : (
                <Visibility sx={{ fontSize: "1.2rem" }} />
              )}
            </button>
          </div>
          <div className="relative flex-1 mr-2 pr-2">
            <input
              className="flex-1 min-w-[40%] w-full m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base pr-[2.5rem]"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              name="toggleConfirmPassword"
              onClick={handleToggleConfirmPassword}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
            >
              {showConfirmPassword ? (
                <VisibilityOff sx={{ fontSize: "1.2rem" }} />
              ) : (
                <Visibility sx={{ fontSize: "1.2rem" }} />
              )}
            </button>
          </div>
          {!passwordMatch && (
            <span className="text-red-400 mx-2 text-sm lg:text-base">
              Passwords do not match
            </span>
          )}
          <div className="flex flex-col w-full items-center mt-5 px-2">
            <button
              className="w-full px-4 text-lg py-2 bg-[#2d21d3] text-white hover:scale-105 rounded-t-xl rounded-br-xl"
              onClick={handleClick}
            >
              UPDATE
            </button>
            {errorss && (
              <div className="mt-2 text-sm">
                <span className="text-red-600 ">Invalid Account Details </span>
                <Link to={"/login"} className="text-blue">
                  Login?
                </Link>
              </div>
            )}
            <a
              className="m-3 text-xs underline cursor-pointer"
              href="/register"
            >
              Having Issues? <a href="mailto:support@goobull.com"><b>contact support</b></a>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
