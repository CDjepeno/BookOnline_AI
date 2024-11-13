import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { formatDate } from "../../../utils/formatDate";
import { GetBookingsBookResponse } from "../../../types/booking/booking.types";
import { useState } from "react";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import dayjs, { Dayjs } from "dayjs";

interface BookCardDetailProps {
  name: string;
  author: string;
  description: string;
  releaseAt: Date | string;
  coverUrl: string;
  bookingsBookData: GetBookingsBookResponse[]
}

export default function BookCardDetail({
  name,
  author,
  description,
  releaseAt,
  coverUrl,
  bookingsBookData
}: BookCardDetailProps) {

  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

  // Convertir les dates existantes en objets Dayjs
  const bookings = bookingsBookData.map((reservation) => ({
    startAt: dayjs(reservation.startAt),
    endAt: dayjs(reservation.endAt),
  }));

  const shouldDisableDate = (date: Dayjs) => {
    return bookings.some((booking) => {
      return date.isAfter(booking.startAt, 'day') && date.isBefore(booking.endAt, 'day');
    });
  };

  const releaseDate =
    typeof releaseAt === "string" ? new Date(releaseAt) : releaseAt;

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? description.substring(0, limit) + "..."
      : description;
  };
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia component="img" height="400" image={coverUrl} alt={name} />
        <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Aligne le contenu sur une ligne
            justifyContent: "space-between", // Espace entre les éléments
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date de parution : {formatDate(releaseDate)}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {truncateDescription(description, 100)}
            </Typography>
          </Box>

          <Box sx={{ width: "50%"  }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangeCalendar']}>
                  <DateRangeCalendar 
                    value={dateRange}
                    onChange={(newValue) => setDateRange(newValue)}
                    shouldDisableDate={shouldDisableDate}
                  />
                </DemoContainer>
              </LocalizationProvider>
          </Box>
      </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
