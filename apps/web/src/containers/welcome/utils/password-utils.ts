export interface PasswordRequirement {
  regex: RegExp;
  message: string;
}

export const passwordRequirements: PasswordRequirement[] = [
  { regex: /.{8,}/, message: "At least 8 characters" },
  { regex: /[A-Z]/, message: "At least one uppercase letter" },
  { regex: /[a-z]/, message: "At least one lowercase letter" },
  { regex: /\d/, message: "At least one digit" },
  {
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    message: "At least one special character",
  },
];

export const validatePassword = (password: string): string | null => {
  const errors = passwordRequirements
    .filter((req) => !req.regex.test(password))
    .map((req) => req.message);

  return errors.length > 0 ? errors.join(", ") : null;
};
