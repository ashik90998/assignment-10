"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowUpFromLine, Eye, EyeSlash, Xmark } from "@gravity-ui/icons";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { Card, CardHeader, FieldError, Form, Input, Label, Separator, TextField, Select, ListBox, Button } from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body,
    });
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
      await register({
        name,
        email,
        password,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        avatar: avatarUrl,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    input: "text-slate-900 dark:text-white placeholder:text-gray-400",
    label: "text-gray-700 dark:text-slate-300 font-medium",
    inputWrapper: "bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute -top-[40%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-red-500/10 blur-[120px]"
        />
      </div>

      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="w-full max-w-3xl shadow-2xl bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50">
          <CardHeader className="flex flex-col items-center py-8">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl mb-2">
              🩸
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Join the Life-Saving Network</h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm text-center max-w-md mt-1">
              Register today and help connect blood donors with people in need.
            </p>
          </CardHeader>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center gap-2">
                <Xmark className="w-4 h-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <Form onSubmit={handleSubmit} className="space-y-6 flex flex-col w-full">
              <div className="flex flex-col items-center gap-3 self-center">
                <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden hover:border-red-500 transition-colors bg-slate-50 dark:bg-[#112540]">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ArrowUpFromLine className="w-5 h-5 mb-1" />
                      <span className="text-xs">Upload</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <TextField isRequired name="name">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" variant="bordered" classNames={inputStyle} />
                </TextField>
                <TextField isRequired name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" variant="bordered" classNames={inputStyle} />
                </TextField>

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Blood Group *</span>
                  <Select value={formData.bloodGroup} onChange={(v) => handleSelectChange("bloodGroup", v)}>
                    <Select.Trigger className="border rounded-xl h-10 px-3 text-sm dark:bg-[#112540]">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="p-1 max-h-60 overflow-y-auto">
                        {bloodGroups.map((g) => (
                          <ListBox.Item key={g.key} id={g.key} textValue={g.label}>{g.label}</ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">District *</span>
                  <Select value={formData.district} onChange={(v) => handleSelectChange("district", v)}>
                    <Select.Trigger className="border rounded-xl h-10 px-3 text-sm dark:bg-[#112540]">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="p-1 max-h-60 overflow-y-auto">
                        {districts.map((d) => (
                          <ListBox.Item key={d.key} id={d.key} textValue={d.label}>{d.label}</ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-sm font-medium">Upazila *</span>
                  <Select isDisabled={!formData.district} value={formData.upazila} onChange={(v) => handleSelectChange("upazila", v)}>
                    <Select.Trigger className="border rounded-xl h-10 px-3 text-sm dark:bg-[#112540]">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="p-1 max-h-60 overflow-y-auto">
                        {(upazilas[formData.district] || []).map((u) => (
                          <ListBox.Item key={u.key} id={u.key} textValue={u.label}>{u.label}</ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <TextField isRequired name="password">
                  <Label>Password</Label>
                  <Input type={isVisible ? "text" : "password"} variant="bordered" classNames={inputStyle}
                    endContent={<button type="button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>} />
                </TextField>
                <TextField isRequired name="confirmPassword">
                  <Label>Confirm Password</Label>
                  <Input type={isVisible ? "text" : "password"} variant="bordered" classNames={inputStyle} />
                </TextField>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 bg-red-600 text-white font-semibold rounded-xl">
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-red-500 hover:underline font-medium">Sign In here</Link>
              </p>
            </Form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
