export const regularExpression = {
  ExEmail:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  ExName: /^[a-zA-Z][a-zA-Z-' ]*$/,
  ExAddress: /^(?=.{5,})[^-\.,\d]*([-\.,]{0,2}[^-\.,]*){0,4}[^-\.,\d]*$/,
  ExGrade: /^[1-9][0-9]?$/i,
  ExSubject: /^[a-zA-Z0-9!?, ][a-zA-Z0-9!?, ]*$/,
  ExPhone:
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3,4})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  ExUsername: "",
};
