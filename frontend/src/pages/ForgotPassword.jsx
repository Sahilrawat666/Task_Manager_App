import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import zentask_i from "../assets/zentask_i.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(import.meta.env.VITE_API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
        { email },
      );

      toast.success(
        res.data.message ||
          "Password reset link sent successfully. Please check your inbox.",
      );

      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-1  dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center ">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-3xl shadow-2xl px-4 sm:px-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-400/20"
        >
          {/* Logo */}

          <div className="flex justify-center mb-3">
            <img
              src={zentask_i}
              alt="ZenTask"
              className="w-40 md:w-48 object-contain"
            />
          </div>

          {/* Badge */}

          <div className="flex justify-center mb-5">
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold dark:bg-slate-800 dark:text-blue-400">
              Productivity • Secure Account Recovery
            </span>
          </div>

          {/* Heading */}

          <h2 className="text-xl md:2xl: font-bold text-center text-gray-800 dark:text-white">
            Forgot Your Password?
          </h2>

          {/* Description */}

          <p className="mt-3 text-center text-gray-500 dark:text-gray-400 text-sm leading-6">
            Don't worry! Enter the email address associated with your
            <span className="font-semibold text-blue-600"> ZenTask </span>
            account, and we'll send you a secure password reset link so you can
            get back to managing your tasks.
          </p>

          {/* Email */}

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Registered Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 py-1 px-2 sm:py-2 sm:px-4" />

              <input
                type="email"
                placeholder="Enter your ZenTask email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full text-xs md:text-sm rounded-xl pl-5 h-8 py-1 px-2  focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full mt-7 h-10 py-1 px-2 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 border-none text-white text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Security Card */}

          <div className="flex items-start gap-3 mt-6 bg-blue-50 dark:bg-slate-800 rounded-xl p-4">
            <FaShieldAlt className="text-blue-600 mt-1 " />

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-5">
              For your security, the password reset link is valid for
              <strong> 15 minutes</strong> and can only be used once. If you
              didn't request a password reset, you can safely ignore this email.
            </p>
          </div>

          {/* Divider */}

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>

            <span className="text-xs text-gray-400">Need to sign in?</span>

            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
          </div>

          {/* Back */}

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:gap-3"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>

          {/* Footer */}

          <div className="mt-5 mb-2 text-center text-xs  text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} ZenTask. All rights reserved.
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
