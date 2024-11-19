import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface DataContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const DataContext = createContext<DataContextType>({
  user: null,
  setUser: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    console.log("Token:", token);
    console.log("Saved user:", savedUser);
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);
  

  // Modify setUser to also save to localStorage
  const handleSetUser = (userData: User | null) => {
    console.log("Setting user data:", userData); // Agrega esto para depurar
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };
  

  return (
    <DataContext.Provider value={{ user, setUser: handleSetUser }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
