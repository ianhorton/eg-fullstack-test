export function passwordValidator(password: string) {
    return (
      // Minimum length of 8 characters
      password.length > 8 &&
      // Contains at least 1 letter.
      /[a-z]/i.test(password) &&
      // Contains at least 1 number.
      /[0-9]/.test(password) &&
      // Contains at least 1 special character.
      // eslint-disable-next-line no-useless-escape
      /[\!\@\#\$\£\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/.test(password)
    );
  }