import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <AuthProvider>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
