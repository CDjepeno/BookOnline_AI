"use client";
import { TableList } from "@/components/TableList";
import { getPendingBooks } from "@/services/book.services";
import { GetPendingBookPaginationResponse } from "@/types/book/response.types";
import { BookQueriesKeysEnum } from "@/types/enum/enum";
import { formatDate } from "@/utils/formatDate";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import ModerationHook from "./moderation.hook";

export default function ModerationDetail({
  booksPendingPagination,
  initalPage,
  totalPages,
}: {
  booksPendingPagination: GetPendingBookPaginationResponse;
  initalPage: number;
  totalPages: number;
}) {
  const [currentPage, setCurrentPage] = useState(initalPage);
  const [openBookId, setOpenBookId] = useState<number | null>(null);
  const [dialogAction, setDialogAction] = useState<
    "approuve" | "disaprouve" | null
  >(null);
  const [openBookTitle, setOpenBookTitle] = useState("");

  const { approuveBookMutation, disaprouveBookMutation } = ModerationHook();

  const { data: bookPendingPaginate } = useQuery({
    queryKey: [BookQueriesKeysEnum.BooksPending, currentPage],
    queryFn: () => getPendingBooks(currentPage, 6),
    enabled: !!currentPage,
  });

  const books = booksPendingPagination.books.length
    ? booksPendingPagination.books
    : bookPendingPaginate?.books;

  const handleDialogOpen = (bookId: number, title: string) => {
    setOpenBookTitle(title);
    setOpenBookId(bookId); // Ouvre la boîte de dialogue pour le livre sélectionné
  };

  const disaprouveBook = async (bookId: number) => {
    try {
      await disaprouveBookMutation(bookId);
      handleDialogClose();
    } catch (error) {
      console.error("Error disaprouve book:", error);
    }
  };

  const approuveBook = async (bookId: number) => {
    try {
      await approuveBookMutation(bookId);
      handleDialogClose();
    } catch (error) {
      console.error("Error aprouve book:", error);
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleDialogClose = () => {
    setOpenBookId(null);
  };

  const headCells = [
    "Titre",
    "Auteur",
    "Description",
    "Date de parution",
    "Couverture",
    "Actions",
  ];

  const rows =
    books?.map((book) => ({
      cells: [
        book.title,
        book.author,
        book.description,
        formatDate(book.releaseAt),
        <Image
          src={book.coverUrl}
          alt="couverture du book"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
          key={book.id}
          width={300}
          height={300}
        />,
        <Stack direction="row" justifyContent="start" key={book.id}>
          <IconButton
            aria-label="edit"
            onClick={() => {
              handleDialogOpen(book.id, book.title);
              setDialogAction("approuve");
            }}
          >
            <Tooltip title={"Approuver ce livre"} arrow disableInteractive>
              <CheckCircleOutlineTwoToneIcon color="success" />
            </Tooltip>
          </IconButton>
          <Tooltip title={"Désaprouver ce livre"} arrow disableInteractive>
            <span>
              <IconButton
                onClick={() => {
                  handleDialogOpen(book.id, book.title);
                  setDialogAction("disaprouve");
                }}
                aria-label="delete"
              >
                <CancelTwoToneIcon color="error" />
              </IconButton>
            </span>
          </Tooltip>
          <Dialog
            open={openBookId !== null}
            onClose={handleDialogClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">
              Confirmer la suppression
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                {dialogAction === "approuve"
                  ? `Êtes-vous sûr de vouloir approuver le livre ${openBookTitle} ? Cette action est irréversible.`
                  : `Êtes-vous sûr de vouloir désaprouver le livre ${openBookTitle} ? Cette action est irréversible.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Annuler
              </Button>
              <Button
                color={dialogAction === "approuve" ? "success" : "error"}
                onClick={() => {
                  if (dialogAction === "approuve" && openBookId)
                    approuveBook(openBookId);
                  if (dialogAction === "disaprouve" && openBookId)
                    disaprouveBook(openBookId);
                }}
                autoFocus
              >
                {dialogAction === "approuve" ? "Approuver" : "Désaprouver"}
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>,
      ],
    })) || [];

  if (!books || books.length === 0) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6">No books pending found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography
        component="h1"
        variant="h5"
        mb="30px"
        sx={{ color: "primary.main" }}
      >
        Livres de attente de validation
      </Typography>
      <TableList headCells={headCells} rows={rows} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
          backgroundColor: "background.default",
          padding: 1,
          borderRadius: "8px",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}
