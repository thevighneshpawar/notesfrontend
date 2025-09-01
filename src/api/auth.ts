import api from "./axios";

export const signup = async (name: string, dob: string, email: string) => {
  const res = await api.post("/auth/signup", { name, dob, email });
  return res.data;
};

export const signin = async (email: string) => {
  const res = await api.post("/auth/signin", { email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const getGoogleAuthUrl = async () => {
  const res = await api.get(`/auth/google/auth-url`, { withCredentials: true });
  return res.data; // { success, authUrl }
};
