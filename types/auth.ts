export type AuthMode = "login" | "register";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface FormFieldError {
  message: string;
}

export interface LoginErrors {
  email?: FormFieldError;
  password?: FormFieldError;
}

export interface RegisterErrors {
  fullName?: FormFieldError;
  email?: FormFieldError;
  password?: FormFieldError;
  confirmPassword?: FormFieldError;
  agreeToTerms?: FormFieldError;
}
