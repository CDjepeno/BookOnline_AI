import { DevTool } from "@hookform/devtools";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// import { useContext } from "react";
// import { AuthContext } from "../../context";
// import { AuthContextValue } from "../../types/auth.context.value";
import AddBookHook from "./Add-book.hook";

export default function AddBook() {
  // const { user } = useContext(AuthContext) as AuthContextValue;
  const { register, submit, handleSubmit, errors, control } = AddBookHook();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Ajouter un Livre
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("name")}
                label="Name"
                fullWidth
                required
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("description")}
                label="description"
                fullWidth
                required
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("author")}
                label="Auteur"
                fullWidth
                required
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("releaseAt")}
                label="Date de parution"
                type="number"
                fullWidth
                required
                error={!!errors.releaseAt}
                helperText={errors.releaseAt?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("imageUrl")}
                label="Image Couverture"
                fullWidth
                required
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter
          </Button>
        </Box>
      </Box>

      <DevTool control={control} />
    </Container>
  );
}
