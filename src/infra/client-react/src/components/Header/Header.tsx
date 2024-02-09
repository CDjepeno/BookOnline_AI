import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context";
import { AuthContextValue } from "../../types/auth.context.value";

function Header() {
  const { user, signout } = useContext(AuthContext) as AuthContextValue;

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <NavLink to="/">
            <Button sx={{ color: "#fff" }}>OnlineBook</Button>
          </NavLink>
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavLink to="/register">
            <Button sx={{ color: "#fff" }}>inscription</Button>
          </NavLink>

          {user ? (
            <Button onClick={signout} sx={{ color: "#fff" }}>
              Deconnexion
            </Button>
          ) : (
            <NavLink to="/login">
              <Button sx={{ color: "#fff" }}>connexion</Button>
            </NavLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
