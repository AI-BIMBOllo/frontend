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
  token: string | null;
  setToken: (token: string | null) => void;
}

export const DataContext = createContext<DataContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {}
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSetToken = (token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <DataContext.Provider value={{ user, setUser, token, setToken: handleSetToken }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
