"use client";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserInfo } from "../redux/user-slice";
import { useEffect } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.user.token);
  const user = useSelector((s) => s.user.user);

  const handleLogin = async () => {
    const res = await dispatch(
      loginUser({
        username: "emilys",
        password: "emilyspass",
      })
    );
    if (res.payload?.accessToken) {
      dispatch(getUserInfo(res.payload.accessToken));
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>

      <pre className="mt-4 bg-gray-100 p-4">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
