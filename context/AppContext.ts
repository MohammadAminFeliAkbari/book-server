import React from "react";

export type contextT = {
  access: string;
  setAccess: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = React.createContext<contextT>({
  access: "",
  setAccess: () => {},
});
