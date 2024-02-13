import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const Token = localStorage.getItem("userExist");
    if (Token) {
      navigate("/dashboard");
    }
  }, []);

  //POST API for login and account activated
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://192.168.1.172:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);
      if (response.ok) {
        if (res_data.userExist.isVerified === false) {
          alert("not verified yet");
        } else {
          localStorage.setItem("userExist", JSON.stringify(res_data.userExist));
          localStorage.setItem("Token", JSON.stringify(res_data.Token));
          setIsLoading(false);
          if (res_data.userExist.isadmin === "Admin") {
            navigate("/admindash");
          } else {
            navigate("/dashboard");
          }
        }
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <body className="bg-white">
        {/* <!-- Example --> */}
        <div className="flex min-h-screen">
          {/* <!-- Container --> */}
          <div className="flex flex-row w-full">
            {/* <!-- Sidebar --> */}
            <div className="hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
              <div className="flex items-center justify-start space-x-3">
              </div>
              <div className="space-y-5">
                <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
                  Enter your account and discover new experiences
                </h1>
                <p className="text-lg">You do not have an account?</p>
                <Link
                  to={"/register"}
                  className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                >
                  Create account here
                </Link>
              </div>
              <p className="font-medium"></p>
            </div>

            {/* <!-- Login --> */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col items-center justify-center px-10 relative"
            >
              <div className="flex lg:hidden justify-between items-center w-full py-4">      
                <div className="flex items-center space-x-2">
                  <span>Not a member? </span>
                  <Link
                    to={"/register"}
                    className="underline font-medium text-[#070eff]"
                  >
                    Sign up now
                  </Link>
                </div>
              </div>
              {/* <!-- Login box --> */}
              <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                <div className="flex flex-col space-y-2 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Welcome back! Sign in to account
                  </h2>
                  <p className="text-md md:text-xl"></p>
                </div>
                <div className="flex flex-col max-w-md space-y-5">
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  <input
                    type="password"
                    placeholder="Password *"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                    SIGN IN
                  </button>
                  <div className="ml-auto">
                    <Link to="/forgot_password" className="">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};

export default Login;
