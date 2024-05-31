import { DevTool } from "@hookform/devtools";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { fr } from "date-fns/locale";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import FormInput from "../../components/FormInput";
import AddBookHook from "./Add-book.hook";

registerLocale("fr", fr);
export default function AddBook() {
  const { submit, handleSubmit, errors, control } = AddBookHook();

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
              <FormInput
                name="name"
                label="Name"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="description"
                label="description"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="author"
                label="Auteur"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sx={{ position: "relative", zIndex: 1300 }}>
              <Controller
                name="releaseAt"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <ReactDatePicker
                    selected={value}
                    onChange={onChange}
                    ref={ref}
                    locale="fr"
                    customInput={
                      <TextField
                        sx={{ width: "395px" }}
                        label="Date de parutiom"
                        error={!!errors.releaseAt}
                        helperText={
                          errors.releaseAt ? errors.releaseAt.message : ""
                        }
                      />
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field: { onChange } }) => (
                  <input
                    accept="image/jpeg, image/png"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => {
                      e.target.files && e.target.files[0]
                        ? onChange(e.target.files[0])
                        : "Veuillez charger la couverture du livre";
                    }}
                  />
                )}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Charger la couverture du livre
                </Button>
              </label>
              {errors.imageUrl && (
                <Typography variant="body2" color="error">
                  {errors.imageUrl.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter un livre
          </Button>
        </Box>
      </Box>

      <DevTool control={control} />
    </Container>
  );
}
