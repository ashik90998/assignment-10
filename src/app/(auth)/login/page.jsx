"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";

import { Eye, EyeSlash, Xmark } from "@gravity-ui/icons";
import { Card, CardHeader, FieldError, Form, Input, Label, Separator, TextField, Button } from "@heroui/react";

export default function Login() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const nativeData = new FormData(e.currentTarget);
        const email = nativeData.get("email");
        const password = nativeData.get("password");

        try {
            const { error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        input: "text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500",
        label: "text-gray-700 dark:text-slate-300 font-medium",
        inputWrapper: "bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 transition-colors",
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 overflow-hidden transition-colors duration-300">


            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[40%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-red-500/10 dark:bg-red-600/5 blur-[120px] animate-pulse duration-[8000ms]"></div>
                <div className="absolute -bottom-[40%] -right-[20%] w-[70vw] h-[70vw] rounded-full bg-red-400/10 dark:bg-red-500/5 blur-[100px] animate-pulse duration-[6000ms] delay-1000"></div>
            </div>

            <Card className="w-full max-w-md shadow-2xl bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
                <CardHeader className="flex flex-col items-center py-8">
                    <div className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-bounce duration-[3000ms]">🩸</div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm text-center max-w-md mt-1">
                        Sign in to your account to continue saving lives.
                    </p>
                </CardHeader>

                <Separator className="bg-slate-200 dark:bg-slate-800" />

                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                            <Xmark className="w-4 h-4" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <Form onSubmit={handleSubmit} className="space-y-6 flex flex-col w-full">


                        <div className="flex flex-col gap-4 w-full">


                            <TextField isRequired name="email" type="email">
                                <Label classNames={{ label: inputStyle.label }}>Email</Label>
                                <Input placeholder="john@example.com" variant="bordered" classNames={inputStyle} />
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>


                            <TextField isRequired name="password">
                                <Label classNames={{ label: inputStyle.label }}>Password</Label>
                                <Input
                                    placeholder="Enter password"
                                    type={isVisible ? "text" : "password"}
                                    variant="bordered"
                                    classNames={inputStyle}
                                    endContent={
                                        <button type="button" onClick={toggleVisibility} className="focus:outline-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                            {isVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    }
                                />
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-xl shadow-md shadow-red-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <p className="text-center text-sm text-gray-500 dark:text-slate-400">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-red-500 dark:text-red-400 hover:underline ml-1 font-medium transition-all">
                                Register here
                            </Link>
                        </p>
                    </Form>
                </div>
            </Card>
        </div>
    );
}