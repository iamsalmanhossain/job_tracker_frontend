import { z } from 'zod';

export const AuthSchemas = {
  register: z.object({
    email: z.string({message:'Invalid email address'}),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
  }),
  login: z.object({
    email: z.string({message:'Invalid email address'}),
    password: z.string({message:'Password is required'}),
  }),
  googleLogin: z.object({
    idToken: z.string({message:'Google ID Token is required'}),
  }),
  verifyEmail: z.object({
    otp: z.string().min(1, {message:'OTP is required'}),
    email: z.string({message:'Invalid email address'}),
  }),
  forgotPassword: z.object({
    email: z.string({message:'Invalid email address'}),
  }),
  resetPassword: z.object({
    otp: z.string().min(1, {message:'OTP is required'}),
    email: z.string({message:'Invalid email address'}),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  }),
  updateProfile: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    headline: z.string().optional(),
    website: z.string({message:'Invalid URL'}).optional().or(z.literal('')),
    linkedinUrl: z.string({message:'Invalid URL'}).optional().or(z.literal('')),
    githubUrl: z.string({message:'Invalid URL'}).optional().or(z.literal('')),
    skills: z.string().optional(),
  }),
};

export type TRegister = z.infer<typeof AuthSchemas.register>;
export type TLogin = z.infer<typeof AuthSchemas.login>;
export type TVerifyEmail = z.infer<typeof AuthSchemas.verifyEmail>;
export type TForgotPassword = z.infer<typeof AuthSchemas.forgotPassword>;
export type TResetPassword = z.infer<typeof AuthSchemas.resetPassword>;
export type TUpdateProfile = z.infer<typeof AuthSchemas.updateProfile>;
export type TGoogleLogin = z.infer<typeof AuthSchemas.googleLogin>;
