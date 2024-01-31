import { Box, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        OnlineBook
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://onlinebook.com/">
          OnlineBook
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Footer;
