"use client";

import Link from "next/link";
import Input from "@/components/common/Input";
import Checkbox from "@/components/common/Checkbox";
import Button from "@/components/common/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import { useState, useEffect } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/store/thunks/authThunks";
import type { AppDispatch, RootState } from "@/store";
import api from "@/lib/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        // Login successful, redirect to dashboard or home
        router.push("/dashboard");
      } else {
        // Login failed
        setError(result.payload as string || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <div className="space-y-2">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
      <Input
        type="email"
        placeholder="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="relative">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[18px] text-white transition z-10"
          >
            {showPassword ? <TbEye size={24} /> : <TbEyeOff size={24} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-6 text-xs">
        <div>
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            label="Remember Me"
          />
        </div>
        <div>
          <Link
            href="/forgot"
            className="text-white hover:text-gray-300 transition"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button
        variant="default"
        className="!font-display !font-normal uppercase tracking-widest"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "LOGGING IN..." : "LOGIN"}
      </Button>
    </div>
  );

  return (
    <AuthLayout
      headerText="WELCOME BACK"
      title="LOGIN"
      description="Please enter your login credentials to access your account"
      formContent={formContent}
      footerText="Not registered yet?"
      footerLinkText="Create an Account"
      footerLinkHref="/signup"
      showSocialLogin={true}
    />
  );
}
