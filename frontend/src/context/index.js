import React from 'react';
import UserProvider from './user'
import CategoryProvider from './category'
import { initialState as User } from './user/context';
import { initialState as Category } from './category/context';

export const initialState = {
  User,
  Category
};

const RootContextProvider = ({ children, initialContext = initialState }) => (
    <UserProvider initialContext={initialContext.User}>
      <CategoryProvider initialContext={initialContext.Category}>
        {children}
      </CategoryProvider>
    </UserProvider>
);

export default RootContextProvider;
