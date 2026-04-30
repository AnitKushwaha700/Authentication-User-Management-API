import React from "react";

const App = () => {
  return (
    <>
      <div>
        <header className="bg-[#C2410C] px-10 h-[65px] flex p-1 justify-between items-center sticky top-0 w-full">
          <div>
            <img src="logo.png" alt="" className="h-13" />
          </div>
          <div className="flex gap-3 ">
            <button className="text-white hover:outline rounded px-3 py-1 ">
              Login
            </button>
            <button className=" bg-white text-[#C2410C] hover:bg-transparent hover:text-white hover:outline rounded px-3 py-1 ">
              Register
            </button>
          </div>
        </header>

        <img
          src="foodTable.webp"
          className="w-full h-[93vh] object-cover"
          alt=""
        />

        <main className="absolute sm:top-50 sm:left-30 top-50 left-[6%]">
          <div className="bg-white text-center rounded-xl grid gap-3 p-8 md:w-100 w-75 ">
            <h1 className="text-[#C2410C] text-3xl font-bold">Welcome Back</h1>
            <p className="opacity-60">Login your Cravings account</p>

            <div className=" text-start grid gap-5">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  className="border-[#ffbfa5] border-1  rounded-sm ps-2 text-sm h-10 focus:outline-[#C2410C]"
                />
              </div>
              <div className="grid gap-2 ">
                <label htmlFor="pass">Password</label>
                
                <div className="border-[#ffbfa5] border-1 rounded-sm ps-2 text-sm  h-10 flex items-center justify-between pe-5 focus-within:outline-[#C2410C] focus-within:outline-2">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    id="pass"
                    className="border-none outline-none "
                  />
                  <i class="bi bi-eye-fill"></i>
                </div>
              </div>
            </div>

            <div className="flex justify-between p-1 pb-3">
              <div className="flex gap-2">
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="opacity-60">
                  Remember me
                </label>
              </div>
              <a href="" className="text-[#C2410C] hover:underline">
                Forgot Password?
              </a>
            </div>

            
            <button className="bg-[#C2410C] text-white h-10 text-xl rounded-md">
              Login
            </button>
            <div className="flex items-center justify-center opacity-50 gap-2 pt-3">
              <hr className="w-20 opacity-75" />
              <span>Don't have an account</span>
              <hr className="w-20 opacity-75" />
            </div>
            <a href="" className="text-[#C2410C] hover:underline">
              Create an account
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
