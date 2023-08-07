import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"
import { MESSAGES, REGEX } from "src/utils/utils"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty({ message: 'The email is required' })
    email: string

    @Column()
    @IsString()
    @Length(6, 24)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    password: string

    @Column()
    @IsString()
    firstName: string

    @Column()
    @IsString()
    lastName: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 