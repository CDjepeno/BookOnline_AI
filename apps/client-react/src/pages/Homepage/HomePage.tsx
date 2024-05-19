import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export function HomePage() {
  
  
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  return (
    <main>
      <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            OnlineBook
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" >
          Bienvenue sur OnlineBook, le numéro 1 de la bibliothèque en ligne de livres libres de droits.
            </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>

          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
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
                    // 16:9
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          
        </Grid>
      </Container>
    </main>
  );
}
