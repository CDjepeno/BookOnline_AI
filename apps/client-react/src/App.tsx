import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthProvider";
import Header from "./components/Header";

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <AuthProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
