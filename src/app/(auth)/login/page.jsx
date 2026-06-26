"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { Eye, EyeSlash, Xmark } from "@gravity-ui/icons";
import { Card, CardHeader, Form, Input, Label, Separator, TextField, Button } from "@heroui/react";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const nativeData = new FormData(e.currentTarget);
    const email = nativeData.get("email");
    const password = nativeData.get("password");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputStyle = {
    input: "text-slate-900 dark:text-white",
    label: "text-gray-700 dark:text-slate-300 font-medium",
    inputWrapper: "bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-700",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950">
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="w-full max-w-md shadow-2xl bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-md border border-slate-200/50">
          <CardHeader className="flex flex-col items-center py-8">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl mb-2">🩸</motion.div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue saving lives.</p>
          </CardHeader>
          <Separator />
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 flex items-center gap-2">
                <Xmark className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <Form onSubmit={handleSubmit} className="space-y-6">
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="bordered" classNames={inputStyle} />
              </TextField>

              <TextField isRequired name="password">
                <Label>Password</Label>
                <Input
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  classNames={inputStyle}
                  placeholder="Password"
                  endContent={
                    <button
                      className="focus:outline-none flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {
                        isVisible ? (
                          <EyeSlash className="w-5 h-5 pointer-events-none" />
                        ) : (
                          <Eye className="w-5 h-5 pointer-events-none" />
                        )
                      }
                    </button>
                  }
                />
              </TextField>

              <Button type="submit" isLoading={loading} className="w-full h-11 bg-red-600 text-white font-semibold rounded-xl">
                Sign In
              </Button>
              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account? <Link href="/register" className="text-red-500 hover:underline font-medium">Register here</Link>
              </p>
            </Form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}