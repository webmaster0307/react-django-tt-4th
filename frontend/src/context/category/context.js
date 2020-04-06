import { createContext } from 'react';

export const initialState = {
  categories: [],
  subCategories: [],
  categoryLoading: true,
  subCategoryLoading: true,
  loading: false,
};

const context = createContext();

export default context;
