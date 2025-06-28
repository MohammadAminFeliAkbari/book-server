"use client";

import Link from "next/link";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../../../context/AppContext";
import config from "../../config";
import Buttons_Main from "./Buttons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MyDrawer from "./Drawer";

export default function Header() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { refresh, access, setAccess, setRefresh } = useContext(AppContext);

  // ذخیره و بازیابی توکن از localStorage
  useEffect(() => {
    setAccess(localStorage.getItem("access"));
    setRefresh(localStorage.getItem("refresh"));
  }, [setAccess, setRefresh]);

  const fetchUserData = useCallback(async () => {
    if (!access) return setLoading(false);

    try {
      const { data } = await axios.get(`${config.BASE_URL}/account/me/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ").trim();
      if (fullName) {
        setUsername(fullName);
        toast.success(`${fullName} خوش آمدی!`, { duration: 5000 });
      }
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401 && refresh) {
        try {
          const { data: tokenRes } = await axios.post(`${config.BASE_URL}/auth/refresh/`, { refresh });
          localStorage.setItem("access", tokenRes.access);
          setAccess(tokenRes.access);
        } catch {
          logout();
        }
      }
    } finally {
      setLoading(false);
    }
  }, [access, refresh, setAccess]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const logout = async () => {
    try {
      await axios.post(`${config.BASE_URL}/auth/logout`, { refresh });
    } catch {}
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
    setUsername("");
  };

  return (
    <header className="relative flex items-center justify-between w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <button onClick={() => setOpen(true)}>
        <MyDrawer open={open} setOpen={setOpen} username={username} />
        <span className="sr-only">Open Menu</span>
      </button>

      <Link
        className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
        href="/"
      >
        کتاب بان
      </Link>

      <div className="flex items-center gap-5">
        <Buttons_Main />
        {username && (
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
