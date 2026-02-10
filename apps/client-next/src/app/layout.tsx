"use client";

import Footer from "@/components/Footer";
import Header from "@/components/header";
import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/global.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID =
  "319016182013-an3s7kv9t0dui3lvu3jcn5o941libgjc.apps.googleusercontent.com";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
          <SnackbarProvider maxSnack={5}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <header>
                  <Header />
                </header>
                {children}
                <footer>
                  <Footer />
                </footer>
              </AuthProvider>
            </QueryClientProvider>
          </SnackbarProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
