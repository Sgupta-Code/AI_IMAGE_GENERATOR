import React, { createContext, useReducer, useEffect } from "react";
import api from "../utils/api";
import axios from "axios";

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "AUTH_ERROR":
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(()=> {
    if(state.token){
      axios.defaults.headers.common['x-auth-token']=state.token;
    }else{
      delete axios.defaults.headers.common['x-auth-token'];
    }
    if(state.token){
      loadUser();
    }
  },[state.token]);

  // Load user
  const loadUser = async () => {
    try {
      const res = await api.get('/auth/me');
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response?.data?.msg || 'Authentication error',
      });
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      setTimeout(loadUser,100);
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.msg || 'Registration failed',
      });
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      setTimeout(loadUser,100);
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.msg || 'Login failed',
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Load user on initial render if token exists
  useEffect(() => {
    if (state.token) {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearError,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};