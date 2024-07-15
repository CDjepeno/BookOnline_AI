import { DevTool } from "@hookform/devtools";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { fr } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import { Controller } from "react-hook-form";
import { createGlobalStyle } from "styled-components";
import FormInput from "../../../../components/FormInput";
import { UpdateBookFormType } from "../../../../types/book/book.types";
import BookUpdateHook from "./BookUpdate.hook";

registerLocale("fr", fr);

const GlobalStyle = createGlobalStyle`
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }
`;

type BookUpdateFormProps = {
  bookUpdate: UpdateBookFormType | null;
};

function BookUpdateForm({ bookUpdate }: BookUpdateFormProps) {
  console.log(bookUpdate?.coverUrl);

  const { submit, handleSubmit, errors, control } = BookUpdateHook();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <GlobalStyle />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Mettre à jour un Livre
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
                label="Nom"
                defaultValue={bookUpdate?.name}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="description"
                label="Description"
                defaultValue={bookUpdate?.description}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="author"
                label="Auteur"
                defaultValue={bookUpdate?.author}
                control={control}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="releaseAt"
                defaultValue={
                  bookUpdate?.releaseAt ? bookUpdate.releaseAt : undefined
                }
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                    ref={ref}
                    locale="fr"
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField
                        fullWidth
                        label="Date de parution"
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
              <Box
                sx={{
                  width: "100%",
                  padding: "15px",
                  border: errors.coverUrl ? "1px solid red" : "1px solid #bbb",
                  borderRadius: "5px",
                }}
              >
                <Controller
                  name="coverUrl"
                  defaultValue="ok"
                  control={control}
                  render={({ field: { onChange, ref } }) => (
                    <input
                      type="file"
                      id="file-upload"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        console.log(e.target.files);
                        onChange(e.target.files);
                      }}
                      ref={ref}
                      style={{ width: "100%" }}
                    />
                  )}
                />
                {/* <img src={bookUpdate?.coverUrl} alt="Current" style={{ width: '30px', height: '30px' }} />  */}
              </Box>
              {errors.coverUrl && (
                <Typography color="error" m="4px 15px" variant="body2">
                  {errors.coverUrl.message}
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
            Mettre à jour
          </Button>
        </Box>
      </Box>

      <DevTool control={control} />
    </Container>
  );
}

export default BookUpdateForm;
