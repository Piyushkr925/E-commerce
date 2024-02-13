import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();

//UPDATE function for Verify Account through email.
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .patch("http://192.168.1.172:5000/user/verify_email/" + id)

      .then((res) => {
        console.log(res);
        openToast(timer);
      })
      .catch((error) => alert("Failed", error));
  }

//Using Toast for Alert 
  let timer;
  const openToast = () => {
    if (open) return;
    setOpen(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const closeToast = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);
  return (
    <div>
      <div className="bg-[#ffe85c] h-screen overflow-hidden flex items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center px-15 relative">
          <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
            <div className="min-w-screen grid min-h-screen place-items-center">
              <button
                type="button"
                onClick={closeToast}
                style={{ display: open ? "block" : "none" }}
                className="fixed right-4 top-4 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">
                    <i className="bx bx-check"></i>
                  </span>
                  <p className="font-bold">
                    You are verified Successfully Go to LOgin Page!
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
              >
                Click Me For Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
