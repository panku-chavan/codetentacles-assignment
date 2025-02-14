import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { loginUser } from "../redux/feature/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)?.toLowerCase();
  const navigate = useNavigate();
  useEffect(() => {
    if (role) {  
      if (role === "admin") {
        navigate("/List", { replace: true });
      } else if (role === "user") {
        navigate("/Product", { replace: true });
      }
    }
  }, [role, navigate]); 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    dispatch(loginUser(credentials));
  };

  return (
    <>
      <section
        className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img"
        style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-96 flex">
              <div className="w-full bg-login p-6 rounded-lg">
                <div className="heading-1 pt-10 m-auto ">
                  <img
                    src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                    alt="login-img"
                    className="rounded-full m-auto p-1 border"
                    width="100px"
                    height="100px"
                  />
                  <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">
                    Login
                  </h3>
                </div>
                <form className="pt-8 rounded" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-4 md:mr-2">
                    <input
                      className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      {" "}
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
