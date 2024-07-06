import { TableCell, TableRow } from "@mui/material";

interface BookUserTableProps {
  id: string;
  name: string;
  author: string;
  description: string;
  releaseAt: Date | string;
  coverUrl: string;
}

export function BookUserTable({
  id,
  name,
  author,
  description,
  releaseAt,
  coverUrl,
}: BookUserTableProps) {
  const releaseDate =
    typeof releaseAt === "string" ? new Date(releaseAt) : releaseAt;
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{author}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{releaseDate.toLocaleDateString()}</TableCell>
      <TableCell align="right">{coverUrl}</TableCell>
    </TableRow>
  );
}
