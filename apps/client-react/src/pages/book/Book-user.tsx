import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BookUSerHook from "./Book-user.hook";
import { BookUserTable } from "./components/BookUserTable";

export default function BookUser() {
  const { books, isPending, error } = BookUSerHook();

  if (isPending) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="error">
            Error loading books user
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!books) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6">No books user found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
    <TableContainer component={Paper}>
      <Grid item xs={12} sm={6} md={4}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Auteur</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Date de parution</TableCell>
            <TableCell align="right">Couverture</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <BookUserTable
              key={book.id}
              id={book.id}
              name={book.name}
              author={book.author}
              description={book.description}
              releaseAt={book.releaseAt}
              coverUrl={book.coverUrl}
            />
          ))}
        </TableBody>
      </Table>
      </Grid>
    </TableContainer>
    </Container>
  );
}
