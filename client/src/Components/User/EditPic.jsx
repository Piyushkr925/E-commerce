import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPic = ({ closeModal }) => {

  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();
  //GET User Data That Store In Local Storage 
  const Token = localStorage.getItem("userExist");
  const id = JSON.parse(Token).id;

  //Set Profile Image In Change
  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };
  
  //POST Profile Image By User In Database
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    axios
      .patch("http://192.168.1.172:5000/user/updateProfile/" + id, formData)
      .then((res) => {
        console.log(res);
        navigate("/profile");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //GET Profile Image of User
  const getProfile = async () => {
    await axios
      .get("http://192.168.1.172:5000/user/getProfileImg/" + id)
      .then((result) => {
        console.log("lll", result.data);
        setProfileImage(
          `http://192.168.1.172:5000/images/${result.data.result.profileImage}`
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div className="bg-slate-800 bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-6 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-20">
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Profile Image</label>

                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-6">
                  <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                    Create
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPic;
