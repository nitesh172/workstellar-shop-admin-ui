import { createContext, ReactNode, useContext } from "react";

export type SidebarContextType = {
  handleClick: (url: string) => void;
  selectedNavItem?: string;
};

const SidebarContext: any = createContext<SidebarContextType>(
  {} as SidebarContextType
);
export type SidebarProviderProps = {
  handleClick: (url: string) => void;
  selectedNavItem?: string;
  children?: ReactNode;
};

export const useSidebarContext = () => {
  return useContext<SidebarContextType>(SidebarContext);
};

export const SidebarProvider = (props: SidebarProviderProps) => {
  const { children, handleClick, selectedNavItem } = props;

  const defaultContext: SidebarContextType = {
    ...props,
    handleClick,
    selectedNavItem,
  };

  return (
    <SidebarContext.Provider value={defaultContext}>
      {children}
    </SidebarContext.Provider>
  );
};
