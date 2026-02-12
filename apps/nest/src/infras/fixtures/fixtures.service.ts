import { faker, simpleFaker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sexe } from '../enums/enums';
import { Book } from '../models/book.model';
import { Booking } from '../models/booking.model';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';

@Injectable()
export class FixtureService {
  private readonly logger = new Logger(FixtureService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async loadFixtures() {
    this.logger.log('🌱 Chargement des fixtures...');

    try {
      const userCount = await this.userRepository.count();
      if (userCount > 0) {
        this.logger.log('✅ Les fixtures sont déjà chargées');
        return;
      }
      // Créer les utilisateurs
      const users = await this.createUsers();
      this.logger.log(`✅ ${users.length} utilisateurs créés`);

      // Créer les contacts
      const contacts = await this.createContacts();
      this.logger.log(`✅ ${contacts.length} contacts créés`);

      // Créer les livres (books)
      const books = await this.createBooks(users);
      this.logger.log(`✅ ${books.length} livres créés`);

      // Créer les réservations (bookings)
      const bookings = await this.createBookings(users, books);
      this.logger.log(`✅ ${bookings.length} réservations créées`);

      this.logger.log('🎉 Fixtures chargées avec succès !');
    } catch (error) {
      this.logger.error('❌ Erreur lors du chargement des fixtures', error);
      throw error;
    }
  }

  private async createUsers(): Promise<User[]> {
    const users: User[] = [];
    const usersData = [
      {
        email: 'admin@example.com',
        password: 'Admin123!',
        name: 'Admin User',
        phone: '+33 6 12 34 56 78',
        sexe: Sexe.HOMME,
        role: 'admin', // 👈 rôle admin
      },
    ];

    // Générer 300 utilisateurs supplémentaires
    for (let i = 1; i <= 300; i++) {
      usersData.push({
        email: faker.internet.email({ firstName: `email${i}`}),
        password: 'User123!',
        name: faker.person.fullName({
          sex: Sexe.HOMME ? 'male' : 'female',
        }),
        phone: simpleFaker.string.uuid(),
        sexe: Math.random() > 0.5 ? Sexe.HOMME : Sexe.FEMME,
        role: 'user',
      });
    }

    for (const userData of usersData) {
      const existing = await this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (!existing) {
        users.push(this.userRepository.create(userData));
      }
    }

    return await this.userRepository.save(users);
  }

  private async createBooks(users: User[]): Promise<Book[]> {
    const booksData = [];

    for (let i = 0; i < 5000; i++) {
      const user = users[i % users.length];
      booksData.push({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        description: faker.lorem.sentences(2),
        releaseAt: faker.date.between({
          from: '1995-01-01',
          to: new Date(),
        }),
        coverUrl: `https://picsum.photos/seed/book${i}/200/300`,
        userId: user.id,
        user,
      });
    }

    const books = this.bookRepository.create(booksData);
    return await this.bookRepository.save(books);
  }

  private async createBookings(
    users: User[],
    books: Book[],
  ): Promise<Booking[]> {
    const now = new Date();
    const bookingsData = [];

    for (let i = 0; i < 10000; i++) {
      const user = users[i % users.length];
      const book = books[i % books.length];

      const startDayOffset = Math.floor(Math.random() * 365) - 180; // ±6 mois
      const endDayOffset = startDayOffset + Math.floor(Math.random() * 30) + 1;

      bookingsData.push({
        startAt: new Date(now.getTime() + startDayOffset * 24 * 60 * 60 * 1000),
        endAt: new Date(now.getTime() + endDayOffset * 24 * 60 * 60 * 1000),
        userId: user.id,
        bookId: book.id,
        hasFuturReservation: Math.random() > 0.5,
        user,
        book,
      });
    }

    const bookings = this.bookingRepository.create(bookingsData);
    return await this.bookingRepository.save(bookings);
  }

  private async createContacts(): Promise<Contact[]> {
    const contactsData = [
      {
        name: 'Support Technique',
        email: 'support@example.com',
        message: 'Demande de support technique pour un problème de connexion',
      },
      {
        name: 'Service Commercial',
        email: 'commercial@example.com',
        message:
          'Question concernant les tarifs et les abonnements disponibles',
      },
      {
        name: 'Marie Dupont',
        email: 'marie.dupont@example.com',
        message:
          'Informations sur les nouvelles fonctionnalités de la plateforme',
      },
    ];

    const contacts = this.contactRepository.create(contactsData);
    return await this.contactRepository.save(contacts);
  }
}
