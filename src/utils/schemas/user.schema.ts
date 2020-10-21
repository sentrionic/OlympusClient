import * as yup from 'yup';
import { LoginDTO, RegisterDTO } from '../../api/models';

export const LoginSchema = yup.object<LoginDTO>({
  email: yup.string().defined(),
  password: yup.string().defined(),
});

export const RegisterSchema = yup.object<RegisterDTO>({
  username: yup.string().min(3).max(30).trim().defined(),
  email: yup.string().email().lowercase().defined(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(150)
    .defined(),
});

export const UserSchema = yup.object().shape({
  email: yup.string().email().lowercase().defined(),
  bio: yup.string().max(250),
});
