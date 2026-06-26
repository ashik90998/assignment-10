"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowUpFromLine, Eye, EyeSlash, Xmark } from "@gravity-ui/icons";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { Card, CardHeader, Form, Input, Label, Separator, TextField, Select, ListBox, Button } from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

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
    input: "text-slate-900 dark:text-white placeholder:text-gray-400 font-medium text-sm",
    label: "text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider mb-1.5",
    inputWrapper: "bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 focus-within:!border-red-500 rounded-xl transition-all duration-300 h-11 shadow-sm",
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-10 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/5 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-red-600/10 to-transparent blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="w-full max-w-3xl relative z-10"
      >
        <Card className="w-full shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] bg-white/90 dark:bg-[#0B1F3A]/85 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />

          <CardHeader className="flex flex-col items-center pt-10 pb-6 px-6">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30 text-2xl mb-4"
            >
              🩸
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 text-center">
              Join the Life-Saving Network
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium text-center max-w-md mt-2 leading-relaxed">
              Register today and help connect blood donors with people in need.
            </p>
          </CardHeader>

          <Separator className="bg-slate-100 dark:bg-slate-800/60" />

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, h: 0, scale: 0.95 }}
                  animate={{ opacity: 1, h: "auto", scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center gap-2.5 shadow-sm"
                >
                  <Xmark className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-semibold">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Form onSubmit={handleSubmit} className="w-full">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="space-y-6 flex flex-col w-full"
              >
                <motion.div variants={formItemVariants} className="flex flex-col items-center gap-3 self-center mb-2">
                  <div className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center overflow-hidden hover:border-red-500 dark:hover:border-red-500/70 transition-colors bg-slate-50 dark:bg-[#112540] group shadow-inner">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400 group-hover:text-red-500 transition-colors">
                        <ArrowUpFromLine className="w-5 h-5 mb-1.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Avatar</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <motion.div variants={formItemVariants}>
                    <TextField isRequired name="name">
                      <Label className={inputStyle.label}>Full Name</Label>
                      <Input placeholder="John Doe" variant="bordered" classNames={inputStyle} />
                    </TextField>
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <TextField isRequired name="email" type="email">
                      <Label className={inputStyle.label}>Email Address</Label>
                      <Input placeholder="john@example.com" variant="bordered" classNames={inputStyle} />
                    </TextField>
                  </motion.div>

                  <motion.div variants={formItemVariants} className="flex flex-col gap-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider pl-0.5">Blood Group *</span>
                    <Select value={formData.bloodGroup} onChange={(v) => handleSelectChange("bloodGroup", v)}>
                      <Select.Trigger className="border rounded-xl h-11 px-3.5 text-sm bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all font-medium text-slate-700 dark:text-slate-200">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-white dark:bg-[#0F294A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                        <ListBox className="p-1 max-h-60 overflow-y-auto">
                          {bloodGroups.map((g) => (
                            <ListBox.Item key={g.key} id={g.key} textValue={g.label} className="rounded-lg font-medium text-sm py-2 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">{g.label}</ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </motion.div>

                  <motion.div variants={formItemVariants} className="flex flex-col gap-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider pl-0.5">District *</span>
                    <Select value={formData.district} onChange={(v) => handleSelectChange("district", v)}>
                      <Select.Trigger className="border rounded-xl h-11 px-3.5 text-sm bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all font-medium text-slate-700 dark:text-slate-200">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-white dark:bg-[#0F294A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                        <ListBox className="p-1 max-h-60 overflow-y-auto">
                          {districts.map((d) => (
                            <ListBox.Item key={d.key} id={d.key} textValue={d.label} className="rounded-lg font-medium text-sm py-2 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">{d.label}</ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </motion.div>

                  <motion.div variants={formItemVariants} className="flex flex-col gap-1.5 md:col-span-2">
                    <span className="text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider pl-0.5">Upazila *</span>
                    <Select isDisabled={!formData.district} value={formData.upazila} onChange={(v) => handleSelectChange("upazila", v)}>
                      <Select.Trigger className="border rounded-xl h-11 px-3.5 text-sm bg-white dark:bg-[#112540] border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all font-medium text-slate-700 dark:text-slate-200 disabled:opacity-50">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-white dark:bg-[#0F294A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                        <ListBox className="p-1 max-h-60 overflow-y-auto">
                          {(upazilas[formData.district] || []).map((u) => (
                            <ListBox.Item key={u.key} id={u.key} textValue={u.label} className="rounded-lg font-medium text-sm py-2 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">{u.label}</ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <TextField isRequired name="password">
                      <Label className={inputStyle.label}>Password</Label>
                      <Input
                        type={isPassVisible ? "text" : "password"}
                        variant="bordered"
                        classNames={inputStyle}
                        placeholder="Enter a password"
                        endContent={
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setIsPassVisible(!isPassVisible)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          >
                            {isPassVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </motion.button>
                        }
                      />
                    </TextField>
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <TextField isRequired name="confirmPassword">
                      <Label className={inputStyle.label}>Confirm Password</Label>
                      <Input
                        type={isConfirmPassVisible ? "text" : "password"}
                        variant="bordered"
                        classNames={inputStyle}
                        placeholder="Enter a password"
                        endContent={
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setIsConfirmPassVisible(!isConfirmPassVisible)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          >
                            {isConfirmPassVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </motion.button>
                        }
                      />
                    </TextField>
                  </motion.div>
                </div>

                <motion.div variants={formItemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { scale: 1.015 }}
                    whileTap={loading ? {} : { scale: 0.985 }}
                    className="w-full h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/20 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
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
                  </motion.button>
                </motion.div>

                <motion.p variants={formItemVariants} className="text-center text-sm text-slate-500 font-medium">
                  Already have an account?{" "}
                  <Link href="/login" className="text-red-500 hover:text-red-400 font-bold transition-colors hover:underline">Sign In here</Link>
                </motion.p>
              </motion.div>
            </Form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}