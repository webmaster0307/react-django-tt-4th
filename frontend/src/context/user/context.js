import { createContext } from 'react';

export const initialState = {
    users: [],
    currentUser: {},
    user: {},
    loginLoading: false,
    params: {
      page: 0,
      category: null,
      role: null,
      subCategory: null,
      search: "",
    },
    loading: true,
    count: 0,
    updatedAt: null,
  };

const context = createContext();

export default context;
