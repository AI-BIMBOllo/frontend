import { createContext, useContext, useState, useEffect } from "react";

interface User {
  identifier: string;
  username: string;
  name: string;
  first_lastname: string;
  second_lastname: string;
  email: string;
  phone: string;
  position: number;
  order_estimated_shipments: number;
  supply_estimated_shipments: number;
}

interface DataContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const DataContext = createContext<DataContextType>({
  user: null,
  setUser: () => {}
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <DataContext.Provider value={{ user, setUser }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
