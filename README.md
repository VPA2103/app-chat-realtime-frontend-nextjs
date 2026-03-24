# Auth Components — Next.js + TypeScript + Tailwind

Bộ component Login/Register hoàn chỉnh, chia tách rõ ràng theo trách nhiệm.

## Cấu trúc thư mục

```
├── app/
│   └── auth/
│       └── page.tsx              # Trang auth (route /auth)
├── components/
│   ├── auth/
│   │   ├── AuthCard.tsx          # Card wrapper + tab toggle Login/Register
│   │   ├── LoginForm.tsx         # Form đăng nhập
│   │   └── RegisterForm.tsx      # Form đăng ký
│   └── ui/
│       ├── Button.tsx            # Button với variant primary/ghost + loading
│       ├── Divider.tsx           # Divider "hoặc"
│       ├── InputField.tsx        # Input có label, icon, error
│       ├── PasswordInput.tsx     # Input mật khẩu có toggle hiển thị
│       ├── PasswordStrengthBar.tsx # Thanh độ mạnh mật khẩu
│       └── SocialLoginButtons.tsx  # Nút Google / GitHub OAuth
├── hooks/
│   ├── useLoginForm.ts           # State, validation, submit cho login
│   └── useRegisterForm.ts        # State, validation, submit cho register
├── lib/
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   └── validation.ts             # Hàm validate + getPasswordStrength
└── types/
    └── auth.ts                   # TypeScript types
```

## Cài đặt dependencies

```bash
npm install clsx tailwind-merge
```

## Tính năng

- ✅ Tab toggle mượt mà giữa Login và Register
- ✅ Validation client-side đầy đủ (email, mật khẩu, confirm, terms)
- ✅ Hiển thị lỗi từng field khi submit hoặc khi xóa giá trị
- ✅ Thanh độ mạnh mật khẩu (5 mức)
- ✅ Toggle hiển thị/ẩn mật khẩu
- ✅ Loading state khi submit
- ✅ Success state sau submit
- ✅ Ghi nhớ đăng nhập (Remember me)
- ✅ Đồng ý điều khoản với link
- ✅ Social login (Google, GitHub) — kết nối OAuth tùy dự án
- ✅ Responsive, dark theme
- ✅ Accessible (labels, aria, focus rings)

## Tùy chỉnh API

Trong `hooks/useLoginForm.ts` và `hooks/useRegisterForm.ts`,  
thay phần `// Simulate API call` bằng fetch thực tế:

```ts
const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
if (!res.ok) throw new Error("Login failed");
```
