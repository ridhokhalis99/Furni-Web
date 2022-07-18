import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LoginPage() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const error = [];
    if (!loginInput.email) {
      error.push("Email is required");
    }
    if (!loginInput.password) {
      error.push("Password is required");
    }

    if (error.length) {
      console.log("masuk");
      const message = error.join(", ");
      return swal("Error", message, "error");
    }

    fetch("https://p3-challenge-ridhokhalis.herokuapp.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInput),
    })
      .then(async (response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode) {
          throw { code: data.statusCode, message: data.message };
        }
        const access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
        navigate("/products");
      })
      .catch((err) => {
        const message = err.message;
        swal("Error", message, "error");
      });
  };

  return (
    <div className="m-40 mx-auto max-w-md">
      <div className="bg-white py-8 px-6 shadow-md rounded-lg">
        <h2 className="mt-4 mb-8 text-center text-3xl font-bold text-smalt">
          Sign in
        </h2>
        <form action="" className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                autoFocus
                value={loginInput.email}
                onChange={(e) => {
                  setLoginInput({
                    ...loginInput,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                value={loginInput.password}
                onChange={(e) => {
                  setLoginInput({
                    ...loginInput,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-smalt hover:bg-darkSmalt focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkSmalt"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
