import { object, ref, string } from "yup";
import * as Yup from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
});

export const RegisterSchema = object().shape({
  username: string().required("Username is required"),
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
  phone_number: string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters"),
});

export const ForgotPasswordSchema = object().shape({
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
});

export const ResetPasswordSchema = object().shape({
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
});

export const CreatePenelitianSchema = Yup.object().shape({
  judul_penelitian: Yup.string().required("Judul penelitian is required"),
  tahun_ajar: Yup.string().required("Tahun ajar is required"),
  nidn: Yup.string().required("NIDN is required"),
  nama: Yup.string().required("Nama is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  jafung: Yup.string().required("Jafung is required"),
  prodi: Yup.string().required("Prodi is required"),
  wa: Yup.string()
    .matches(/^[0-9]+$/, "WA must be a number")
    .required("WA is required"),
  ketua_peneliti: Yup.string().required("Ketua peneliti is required"),
  anggota_1: Yup.string().required("Anggota 1 is required"),
  anggota_2: Yup.string().notRequired(),
  anggota_3: Yup.string().notRequired(),
  anggota_4: Yup.string().notRequired(),
  userId: Yup.string().required("User ID is required"),
});

export const validationSchema = Yup.object().shape({
  tahun_akademik: Yup.string().required("Tahun Akademik is required"),
  semester: Yup.string().required("Semester is required"),
  nama: Yup.string().required("Nama is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  wa: Yup.string().required("Whatsapp is required"),
});
