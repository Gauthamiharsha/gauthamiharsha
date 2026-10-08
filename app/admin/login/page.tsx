"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Invalid login details."
        );
        return;
      }

      window.location.href =
        "/admin/dashboard";
    } catch {
      setError(
        "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-[24px]">
      <div className="w-full max-w-[430px]">

        <div className="text-center">

          <p className="font-body text-[10px] font-semibold tracking-[0.22em] text-bronze-gold">
            PRIVATE ACCESS
          </p>

          <h1 className="mt-[8px] font-heading text-[48px] font-semibold leading-[50px] text-espresso">
            Welcome back.
          </h1>

          <p className="mx-auto mt-[12px] max-w-[340px] font-body text-[14px] leading-[23px] text-warm-brown">
            Sign in to manage your clients,
            bookings and appointments.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-[35px] rounded-[18px] border border-bronze-gold/20 bg-champagne/30 p-[25px] shadow-[0_20px_60px_rgba(42,26,8,0.06)] sm:p-[35px]"
        >

          <div>
            <label
              htmlFor="email"
              className="font-body text-[10px] font-semibold tracking-[0.14em] text-espresso"
            >
              EMAIL ADDRESS
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="mt-[8px] h-[50px] w-full rounded-[7px] border border-bronze-gold/20 bg-ivory px-[14px] font-body text-[14px] text-espresso outline-none transition-colors focus:border-bronze-gold"
            />
          </div>

          <div className="mt-[20px]">
            <label
              htmlFor="password"
              className="font-body text-[10px] font-semibold tracking-[0.14em] text-espresso"
            >
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="mt-[8px] h-[50px] w-full rounded-[7px] border border-bronze-gold/20 bg-ivory px-[14px] font-body text-[14px] text-espresso outline-none transition-colors focus:border-bronze-gold"
            />
          </div>

          {error && (
            <div className="mt-[15px] rounded-[7px] border border-red-200 bg-red-50 px-[13px] py-[10px] font-body text-[12px] leading-[19px] text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group mt-[25px] flex h-[52px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[7px] bg-espresso font-body text-[14px] font-semibold text-ivory transition-all duration-200 hover:bg-warm-brown disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LockKeyhole
              size={16}
              strokeWidth={1.8}
            />

            <span>
              {loading
                ? "Signing in..."
                : "Sign In"}
            </span>

            {!loading && (
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            )}
          </button>

        </form>

        <p className="mt-[20px] text-center font-body text-[9px] tracking-[0.18em] text-warm-brown/50">
          PRIVATE ADMIN AREA
        </p>

      </div>
    </main>
  );
}