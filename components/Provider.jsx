'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;

// Centralizes session management: All logic related to session management is encapsulated here.
// Encapsulates provider setup: If you need to add more providers or modify session logic, you can do it in one place

// Jaise yahan pe session provider is used soo that the info of session can be stored amongst all the children what is Provider.jsx