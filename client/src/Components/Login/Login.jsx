export const Login = () => {
    return (
      <div className="w-full">
        <div className="w-3/5">
          <div className="logo flex items-center p-2">
            <img className="w-16" src="https://imgs.search.brave.com/p03IZrKSpg003NoZech3qM-mDad5N_gy6_tbf_CtTZw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FyYm9uZm9vdHBy/aW50LmNvbS9pbWFn/ZXMvaWNvbl9zaG91/dF9ibGFjay5wbmc" alt="logo"/>
            <h1 className="text-2xl font-bold mx-2">Linkers</h1>
          </div>
          <div className="text-center my-2 py-2">
            <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Welcome Back!</h1>
            <p className="text-xl leading-none text-gray-700">Log in into Linkers!</p>
          </div>
          <div className="form-section flex flex-col justify-center items-center">
            <form className="flex flex-col justify-center items-center w-full">
              <input type="email" placeholder="Email" className="bg-gray-100 p-4 rounded-md w-4/5 my-2" />
              <input type="test" placeholder="Password" className="bg-gray-100 p-4 rounded-md w-4/5 my-2" />
              <button type="submit" className="p-4 rounded-full my-2 bg-gray-100  w-4/5">Login</button>
            </form>
            <hr />
            <div className="or flex justify-center">
              <p className="">or signin with</p>
            </div>
            <div className="boxes flex justify-evenly my-4">
              <span>
                <img src="/image/google.png" alt="not fount" className="w-12 cursor-pointer"/>
              </span>
              <span>
                <img src="/image/apple-logo.png" alt="not fount" className="w-12 mx-12 cursor-pointer"/>
              </span>
              <span>
                <img src="image/facebook.png" alt="not fount" className="w-12 cursor-pointer"/>
              </span>
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <img src="" />
        </div>
      </div>
    );
  };
  