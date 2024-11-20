import React from "react";
import RootCompsContainer from "@/components/RootCompsContainer";

// Types
export interface IRootCompsContext {}

interface IRootCompsProvider {
  children: React.ReactNode;
}

// Context
const RootCompsContext = React.createContext<IRootCompsContext>({});

// Provider to be used in index/App/or top of any parent
const RootCompsProvider = ({children}: IRootCompsProvider): JSX.Element => {
  return (
    <RootCompsContext.Provider value={{}}>
      {children}
      <RootCompsContainer />
    </RootCompsContext.Provider>
  );
};

export const useRootComps = () => {
  const state = React.useContext(RootCompsContext);

  return {};
};

export default RootCompsProvider;
