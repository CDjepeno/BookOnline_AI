import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";

interface BookCardProps {
  name: string;
  author: string;
  description: string;
  image: string;
  releaseAt: string;
}

export default function BookCard({
  name,
  author,
  description,
  image,
  releaseAt,
}: BookCardProps) {
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
          image={image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>{author}</Typography>
          <Typography>{description}</Typography>
          <Typography>Date de parution : {formatDate(releaseAt)}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
