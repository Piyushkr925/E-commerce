import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./auth.css"

const Register = () => {
  const [username, setUsername] = useState("");
  const [isVerified, setisVerified] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isadmin, setIsAdmin] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const Token = localStorage.getItem("userExist");
    if (Token) {
      navigate("/dashboard");
    }
  });

  //POST API for Registration and Selection for admin or user
  const handleSubmit = async (e) => {
    if (isadmin === "Admin" && secretKey !== "Piyush925") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      try {
        const response = await fetch("http://192.168.1.172:5000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isadmin,
            username,
            email,
            password,
            isVerified,
          }),
        });
        const res_data = await response.json();
        console.log("res from server", res_data);
        if (response.ok) {
          if (res_data.userCreated.isVerified === false) {
            navigate("/");
            alert("Verification Email send to your Gmail")
          } else {
            if (res_data.userCreated.isadmin === "Admin") {
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
                <p className="text-lg">You Already have an account?</p>
                <Link
                  to={"/"}
                  className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                >
                  Log In account here
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
                  <span>Already a member? </span>
                  <Link
                    to={"/"}
                    className="underline font-medium text-[#070eff]"
                  >
                    Sign In now
                  </Link>
                </div>
              </div>
              {/* <!-- Login box --> */}
              <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                <div className="flex flex-col space-y-2 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    New member! Sign Up to account
                  </h2>
                  <div className="space-x-5">
                    <input
                      type="radio"
                      required
                      name="isadmin"
                      value="User"
                      onChange={(e) => setIsAdmin(e.target.value)}
                    />
                    User
                    <input
                      type="radio"
                      required
                      name="isadmin"
                      value="Admin"
                      onChange={(e) => setIsAdmin(e.target.value)}
                    />
                    Admin
                  </div>
                </div>
                <div className="flex flex-col max-w-md space-y-5">
                  {isadmin === "Admin" ? (
                    <input
                      type="password"
                      placeholder="Secret Key *"
                      required
                      onChange={(e) => setSecretKey(e.target.value)}
                      className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                    />
                  ) : null}
                  <input
                    type="text"
                    placeholder="Username *"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
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
                    SIGN UP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- Example --> */}
      </body>
    </>
  );
};

export default Register;
