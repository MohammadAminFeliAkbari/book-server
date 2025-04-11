"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import config from "../../config";
import Drawer from "./Drawer";
import { Button } from "@mui/material";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [username, setUsername] = useState("");
  const [hiddenName, setHiddenName] = useState(false);

  const { refresh, access, setAccess, setRefresh } = useContext(AppContext);

  useEffect(() => {
    setAccess(localStorage.getItem("access"));
    setRefresh(localStorage.getItem("refresh"));

    setInterval(() => {
      setHiddenName(false);
    }, 10000);
  }, []);

  useEffect(() => {
    if (refresh && access) {
      const urlAccountMe = `${config.BASE_URL}/account/me/`;
      if (access)
        fetch(urlAccountMe, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }).then((data) => {
          const fetchData = async () => {
            const res = await data.json();
            console.log(res);

            if (res.detail) {
              const urlRefresh = `${config.BASE_URL}/auth/refresh/`;

              fetch(urlRefresh, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh }),
              })
                .then((data) => {
                  const getRefresh = async () => {
                    const tokens = await data.json();
                    setRefresh(tokens.refresh);
                    setAccess(tokens.access);
                    localStorage.setItem("refresh", tokens.refresh);
                    localStorage.setItem("access", tokens.access);
                  };
                  getRefresh();
                })
                .catch((err) => console.log(err));
            } else {
              if (res.first_name && res.last_name) {
                setUsername(res.first_name + " " + res.last_name);
                setHiddenName(true);
              }
            }
          };
          fetchData();
        });
    }
  }, [refresh, access]);

  return (
    <header className="relative flex gap-2 items-center w-full px-2 py-3 dark:bg-gray-800 bg-gray-200 dark:text-gray-400 ">
      <button
        onClick={() => setHidden((pre) => !pre)}
        className="dark:hover:bg-gray-600 text-gray-600 hover:text-gray-700 hover:bg-gray-300 rounded-full transition-all dark:hover:text-gray-400"
      >
        <svg
          className="w-6 h-6 m-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="flex p-2 flex-1 relative items-center dark:bg-gray-700 bg-gray-100 dark:text-white rounded-md ">
        <input
          type="text"
          className="text-[12px] outline-none flex-1 pl-8"
          placeholder="چیزی بنویسید..."
        />
        <span className="dark:text-white text-gray-500 absolute left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 m-2" // Tailwind classes to control size
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="10" cy="10" r="7" strokeWidth="2" />
            <line x1="16" y1="16" x2="21" y2="21" strokeWidth="2" />
          </svg>
        </span>
      </div>
      <Drawer open={hidden} setOpen={setHidden} username={username} />

      {username && hiddenName ? (
        <div className="absolute pr-4 flex gap-2 items-center justify-center top-1 right-1 p-3 bg-green-400 text-white rounded-4xl">
          <button
            onClick={() => setHiddenName(false)}
            className="hover:text-red-400 transition-[200] p-2 cursor-pointer"
          >
            ×
          </button>
          <h1>{username} خوش آمدی!!</h1>
        </div>
      ) : null}
    </header>
  );
}
