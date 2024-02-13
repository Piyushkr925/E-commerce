import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  //POST Forget Password Send Reset Password Link In Mail
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.1.172:5000/user/forgot_password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/register");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-[#ffe85c] h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-white mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col items-center justify-center px-15 relative"
          >
            {/* <!-- Login box --> */}
            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-3xl font-bold">
                  Forgot your password?
                </h2>
                <p className="text-md md:text-xl">
                  Fill up the form to reset the password
                </p>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />

                <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                  Sent Reset Link
                </button>
              </div>
              <div className="ml-auto">
                <p>
                  Don't have an account yet?
                  <Link to="/register" className="">
                    <span className=""> Sign Up</span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
