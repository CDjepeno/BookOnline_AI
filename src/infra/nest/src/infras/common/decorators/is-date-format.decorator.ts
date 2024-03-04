import { ValidationOptions, registerDecorator } from 'class-validator';
import moment from 'moment';

function isValidDateFormat(value: Date): boolean {
  // Utilisation de 'moment' pour vérifier le format et la validité de la date
  const dateFormat = 'YYYY-MM-DD';
  const momentDate = moment(value, dateFormat, true);

  // Vérification du format et si la date est postérieure à la date actuelle
  return momentDate.isValid() && momentDate.isAfter(moment());
}

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Appel de la fonction de validation personnalisée
          return isValidDateFormat(value);
        },
      },
    });
  };
}
