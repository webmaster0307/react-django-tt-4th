import React from 'react';
import { Container } from '@material-ui/core';

import AppHeader from './AppHeader';

export default function MainLayout({ children }) {
  return (
    <>
      <AppHeader/>
      <Container>{children}</Container>
    </>
  );
}
