import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserI } from "../../interfaces";

export default function SignIn() {
  const defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  };

  const signupSchema = yup.object({
    email: yup
      .string()
      .email("Veuillez renseigner une adresse email valide")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Veuillez renseigner une adresse email valide"
      )
      .required("Veuillez renseigner une adresse email valide"),
    password: yup
      .string()
      .required("Veuillez renseigner un mot de passe")
      .min(6, "Votre mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: yup
      .string()
      .required("Veuillez confirmer le mot de passe")
      .min(6, "Votre mot de passe doit contenir au moins 6 caractères"),
    name: yup
      .string()
      .required("Le nom doit être renseigné")
      .min(2, "Le nom doit être explicite")
      .max(10, "Le titre doit être succinct"),
    phone: yup.string().required("Veuillez renseigner un numero valide"),
  });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(signupSchema) });

  async function onSubmit(data: Partial<UserI>) {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/users",
        data
      );
      if (response.data) {
        console.log("Response:", response.data);
        reset(defaultValues);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          console.error("Server responded with:", axiosError.response.status);
          console.error("Response data:", axiosError.response.data);
        } else if (axiosError.request) {
          console.error("No response received");
        } else {
          console.error("Error setting up the request:", axiosError.message);
        }
      } else {
        console.error("Non-Axios error:", error);
      }
      setError("phone", {
        type: "string",
        message: "Numero invalide",
      });
    }
  }

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const isPasswordMatch = password === confirmPassword;

  const handleConfirmPasswordChange = () => {
    if (!isPasswordMatch) {
      setError("confirmPassword", {
        type: "manual",
        message: "Les mots de passe ne correspondent pas.",
      });
    }
  };

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

              {errors.email && (
                <small style={{ color: "red" }}>{errors.email.message}</small>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...field}
                    onBlur={handleConfirmPasswordChange}
                  />
                )}
              />
              {errors.password && (
                <small style={{ color: "red" }}>
                  {errors.password.message}
                </small>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    {...field}
                    error={!isPasswordMatch}
                    helperText={
                      !isPasswordMatch
                        ? "Les mots de passe ne correspondent pas."
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                {...register("name")}
              />
              {errors.name && (
                <small style={{ color: "red" }}>{errors.name.message}</small>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone"
                {...register("phone")}
              />
              {errors.phone && (
                <small style={{ color: "red" }}>{errors.phone.message}</small>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
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
