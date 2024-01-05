import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            OnlineBook
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>inscription</Button>
            <Button sx={{ color: "#fff" }}>connexion</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
