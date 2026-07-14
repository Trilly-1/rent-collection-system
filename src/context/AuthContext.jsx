import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "rentflow_users";
const SESSION_KEY = "rentflow_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const register = async (role, data) => {
    const users = getUsers();

    const exists = users.find(
      (u) =>
        u.email === data.email ||
        (data.phone && u.phone === data.phone)
    );

    if (exists) {
      throw new Error("Account already exists.");
    }

    const newUser = {
      id: Date.now().toString(),
      role,
      name: data.name,
      email: data.email || "",
      phone: data.phone || "",
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);

    return newUser;
  };

  const login = async (role, identifier, password) => {
    const users = getUsers();

    const found = users.find(
      (u) =>
        u.role === role &&
        (u.email === identifier || u.phone === identifier) &&
        u.password === password
    );

    if (!found) {
      throw new Error("Incorrect email/phone or password.");
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    setUser(found);

    return found;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const forgotPassword = async () => {
    return true;
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    // Also update in users list
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = updatedUser;
      saveUsers(users);
    }
    
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session: user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
