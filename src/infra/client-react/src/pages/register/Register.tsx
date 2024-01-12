import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserI } from "../../interfaces";

export default function SignIn() {
  const { register, handleSubmit, setError } = useForm();

  async function onSubmit(data: Partial<UserI>) {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/users",
        data
      );
      console.log("Response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with:", axiosError.response.status);
          console.error("Response data:", axiosError.response.data);
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error("No response received");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", axiosError.message);
        }
      } else {
        // Non-Axios error
        console.error("Non-Axios error:", error);
      }
       // Exemple : Définissez une erreur pour le champ 'username'
       setError('phone', {
        type: 'string',
        message: 'Numero invalide',
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                autoFocus
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone"
                {...register("phone")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
