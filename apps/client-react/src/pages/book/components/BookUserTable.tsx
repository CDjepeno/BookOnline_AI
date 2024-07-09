import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { IconButton, TableCell, TableRow } from "@mui/material";

interface BookUserTableProps {
  id: string;
  name: string;
  author: string;
  description: string;
  releaseAt: Date | string;
  coverUrl: string;
  onDelete: (id: string) => void;
}

export function BookUserTable({
  id,
  name,
  author,
  description,
  releaseAt,
  coverUrl,
  onDelete,
}: BookUserTableProps) {
  const releaseDate =
    typeof releaseAt === "string" ? new Date(releaseAt) : releaseAt;
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0, m: "10px" } }}
    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{author}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{releaseDate.toLocaleDateString()}</TableCell>
      <TableCell align="right">
        <img
          src={coverUrl}
          alt="couverture du book"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="edit">
          <EditTwoToneIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(id)} aria-label="delete">
          <DeleteTwoToneIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
