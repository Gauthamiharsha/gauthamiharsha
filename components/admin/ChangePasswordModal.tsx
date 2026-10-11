"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, X, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to change password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setSuccess("Password changed successfully. Use your new password next time you log in.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "h-[46px] w-full rounded-[7px] border border-[#D6AF32]/25 bg-white px-[12px] pr-[45px] font-body text-[13px] text-[#2A1A08] outline-none transition-colors focus:border-[#A67417]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0D0D0D]/55 px-[20px] py-[25px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        className="w-full max-w-[460px] rounded-[14px] border border-[#D6AF32]/25 bg-[#F8F4EA] p-[24px] shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-[30px]"
      >
        <div className="flex items-start justify-between gap-[15px]">
          <div>
            <p className="font-body text-[9px] font-semibold tracking-[0.2em] text-[#A67417]">
              ACCOUNT SECURITY
            </p>
            <h2
              id="change-password-title"
              className="mt-[5px] font-heading text-[30px] font-semibold leading-[34px] text-[#2A1A08]"
            >
              Change Password
            </h2>
            <p className="mt-[8px] font-body text-[12px] leading-[20px] text-[#6B5130]">
              Choose a new password for your private dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[6px] border border-[#D6AF32]/20 bg-white text-[#6B5130] transition-colors hover:bg-[#EFE5D0] disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-[24px] space-y-[15px]">
          <div>
            <label
              htmlFor="current-password"
              className="font-body text-[10px] font-semibold tracking-[0.1em] text-[#2A1A08]"
            >
              CURRENT PASSWORD
            </label>
            <div className="relative mt-[7px]">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className={inputClassName}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((value) => !value)}
                aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                aria-pressed={showCurrentPassword}
                className="absolute right-[12px] top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-[4px] p-[3px] text-[#8B7359] transition-colors hover:text-[#2A1A08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67417]"
              >
                {showCurrentPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="font-body text-[10px] font-semibold tracking-[0.1em] text-[#2A1A08]"
            >
              NEW PASSWORD
            </label>
            <div className="relative mt-[7px]">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className={inputClassName}
                placeholder="Enter new password (min. 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((value) => !value)}
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                aria-pressed={showNewPassword}
                className="absolute right-[12px] top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-[4px] p-[3px] text-[#8B7359] transition-colors hover:text-[#2A1A08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67417]"
              >
                {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="font-body text-[10px] font-semibold tracking-[0.1em] text-[#2A1A08]"
            >
              CONFIRM NEW PASSWORD
            </label>
            <div className="relative mt-[7px]">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={inputClassName}
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                aria-pressed={showConfirmPassword}
                className="absolute right-[12px] top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-[4px] p-[3px] text-[#8B7359] transition-colors hover:text-[#2A1A08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67417]"
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-[7px] border border-red-200 bg-red-50 px-[12px] py-[10px] font-body text-[11px] leading-[18px] text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-[7px] border border-green-200 bg-green-50 px-[12px] py-[10px] font-body text-[11px] leading-[18px] text-green-800"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[7px] bg-[#2A1A08] font-body text-[11px] font-semibold text-[#F8F4EA] transition-colors hover:bg-[#6B5130] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound size={14} />
            {loading ? "Saving..." : "Save New Password"}
          </button>
        </form>
      </section>
    </div>
  );
}