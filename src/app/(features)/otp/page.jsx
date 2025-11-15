"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/UserToast";
import { verifyOTP } from "@/redux/slices/UserAuthSlice";

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phone, setPhone] = useState('');
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const dispatch = useDispatch();
  const router = useRouter();
  const { addToast } = useToast();
  const { loading, error, isAuthenticated } = useSelector((state) => state.userAuth);

  useEffect(() => {
    // Get phone from localStorage
    const storedPhone = localStorage.getItem("verificationPhone");
    if (storedPhone) {
      setPhone(storedPhone);
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     addToast("success", "Login successful!");
  //     router.push("/"); 
  //   }
  // }, [isAuthenticated, router, addToast]);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) otpRefs[index + 1].current.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) newOtp[i] = pastedData[i];
    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 5);
    otpRefs[focusIndex].current.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      addToast("error", "Please enter complete OTP");
      return;
    }

    if (!phone) {
      addToast("error", "Phone number not found");
      return;
    }

    try {
      const result = await dispatch(verifyOTP({ phone, otp: otpValue })).unwrap();
      
     
      localStorage.removeItem("verificationPhone");
      router.push("/");
      addToast("success", "OTP verified successfully!");
      
    } catch (error) {
      addToast("error", error || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    if (!phone) {
      addToast("error", "Phone number not found");
      return;
    }

    try {
      
      addToast("info", "OTP resent to your phone");
    } catch (error) {
      addToast("error", "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm sm:text-base"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back
          </button>

          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Verify your phone
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              We've sent a 6-digit code to <br />
              <span className="font-medium text-gray-900">+91 {phone}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6 sm:space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 sm:mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    disabled={loading}
                    className="w-10 h-12 text-black sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <div className="text-center">
              <button 
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Resend code
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © 2025 Crossroads. All rights reserved.
        </p>
      </div>
    </div>
  );
}