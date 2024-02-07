import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

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
