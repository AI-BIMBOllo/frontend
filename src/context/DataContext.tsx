import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        // If parsing fails, clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Modify setUser to also save to localStorage
  const handleSetUser = (userData: User | null) => {
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
