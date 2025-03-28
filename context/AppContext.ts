import React from "react";

export type contextT = {
  refresh: string;
  setRefresh: React.Dispatch<React.SetStateAction<string>>;
  access: string;
  setAccess: React.Dispatch<React.SetStateAction<string>>;
};
export const AppContext = React.createContext<contextT>({
  refresh: "",
  setRefresh: () => {},
  access: "",
  setAccess: () => {},
});
