import type {
  LoginFormData,
  RegisterFormData,
  LoginErrors,
  RegisterErrors,
} from "@/types/auth";

export function validateLoginForm(data: LoginFormData): LoginErrors {
  const errors: LoginErrors = {};

  if (!data.email) {
    errors.email = { message: "Email là bắt buộc" };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = { message: "Email không hợp lệ" };
  }

  if (!data.password) {
    errors.password = { message: "Mật khẩu là bắt buộc" };
  } else if (data.password.length < 8) {
    errors.password = { message: "Mật khẩu phải có ít nhất 8 ký tự" };
  }

  return errors;
}

export function validateRegisterForm(data: RegisterFormData): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = { message: "Họ tên là bắt buộc" };
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = { message: "Họ tên phải có ít nhất 2 ký tự" };
  }

  if (!data.email) {
    errors.email = { message: "Email là bắt buộc" };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = { message: "Email không hợp lệ" };
  }

  if (!data.password) {
    errors.password = { message: "Mật khẩu là bắt buộc" };
  } else if (data.password.length < 8) {
    errors.password = { message: "Mật khẩu phải có ít nhất 8 ký tự" };
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = {
      message: "Mật khẩu phải chứa chữ hoa, chữ thường và số",
    };
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = { message: "Xác nhận mật khẩu là bắt buộc" };
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = { message: "Mật khẩu xác nhận không khớp" };
  }

  if (!data.agreeToTerms) {
    errors.agreeToTerms = { message: "Bạn phải đồng ý với điều khoản" };
  }

  return errors;
}

export function hasErrors(errors: LoginErrors | RegisterErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Rất yếu", color: "bg-red-500" };
  if (score === 2) return { score, label: "Yếu", color: "bg-orange-400" };
  if (score === 3)
    return { score, label: "Trung bình", color: "bg-yellow-400" };
  if (score === 4) return { score, label: "Mạnh", color: "bg-emerald-400" };
  return { score, label: "Rất mạnh", color: "bg-emerald-500" };
}
