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

  const { refresh, access, setAccess, setRefresh } = useContext(AppContext);

  useEffect(() => {
    setAccess(localStorage.getItem("access"));
    setRefresh(localStorage.getItem("refresh"));
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
              if (res.first_name && res.last_name)
                setUsername(res.first_name + " " + res.last_name);
            }
          };
          fetchData();
        });
    }
  }, [refresh, access]);

  return (
    <header className="flex gap-2 items-center w-full px-2 py-3 dark:bg-gray-800 dark:text-gray-400 ">
      <button
        onClick={() => setHidden((pre) => !pre)}
        className="hover:bg-gray-600 rounded-full transition-all hover:text-gray-400"
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

      <div className="flex p-2 flex-1 relative items-center bg-gray-700 text-white rounded-md ">
        <input
          type="text"
          className="text-[12px] outline-none flex-1 pl-8"
          placeholder="چیزی بنویسید..."
        />
        <span className="text-white absolute left-0">
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
      <Drawer open={hidden} setOpen={setHidden} />
    </header>
  );
}
