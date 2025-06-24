"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signUpSchema } from "@/lib/schemas/auth";
import { loginSchema } from "@/lib/schemas/auth";


export async function signIn(formData: FormData) {
  const supabase = await createClient();

  // Validate with Zod
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: "Invalid form data" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}
export async function signup(formData: FormData) {
  const supabase = await createClient();

  // 1. Validate form data with Zod
  const result = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.format() };
  }

  // 2. Attempt to sign up
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        username: result.data.username,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    },
  });

  // 3. Handle errors
  if (error) {
    console.error("Signup error:", error.message);

    // User-friendly error messages
    if (error.message.includes("already registered")) {
      return {
        error: "This email is already registered. Please login instead.",
      };
    }
    if (error.message.includes("password")) {
      return {
        error: "Password requirements not met. Please try a stronger password.",
      };
    }

    return { error: "Registration failed. Please try again later." };
  }

  // 4. Success - redirect to verification page
  redirect("/verify-email");
}
export async function resendConfirmation() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await  supabase.auth.getUser();

  if (!user?.email) {
    return { error: "No user found" };
  }

  const { error } = await (
    await supabase
  ).auth.resend({
    type: "signup",
    email: user.email,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};


export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}