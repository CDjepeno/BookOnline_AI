// "use client";
// import { TableList } from "@/components/TableList";
// import { getPendingBooks } from "@/services/book.services";
// import { UpdateBookInput } from "@/types/book/input.types";
// import { GetPendingBookPaginationResponse } from "@/types/book/response.types";
// import { BookQueriesKeysEnum } from "@/types/enum/enum";
// import { formatDate } from "@/utils/formatDate";
// import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
// import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton,
//   Pagination,
//   Stack,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import ModerationHook from "./moderation.hook";

// export default function ModerationDetail({
//   booksPendingPagination,
//   initalPage,
//   totalPages,
// }: {
//   booksPendingPagination: GetPendingBookPaginationResponse;
//   initalPage: number;
//   totalPages: number;
// }) {
//   const [currentPage, setCurrentPage] = useState(initalPage);
//   const [openBookId, setOpenBookId] = useState<number | null>(null);
//   const [openBookTitle, setOpenBookTitle] = useState("");
//   const [selectedBookIds, setSelectedBookIds] = useState<number[]>([]);
//   const [isBulkDelete, setIsBulkDelete] = useState(false);

//   const params = useParams();
//   const id = params.id as string;

//   const { approuveBookMutation, disaprouveBookMutation } = ModerationHook();

//   const { data: bookPendingPaginate } = useQuery({
//     queryKey: [BookQueriesKeysEnum.BooksUser, currentPage],
//     queryFn: () => getPendingBooks(currentPage, totalPages),
//     enabled: !!currentPage,
//   });

//   const books = bookPendingPaginate?.books?.length
//     ? bookPendingPaginate.books
//     : booksPendingPagination.books;


//   const handleDialogClose = () => {
//     setOpenBookId(null); // Ferme la boîte de dialogue
//   };

//   const handleDialogOpen = (bookId: number, title: string) => {
//     setOpenBookTitle(title);
//     setOpenBookId(bookId); // Ouvre la boîte de dialogue pour le livre sélectionné
//   };

//   const disaprouveBook = async (id: number) => {
//     try {
//       await disaprouveBookMutation(id);
//       handleDialogClose();
//     } catch (error) {
//       console.error("Error deleting book:", error);
//     }
//   };

//   const approuveBook = (book: UpdateBookInput) => {
//     setBook(book);
//     setIsFormUpdateBookOpen(true);
//   };

//   const handlePageChange = (
//     _event: React.ChangeEvent<unknown>,
//     page: number
//   ) => {
//     setCurrentPage(page);
//   };

//   // Suppresion multiple
//   // Gestion de la sélection/déselection
//   const toggleSelectBook = (id: number) => {
//     setSelectedBookIds((prev) =>
//       prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
//     );
//   };

//   // Suppression en masse
//   const deleteSelectedBooks = async () => {
//     if (selectedBookIds.length === 0) return;

//     await deleteBooksMutation(selectedBookIds);
//     setSelectedBookIds([]); // Réinitialise la sélection
//   };

//   const handleBulkDeleteDialogOpen = () => {
//     setIsBulkDelete(true);
//     setOpenBookId(null); // Pas d'ID spécifique pour une suppression multiple
//   };

//   const handleBulkDeleteDialogClose = () => {
//     setIsBulkDelete(false);
//     setOpenBookId(null);
//   };

//   const deleteBooksConfirmation = async () => {
//     try {
//       if (isBulkDelete) {
//         // Suppression en masse
//         await deleteSelectedBooks();
//       } else if (openBookId !== null) {
//         // Suppression individuelle
//         await DeleteBook(openBookId);
//       }
//       handleBulkDeleteDialogClose();
//     } catch (error) {
//       console.error("Error during deletion:", error);
//     }
//   };

//   const toggleSelectAllBooks = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       // Sélectionne tous les livres disponibles
//       const allSelectableBookIds =
//         books
//           ?.filter((book) => !book.hasFuturReservations)
//           .map((book) => book.id) || [];
//       setSelectedBookIds(allSelectableBookIds);
//     } else {
//       // Désélectionne tous les livres
//       setSelectedBookIds([]);
//     }
//   };

