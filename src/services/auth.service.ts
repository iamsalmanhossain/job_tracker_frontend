import { api } from '@/lib/api';
import {
  TRegister,
  TLogin,
  TGoogleLogin,
  TVerifyEmail,
  TForgotPassword,
  TResetPassword,
  TUpdateProfile,
} from '@/validations/auth.validation';



export const AuthService = {
  /**
   * Registers a new user.
   */
  register: async (payload: TRegister) => {
    return await api.post(`/auth/register`, payload);
  },


  resendOtp: async (email: string) => {
    return await api.post(`/auth/resend-otp`, { email });
  },

  /**
   * Logs in a user.
   */
  login: async (payload: TLogin) => {
    return await api.post(`/auth/login`, payload);
  },

  /**
   * Logs in an admin.
   */
  adminLogin: async (payload: TLogin) => {
    return await api.post(`/auth/admin/login`, payload);
  },

  /**
   * Logs in a user using Google OAuth.
   */
  googleLogin: async (payload: TGoogleLogin) => {
    return await api.post(`/auth/google-login`, payload);
  },

  /**
   * Verifies user email with OTP.
   */
  verifyEmail: async (payload: TVerifyEmail) => {
    return await api.post(`/auth/verify-email`, payload);
  },

  /**
   * Sends a password reset OTP to email.
   */
  forgotPassword: async (payload: TForgotPassword) => {
    return await api.post(`/auth/forgot-password`, payload);
  },

  /**
   * Resets the password using OTP.
   */
  resetPassword: async (payload: TResetPassword) => {
    return await api.post(`/auth/reset-password`, payload);
  },

  /**
   * Logs out the user.
   * Note: The `api` wrapper automatically attaches the Auth Header/Token.
   */
  logout: async () => {
    return await api.post(`/auth/logout`, {});
  },

  /**
   * Logs out from all devices.
   */
  logoutAll: async () => {
    return await api.post(`/auth/logout-all`, {});
  },

  /**
   * Gets the current user's profile.
   */
  getProfile: async () => {
    return await api.get(`/auth/profile`);
  },

  /**
   * Updates the current user's profile.
   */
  updateProfile: async (payload: TUpdateProfile) => {
    return await api.patch(`/auth/profile`, payload);
  },

  /**
   * Deletes the user account.
   */
  deleteProfile: async () => {
    return await api.delete(`/auth/profile`);
  },
};
