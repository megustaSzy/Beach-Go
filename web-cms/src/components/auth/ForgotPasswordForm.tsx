"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-[360px] rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="space-y-3 pb-6 text-center">
          <CardTitle className="text-2xl font-bold">Lupa Password</CardTitle>

          <CardDescription className="text-sm leading-relaxed text-slate-500">
            Masukkan email akun Anda untuk menerima link reset password.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Email</label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                type="email"
                placeholder="m@example.com"
                className="h-11 pl-10"
              />
            </div>
          </div>

          <Button
            className="
              h-11
              w-full
              rounded-lg
              font-medium
       
            "
          >
            Kirim Link Reset
          </Button>

          <Button variant="outline" className="h-11 w-full rounded-lg">
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Login</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
