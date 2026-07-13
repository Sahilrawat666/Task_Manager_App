import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import zentask_i from "../assets/zentask_i.png";
import { toast } from "sonner";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`,
        {
          password,
        },
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-2xl rounded-3xl px-4 border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-blue-300/40"
        >
          <div className="flex justify-center mb-3">
            <div className="flex justify-center ">
              <img
                src={zentask_i}
                alt="ZenTask"
                className="w-40 md:w-48 object-contain"
              />
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-white">
            Reset Password
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-8 text-sm">
            Create a new secure password for your account.
          </p>

          {/* Password */}

          <div className="mb-4 md:mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="input input-bordered w-full rounded-xl pr-12 h-8 py-1 px-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div className="mb-4 md:mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="input input-bordered w-full rounded-xl pr-12 h-8 py-1 px-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="btn w-full rounded-xl h-10 py-1 px-2 cursor-pointer bg-blue-600 hover:bg-blue-700 border-none text-white text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 mb-2 text-blue-600 hover:text-blue-700 font-medium transition duration-300 hover:gap-3"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
