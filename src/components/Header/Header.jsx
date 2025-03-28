"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import config from "../../config";

export default function Header() {
  const [hidden, setHidden] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [username, setUsername] = useState("");

  const { refresh, access } = useContext(AppContext);
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setHeaderVisible(true);
    } else {
      setHeaderVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("refresh now!!!");

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
          if (res.first_name && res.last_name)
            setUsername(res.first_name + " " + res.last_name);
        };
        fetchData();
      });
  }, [refresh, access]);

  return (
    <>
      <header className="dark:bg-gray-800 dark:text-gray-400 p-2">
        <nav className="border-gray-200 py-1 bg-gray-100 bg-opacity-5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center ">
            <div className="flex items-center lg:order-2">
              {username ? (
                <h1>{username}</h1>
              ) : (
                <>
                  <Link
                    href={"/login"}
                    onClick={() => setHidden(true)}
                    className="border dark:border-gray-500 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-400 transition-all hover:text-black focus:outline-none dark:focus:ring-gray-800"
                  >
                    ورود
                  </Link>
                  <Link
                    href={"/signup"}
                    onClick={() => setHidden(true)}
                    className="bg-blue-700 text-white bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    ثبت نام
                  </Link>{" "}
                </>
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex left-4 absolute items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden dark:hover:bg-gray-700 hover:bg-gray-200 dark:outline-none dark:hover:text-gray-500 mr-2 transition-all focus:outline-none focus:ring-1 focus:ring-gray-600 dark:text-gray-400"
                aria-controls="mobile-menu-2"
                aria-expanded={!hidden}
                onClick={() => setHidden((prev) => !prev)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
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
            </div>
            <div
              className={`${
                hidden ? "hidden" : ""
              } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 gap-3">
                <li>
                  <button className="p-2 block py-2 pr-4 pl-3 w-full border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:dark:hover:bg-transparent dark:border-gray-700">
                    <Link
                      href={"/"}
                      onClick={() => setHidden(true)}
                      className="p-2 flex justify-center items-center"
                    >
                      خانه
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <h1
        className={`sticky ${
          headerVisible ? "" : "hidden"
        } top-0 bg-gray-100 dark:bg-gray-800 z-10 p-3 text-center border-t border-gray-400`}
      >
        تخفیف ویژه
      </h1>
    </>
  );
}
