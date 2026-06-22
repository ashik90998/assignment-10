"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";

import { ArrowUpFromLine, Eye, EyeSlash, Xmark } from "@gravity-ui/icons";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { Card, CardHeader, FieldError, Form, Input, Label, Separator, TextField, Select, ListBox, Button } from "@heroui/react";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        bloodGroup: "",
        district: "",
        upazila: "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSelectChange = (name, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === "district") updated.upazila = "";
            return updated;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const uploadToImgBB = async (file) => {
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
        const body = new FormData();
        body.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            { method: "POST", body }
        );

        const data = await response.json();
        if (data.success) return data.data.url;
        throw new Error("Image upload failed");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const nativeData = new FormData(e.currentTarget);
        const name = nativeData.get("name");
        const email = nativeData.get("email");
        const password = nativeData.get("password");
        const confirmPassword = nativeData.get("confirmPassword");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!avatarFile) {
            setError("Please upload profile picture");
            setLoading(false);
            return;
        }

        try {
            const avatarUrl = await uploadToImgBB(avatarFile);

            // 💡 রিকোয়ারমেন্ট অনুযায়ী role সরাসরি "donor" এবং status "active" পাঠানো হচ্ছে
            const { error: authError } = await signUp.email({
                email,
                password,
                name,
                role: "donor",
                image: avatarUrl,
                data: {
                    bloodGroup: formData.bloodGroup,
                    district: formData.district,
                    upazila: formData.upazila,
                    status: "active",
                },
            });

            if (authError) {
                setError(authError.message || "Registration failed");
            } else {
                router.push("/");
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

            <Card className="w-full max-w-3xl shadow-2xl bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
                <CardHeader className="flex flex-col items-center py-8">
                    <div className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-bounce duration-[3000ms]">🩸</div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Join the Life-Saving Network</h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm text-center max-w-md mt-1">
                        Register today and help connect blood donors with people in need.
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

                        <div className="flex flex-col items-center gap-3 self-center">
                            <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden hover:border-red-500 dark:hover:border-red-500 transition-colors bg-slate-50 dark:bg-[#112540]">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400 dark:text-slate-500">
                                        <ArrowUpFromLine className="w-5 h-5 mb-1" />
                                        <span className="text-xs">Upload</span>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" isRequired />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-slate-400">Upload your Profile Picture</span>
                        </div>

                        {/* ইনপুট গ্রিড */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                            {/* Full Name */}
                            <TextField isRequired name="name">
                                <Label classNames={{ label: inputStyle.label }}>Full Name</Label>
                                <Input placeholder="John Doe" variant="bordered" classNames={inputStyle} />
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>

                            {/* Email */}
                            <TextField isRequired name="email" type="email">
                                <Label classNames={{ label: inputStyle.label }}>Email</Label>
                                <Input placeholder="john@example.com" variant="bordered" class="-input" classNames={inputStyle} />
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>

                            {/* Blood Group Select */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-sm font-medium text-gray-800 dark:text-slate-200">Blood Group <span className="text-red-500">*</span></span>
                                <Select
                                    placeholder="Select Blood Group"
                                    isRequired
                                    value={formData.bloodGroup}
                                    onChange={(value) => handleSelectChange("bloodGroup", value)}
                                    className="w-full"
                                >
                                    <Select.Trigger className="dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl h-10 px-3 hover:border-red-500 dark:hover:border-red-500 transition-colors shadow-sm text-sm">
                                        <Select.Value className="text-slate-900 dark:text-slate-100" />
                                        <Select.Indicator className="text-slate-400" />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox className="bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1">
                                            {bloodGroups.map((group) => (
                                                <ListBox.Item id={group.key} key={group.key} textValue={group.label} className="hover:bg-red-50 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30 rounded-lg cursor-pointer text-sm">
                                                    {group.label}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* District Select */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">District <span className="text-red-500">*</span></span>
                                <Select
                                    placeholder="Select District"
                                    isRequired
                                    value={formData.district}
                                    onChange={(value) => handleSelectChange("district", value)}
                                    className="w-full"
                                >
                                    <Select.Trigger className="dark:bg-[#112540] border border-slate-200 dark:border-slate-700 rounded-xl h-10 px-3 hover:border-red-500 dark:hover:border-red-500 transition-colors shadow-sm text-sm">
                                        <Select.Value className="text-slate-900 dark:text-slate-100" />
                                        <Select.Indicator className="text-slate-400" />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox className="bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1">
                                            {districts.map((district) => (
                                                <ListBox.Item id={district.key} key={district.key} textValue={district.label} className="hover:bg-red-50 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30 rounded-lg cursor-pointer text-sm">
                                                    {district.label}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Upazila Select */}
                            <div className="flex flex-col gap-1.5 md:col-span-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Zila / Upazila <span className="text-red-500">*</span></span>
                                <Select
                                    placeholder="Select Upazila"
                                    isRequired
                                    isDisabled={!formData.district}
                                    value={formData.upazila}
                                    onChange={(value) => handleSelectChange("upazila", value)}
                                    className="w-full disabled:opacity-50"
                                >
                                    <Select.Trigger className="bg-white dark:bg-[#112540] border border-slate-200 dark:border-slate-700 rounded-xl h-10 px-3 hover:border-red-500 dark:hover:border-red-500 transition-colors shadow-sm text-sm">
                                        <Select.Value className="text-slate-900 dark:text-slate-200" />
                                        <Select.Indicator className="text-slate-400" />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox className="bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1">
                                            {(upazilas[formData.district] || []).map((upazila) => (
                                                <ListBox.Item id={upazila.key} key={upazila.key} textValue={upazila.label} className="hover:bg-red-50 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30 rounded-lg cursor-pointer text-sm">
                                                    {upazila.label}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Password */}
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

                            {/* Confirm Password */}
                            <TextField isRequired name="confirmPassword">
                                <Label classNames={{ label: inputStyle.label }}>Confirm Password</Label>
                                <Input
                                    placeholder="Repeat password"
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
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                        <p className="text-center text-sm text-gray-500 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-red-500 dark:text-red-400 hover:underline ml-1 font-medium transition-all">
                                Sign In here
                            </Link>
                        </p>
                    </Form>
                </div>
            </Card>
        </div>
    );
}