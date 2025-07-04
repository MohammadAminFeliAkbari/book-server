"use client";

import Link from "next/link";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../../../context/AppContext";
import config from "../../config";
import Buttons_Main from "./Buttons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Header() {
  const [loading, setLoading] = useState(true);
  const { setAccess, access } = useContext(AppContext);
  const router = useRouter();

  const fetchUserData = async () => {
    await axios
      .post(`${config.BASE_URL}/auth/refresh/`, {
        refresh: localStorage.getItem("refresh"),
      })
      .then((res) => {
        const data = res.data;

        localStorage.setItem("refresh", data.refresh);
        setAccess(data.access);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${config.BASE_URL}/auth/logout/`,
        {
          refresh: localStorage.getItem("refresh"),
        },
        {
          headers: {
            ...(access && { Authorization: `Bearer ${access}` }),
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("refresh");
      setAccess(null);
      toast.success("!باموفقیت خارج شدید");
    } catch {
      router.push("/networkError");
    }
  };

  return (
    <header className="relative flex items-center justify-between w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <Link
        className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
        href="/"
      >
        کتاب بان
      </Link>

      <div className="flex items-center gap-5">
        <Buttons_Main />
        {access && (
          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            خروج
          </button>
        )}
      </div>

      <Toaster position="top-left" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </header>
  );
}
