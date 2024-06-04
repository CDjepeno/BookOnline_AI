import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// const queryClient = new QueryClient();
function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      {/* <QueryClientProvider client={queryClient}> */}
        <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
        </AuthProvider>
      {/* </QueryClientProvider> */}
    </SnackbarProvider>
  );
}

export default App;
