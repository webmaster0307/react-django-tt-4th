import React from 'react';
import Users from './components/users';
import User from './components/users/user';
import UserDetail from './components/users/user-detail';
import Login from './components/auth/login';
import Profile from './components/auth/profile';
import PasswordChange from './components/auth/password-change';
import Categories from './components/categories';

export const commonRoutes = [
  {
    path: '/users',
    exact: true,
    component: Users,
  },
  {
    path: '/',
    exact: true,
    component: Users,
  },
];

export const noAuthRoutes = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/users/:id',
    exact: true,
    component: UserDetail,
  },
  {
    path: '/users/:id',
    exact: true,
    component: UserDetail,
  },
  {
    path: '/signup',
    exact: true,
    component: () => <Profile isSignup={true} />
  },
]

export const authRoutes = [
  {
    path: '/profile',
    exact: true,
    component: Profile,
  },
  {
    path: '/users/:id',
    exact: true,
    component: UserDetail,
  },
  {
    path: '/password-change',
    exact: true,
    component: PasswordChange,
  }
];

export const adminRoutes = [
  {
    path: '/categories',
    exact: true,
    component: Categories,
  },
  {
    path: '/users/:id',
    exact: true,
    component: User,
  },
];
