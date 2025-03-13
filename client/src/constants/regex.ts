export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const PHONE_REGEX = /^[0-9]{10,15}$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
export const ONLY_ALPHABET_REGEX = /^[a-zA-Z\s]+$/;
export const GITHUB_TOKEN_REGEX = [
  /^ghp_[a-zA-Z0-9]{36}$/,
  /^github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}$/,
  /^gho_[a-zA-Z0-9]{36}$/,
  /^ghu_[a-zA-Z0-9]{36}$/,
  /^ghs_[a-zA-Z0-9]{36}$/,
  /^ghr_[a-zA-Z0-9]{36}$/,
];
