import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={5}>
        <Header />
        <Outlet />
        <Footer />
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
