import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function AddAdminPage() {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  function changeHandler(e) {
    e.preventDefault();
    const data = e.target.name;
    const value = e.target.value;
    const newData = {
      ...registerInput,
    };
    newData[data] = value;
    setRegisterInput(newData);
  }

  function submitHandler(e) {
    e.preventDefault();

    const error = [];
    if (!registerInput.email) {
      error.push("Email is required");
    }
    if (!registerInput.password) {
      error.push("Password is required");
    }
    if (error.length) {
      const message = error.join(", ");
      swal("Error", message, "error");
    }
    fetch("https://p3-challenge-ridhokhalis.herokuapp.com/add-admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(registerInput),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode) {
          throw { code: data.statusCode, message: data.message };
        }
        navigate("/products");
      })
      .catch((err) => {
        let message = err.message;
        if (Array.isArray(message)) {
          if (message.length > 1) {
            message.join(",");
          } else {
            message = message[0];
          }
        }
        swal("Error", message, "error");
      });
  }

  return (
    <div className="bg-white">
      <div className="py-2 px-30 my-8">
        <form
          action=""
          className="space-y-6 w-1/3 mx-auto"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold">Add Admin</h1>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                autoFocus
                onChange={changeHandler}
                value={registerInput.username}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={changeHandler}
                value={registerInput.email}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={changeHandler}
                value={registerInput.password}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={changeHandler}
                value={registerInput.phoneNumber}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={changeHandler}
                value={registerInput.address}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-smalt hover:bg-darkSmalt focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkSmalt"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAdminPage;
