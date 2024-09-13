/**
 * @jest-environment jsdom
 */

import React from 'react';
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { render } from "@testing-library/react";
import Header from '../src/components/Header';
 
it('renders Header unchanged', () => {
  const { container } = render(
    <SessionProvider session={null}>
      <Header />
    </SessionProvider>
  )
  expect(container).toMatchSnapshot()
})