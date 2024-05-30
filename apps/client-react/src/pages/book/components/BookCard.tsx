import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";

interface BookCardProps {
  name: string;
  author: string;
  description: string;
  image: string;
  releaseAt: Date;
}

export default function BookCard({
  name,
  author,
  description,
  image,
  releaseAt,
}: BookCardProps) {
  const releaseDate =
    typeof releaseAt === "string" ? new Date(releaseAt) : releaseAt;

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? description.substring(0, limit) + "..."
      : description;
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            pt: "56.25%",
          }}
          image={image || "default_image_url_here"}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>{author}</Typography>
          <Typography>{truncateDescription(description, 100)}</Typography>
          <Typography>Date de parution : {formatDate(releaseDate)}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
