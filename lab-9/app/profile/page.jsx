"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../redux/user-slice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.user.token);
  const user = useSelector((s) => s.user.user);

  useEffect(() => {
    const storedToken = typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

    if (!token && storedToken) {
      dispatch(getUserInfo(storedToken));
    }

    if (token && !user) {
      dispatch(getUserInfo(token));
    }
  }, [token, user, dispatch]);

  if (!token && !localStorage.getItem("token")) {
    return <div className="p-10">You must login first.</div>;
  }

  if (!user) {
    return <div className="p-10">Loading user…</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <pre className="mt-4 bg-gray-100 p-4">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
