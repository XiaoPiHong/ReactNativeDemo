import React, {useRef} from "react";
import ListDrawer, {
  IListDrawerActionType,
} from "@/components/RootComps/ListDrawer";

// Types
export interface IRootCompsContext {
  listDrawerRef: React.RefObject<IListDrawerActionType> | null;
}

interface IRootCompsProvider {
  children: React.ReactNode;
}

// Context
const RootCompsContext = React.createContext<IRootCompsContext>({
  listDrawerRef: null,
});

// Provider to be used in index/App/or top of any parent
const RootCompsProvider = ({children}: IRootCompsProvider): JSX.Element => {
  const listDrawerRef = useRef<IListDrawerActionType>(null);
  return (
    <RootCompsContext.Provider
      value={{
        listDrawerRef,
      }}>
      <ListDrawer ref={listDrawerRef}>{children}</ListDrawer>
    </RootCompsContext.Provider>
  );
};

export const useRootComps = () => {
  const state = React.useContext(RootCompsContext);
  const {listDrawerRef} = state;

  return {
    listDrawerRef,
  };
};

export default RootCompsProvider;