//   const isAllSelected =
//     books &&
//     books.length > 0 &&
//     selectedBookIds.length ===
//       books!.filter((book) => !book.hasFuturReservations).length;

//   const isIndeterminate = selectedBookIds.length > 0 && !isAllSelected;

//   const headCells = [
//     <Checkbox
//       key={id}
//       indeterminate={isIndeterminate}
//       checked={isAllSelected}
//       onChange={toggleSelectAllBooks}
//     />,
//     "Titre",
//     "Auteur",
//     "Description",
//     "Date de parution",
//     "Couverture",
//     "Actions",
//   ];

//   const rows =
//     books?.map((book) => ({
//       cells: [
//         <Checkbox
//           key={book.id}
//           checked={selectedBookIds.includes(book.id)}
//           onChange={() => toggleSelectBook(book.id)}
//           disabled={book.hasFuturReservations} // Désactiver si la suppression est impossible
//         />,
//         book.title,
//         book.author,
//         book.description,
//         formatDate(book.releaseAt),
//         <Image
//           src={book.coverUrl}
//           alt="couverture du book"
//           style={{ width: "50px", height: "30px", objectFit: "cover" }}
//           key={book.id}
//           width={300}
//           height={300}
//         />,
//         <Stack direction="row" justifyContent="start" key={book.id}>
//           <IconButton aria-label="edit" onClick={() => editBook(book)}>
//             <EditTwoToneIcon />
//           </IconButton>
//           <Tooltip
//             title={
//               book.hasFuturReservations
//                 ? "Suppression désactivée pour ce livre"
//                 : "Supprimer ce livre"
//             }
//             arrow
//             disableInteractive
//           >
//             <span>
//               <IconButton
//                 onClick={() => handleDialogOpen(book.id, book.title)}
//                 aria-label="delete"
//                 disabled={book.hasFuturReservations}
//               >
//                 <DeleteTwoToneIcon />
//               </IconButton>
//             </span>
//           </Tooltip>
//           <Dialog
//             open={isBulkDelete || openBookId !== null}
//             onClose={handleBulkDeleteDialogClose}
//             aria-labelledby="delete-dialog-title"
//             aria-describedby="delete-dialog-description"
//           >
//             <DialogTitle id="delete-dialog-title">
//               Confirmer la suppression
//             </DialogTitle>
//             <DialogContent>
//               <DialogContentText id="delete-dialog-description">
//                 {isBulkDelete
//                   ? `Êtes-vous sûr de vouloir supprimer les ${selectedBookIds.length} livres sélectionnés ? Cette action est irréversible.`
//                   : `Êtes-vous sûr de vouloir supprimer ${openBookTitle} ? Cette action est irréversible.`}
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleBulkDeleteDialogClose} color="primary">
//                 Annuler
//               </Button>
//               <Button onClick={deleteBooksConfirmation} color="error" autoFocus>
//                 Supprimer
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Stack>,
//       ],
//     })) || [];

//   if (!books || books.length === 0) {
//     return (
//       <Container>
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           minHeight="100vh"
//         >
//           <Typography variant="h6">No books pending found</Typography>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ py: 8 }} maxWidth="lg">
//       <Typography
//         component="h1"
//         variant="h5"
//         mb="30px"
//         sx={{ color: "primary.main" }}
//       >
//         Livres de attente de validation
//       </Typography>
//       <div>
//         <Button
//           onClick={handleBulkDeleteDialogOpen}
//           color="error"
//           variant="contained"
//           disabled={selectedBookIds.length === 0} // Désactiver si aucune sélection
//         >
//           Supprimer les livres sélectionnés
//         </Button>
//       </div>
//       <TableList headCells={headCells} rows={rows} />
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           mt: 1,
//           backgroundColor: "background.default",
//           padding: 1,
//           borderRadius: "8px",
//         }}
//       >
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>
//     </Container>
//   );
// }
