const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-_]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password should have 1 upper case, lowcase letter along with a number and spécial character.';

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};
