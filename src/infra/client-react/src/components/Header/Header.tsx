import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

function Header() {
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
          <Button sx={{ color: "#fff" }}>connexion</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
