"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-[380px] border-slate-200 shadow-sm rounded-2xl">
        <CardHeader className="space-y-2 text-center pb-6 pt-8">
          <CardTitle className="text-[22px] font-bold tracking-tight">
            Reset Password
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            Masukkan password baru untuk akun Anda.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-6">
          {/* Password Baru */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password Baru</label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password baru"
                className="h-12 pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Konfirmasi Password</label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi password"
                className="h-12 pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Button Reset */}
          <Button className="w-full">
            Reset Password
          </Button>

          {/* Back */}
          <Button variant="outline" className="w-full h-10 rounded-lg">
            <Link
              href="/forgot-password"
              className="flex w-full items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Lupa Password</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
