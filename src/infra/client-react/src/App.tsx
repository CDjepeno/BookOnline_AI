import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { SnackbarProvider } from "notistack";

function App() {
  
  return (
    <SnackbarProvider maxSnack={5}>
      <Header />
      <Outlet />
      <Footer />
    </SnackbarProvider>
  );
}

export default App;
