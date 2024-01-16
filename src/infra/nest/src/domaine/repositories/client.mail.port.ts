export interface IAdress {
  name: string;
  email: string;
}

export interface Imessage {
  to: IAdress;
  from: IAdress;
  subject?: string;
  body: string;
}

export interface ClientMailPort {
  sendMail(message: Imessage): void;
}
