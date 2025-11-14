"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/UserToast';
import { userLogin } from '@/redux/slices/UserAuthSlice';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { addToast } = useToast();
  const { loading, error } = useSelector((state) => state.userAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      addToast("error", "Please enter a valid phone number");
      return;
    }

    try {
      const result = await dispatch(userLogin({ phone })).unwrap();
      
      addToast("success", "OTP sent to your phone!");
      
      // Store phone for OTP verification
      localStorage.setItem("verificationPhone", phone);
      
      // Redirect to OTP page
      router.push("/otp");
      
    } catch (error) {
      addToast("error", error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-gray-600">Enter your phone number to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block text-black w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="9876543210"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © 2025 Crossroads. All rights reserved.
        </p>
      </div>
    </div>
  );
}