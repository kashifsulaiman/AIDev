export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const PHONE_REGEX = /^[0-9]{10,15}$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
export const ONLY_ALPHABET_REGEX = /^[a-zA-Z\s]+$/;
export const GITHUB_TOKEN_REGEX = [
  /^github_pat_\w{22}_\w{59}$/,
  /^gh[posru]_\w{36}$/
];
