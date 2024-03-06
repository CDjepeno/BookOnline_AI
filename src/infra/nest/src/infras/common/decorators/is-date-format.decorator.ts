import { ValidationOptions, registerDecorator } from 'class-validator';
import moment from 'moment';

function isValidDateFormat(value: Date): boolean {
  if (!(value instanceof Date)) {
    return false; // Garantit que la valeur est bien une instance de Date
  }

  const dateFormat = 'YYYY-MM-DD';
  const momentDate = moment(value, dateFormat, true);

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
        validate(value: Date) {
          return isValidDateFormat(value);
        },
      },
    });
  };
}
