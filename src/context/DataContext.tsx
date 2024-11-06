import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface DataContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const DataContext = createContext<DataContextType>({
  user: null,
  setUser: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <DataContext.Provider value={{ user, setUser }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
