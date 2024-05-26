import { DevTool } from "@hookform/devtools";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import "moment/locale/fr";
import { Controller } from "react-hook-form";
import FormInput from "../../components/FormInput";
import AddBookHook from "./Add-book.hook";
moment.locale("fr");

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
            <Grid item xs={12}>
              <Controller
                name="releaseAt"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale='fr'
                  >
                    <DatePicker
                      label="Data de parution"
                      value={value ? moment(value) : null}
                      onChange={(date: Moment | null) =>
                        onChange(date ? date.toDate() : null)
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="imageUrl"
                label="Image Couverture"
                control={control}
                errors={errors}
              />
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
