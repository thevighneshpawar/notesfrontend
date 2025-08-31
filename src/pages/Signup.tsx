"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Mail, KeyRound, User, Calendar } from "lucide-react";
import logo from "../assets/singleLogo.png";
import rightImage from "../assets/right-column.png";
import { signup, verifyOtp } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer]);

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signup(name, dob, email);
      if (res.success) {
        setShowOtpField(true);
        // Start timer when OTP is sent
        setTimer(60);
        setIsTimerActive(true);
      } else {
        setError(res.message || "sign up problem please refresh");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await verifyOtp(email, otp);
      console.log(res);

      if (res.user) {
        login(res.user);
        navigate("/notes");
      }
    } catch (error) {
      console.error("Error during verification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return; // Prevent resend if timer is still active

    setIsLoading(true);
    try {
      const res = await signup(name, dob, email);
      console.log("Resending OTP to:", email);
      console.log(res);
      // Restart timer
      setTimer(60);
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main className="h-screen bg-white overflow-hidden">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[484px_1fr]">
        {/* Left column */}
        <div className="flex flex-col h-full">
          {/* Logo row */}
          <header className="flex items-center gap-2 px-6 pt-6 lg:px-10 lg:pt-8 flex-shrink-0">
            <img
              src={logo}
              alt="HD logo"
              className="h-6 w-6"
            />
            <span className="text-lg font-semibold text-gray-900">HD</span>
          </header>

          {/* Form block */}
          <section className="flex flex-1 items-center justify-center">
            <div className="w-full px-6 pb-10 pt-6 lg:px-10">
              <div className="w-full max-w-sm mx-auto">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                  Sign up
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Create an account to get started.
                </p>
                {error && (
                  <div className="mt-4 rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {!showOtpField ? (
                  // Initial form - Name, DOB, and Email
                  <form
                    onSubmit={handleGetOtp}
                    className="mt-8 space-y-5"
                  >
                    {/* Name */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-blue-600">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-[15px] text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-blue-600">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          required
                          className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-[15px]  text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-blue-600">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-[15px] text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="h-11 w-full rounded-lg bg-blue-600 px-4 text-[15px] font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Sending..." : "Get OTP"}
                    </button>
                  </form>
                ) : (
                  // OTP verification form
                  <form
                    onSubmit={handleVerifyOtp}
                    className="mt-8 space-y-5"
                  >
                    {/* Email (readonly) */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-blue-600">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          readOnly
                          className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-[15px] text-gray-900 bg-gray-50 outline-none"
                        />
                      </div>
                    </div>

                    {/* OTP */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        OTP
                      </label>
                      <div className="relative">
                        <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          placeholder="Enter OTP"
                          className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-[15px] text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                        />
                      </div>
                    </div>

                    {/* Timer and Resend */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        {timer > 0 ? (
                          <span className="text-sm text-gray-600">
                            Resend OTP in {formatTime(timer)}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isLoading}
                            className="text-sm font-medium text-blue-600 underline-offset-2 hover:underline disabled:opacity-50"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Keep me logged in
                      </label>
                    </div>

                    {/* Verify OTP Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="h-11 w-full rounded-lg bg-blue-600 px-4 text-[15px] font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Verifying..." : "Verify & Sign Up"}
                    </button>

                    {/* Back to email */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowOtpField(false);
                        setTimer(0);
                        setIsTimerActive(false);
                        setOtp("");
                      }}
                      className="w-full text-sm text-gray-600 hover:text-gray-800"
                    >
                      ← Change email address
                    </button>
                  </form>
                )}

                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/signin"
                    className="font-medium text-blue-600 underline-offset-2 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right image panel */}
        <div className="hidden lg:block relative h-full w-full">
          <img
            src={rightImage}
            alt="Authentication illustration"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default SignUp;
