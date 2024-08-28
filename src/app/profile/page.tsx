'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const routers = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("Can't get user details");
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout Success");
      routers.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  // useEffect(()=>{
  //   getUserDetails()
  // },[])
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "" ? (
          "Nothing to show"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
      <hr />
      <button
        onClick={logout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>
    </div>
  );
}
