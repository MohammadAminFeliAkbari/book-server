import React, { useState } from "react";

import {
  Drawer as MUIDrawer,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const MyDrawer = ({ open, setOpen }) => {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="dark:bg-gray-500 h-full p-4"
    >
      <list>
        <div className="h-full flex flex-col">
          <h1 className="text-center p-3 text-gray-200">کتاب بان</h1>
          <div className="border-b-1 text-gray-400 w-full"></div>
          <button className="flex cursor-pointer py-2 dark:text-gray-300 gap-1 items-center justify-center text-[15px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 pb-1"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            ورودیاعضویت
          </button>
        </div>
      </list>
    </div>
  );

  return (
    <div>
      <MUIDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ width: 250 }} // Set your desired width here
        variant="temporary" // or "permanent" based on your need
      >
        {list()}
      </MUIDrawer>
    </div>
  );
};

export default MyDrawer;
