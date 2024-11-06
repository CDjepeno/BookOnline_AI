import { InjectRepository } from "@nestjs/typeorm";
import { BookingBookRequest } from "src/application/usecases/booking/bookingBook/bookingBook.request";
import { BookingBookResponse } from "src/application/usecases/booking/bookingBook/bookingBook.response";
import { BookingEntity } from "src/domaine/entities/Booking.entity";
import { BookingRepository } from "src/domaine/repositories/booking.repository";
import { Repository } from "typeorm";
import { Booking } from "../models/booking.model";
import { InternalServerErrorException } from "@nestjs/common";


export class BookingRepositoryTypeorm implements BookingRepository { 
  constructor(
    @InjectRepository(Booking)
    private readonly repository: Repository<Booking>,
  ) {}

  async Order(bookReserved: BookingBookRequest): Promise<BookingBookResponse> { 
    try {                                                                                                                                                                

      const newBooking = new Booking();
      newBooking.createdAt = bookReserved.createdAt;
      newBooking.startAt = bookReserved.endAt;
      newBooking.endAt = bookReserved.endAt;                                        
      newBooking.userId = bookReserved.userId;
      newBooking.bookId = bookReserved.bookId;

      const result = await this.repository.save(newBooking);

      return result
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
      throw new InternalServerErrorException("Impossible de reserver le livre.");
    }
  }
    
  
}