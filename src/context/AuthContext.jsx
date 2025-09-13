// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [notes, setNotes] = useState([]);

  const isAuthenticated = !!token;

  // keep axios default header in sync with token
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // register — call backend, optional auto-login
  const register = async (payload) => {
    // payload = { username, email, password }
    const res = await api.post("/auth/register", payload);
    // If backend returns a token on register, you can set it here:
    if (res.data.token) {
      const { token: jwt, userId, username } = res.data;
      setToken(jwt);
      setUser({ userId, username });
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify({ userId, username }));
    }
    return res.data;
  };

  // login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token: jwt, userId, username } = res.data;
    setToken(jwt);
    setUser({ userId, username });
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify({ userId, username }));
    return res.data;
  };

  // logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  // Save Notes
  const SaveNote = async (note) => {
    try {
      const res = await api.post("https://mern-note-backend-git-main-syed-mohsin-ali786s-projects.vercel.app/mern/notes", note, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error saving note:",
        error.response?.data || error.message
      );
    }
  };

  const DeleteNote = async (noteId) => {
    try {
      await api.delete(`https://mern-note-backend-git-main-syed-mohsin-ali786s-projects.vercel.app/mern/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n._id !== noteId));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Update Note
  const UpdateNote = async (noteId, updatedFields) => {
  try {
    const res = await api.put(
      `https://mern-note-backend-git-main-syed-mohsin-ali786s-projects.vercel.app/mern/notes/${noteId}`,
      updatedFields, // send new title/content
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // update state locally
    setNotes((prev) =>
      prev.map((n) => (n._id === noteId ? res.data : n))
    );

    return res.data;
  } catch (error) {
    console.log("Edit Error", error.response?.data || error.message);
  }
};


  // Fetch notes when token changes (i.e., login/logout)
  useEffect(() => {
    async function getSavedNotes() {
      try {
        const res = await api.get("https://mern-note-backend-git-main-syed-mohsin-ali786s-projects.vercel.app/mern/notes"); // api already has token header
        setNotes(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }

    if (token) {
      getSavedNotes();
    } else {
      setNotes([]); // clear notes on logout
    }
  }, [token]);

  // optional: global response interceptor to auto-logout on 401
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        SaveNote,
        notes,
        DeleteNote,
        UpdateNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
