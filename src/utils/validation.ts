export type ValidationErrors = Record<string, string>;

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return 'Enter a valid email';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
}

export function validateLoginForm(
  email: string,
  password: string,
): ValidationErrors {
  const errors: ValidationErrors = {};
  const emailErr = validateEmail(email);
  const passErr = validatePassword(password);
  if (emailErr) {
    errors.email = emailErr;
  }
  if (passErr) {
    errors.password = passErr;
  }
  return errors;
}

export function validateRegisterForm(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  const nameErr = validateName(data.name);
  const emailErr = validateEmail(data.email);
  const passErr = validatePassword(data.password);
  if (nameErr) {
    errors.name = nameErr;
  }
  if (emailErr) {
    errors.email = emailErr;
  }
  if (passErr) {
    errors.password = passErr;
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}
