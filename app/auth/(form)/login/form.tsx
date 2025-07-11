"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Form, EmailInput, PasswordInput } from "@/components/form";
import { LoginSchema }  from "@/lib/schema";


type FormError = {
  email?: string[],
  password?: string[],
  message?: string,
};

export default function LoginForm() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");
  const [errors, setErrors] = useState<FormError | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmit(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = LoginSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setSubmit(false);
      return;
    }

    const { email, password } = result.data;
    const response = await signIn("credentials", { email, password, redirect: false });
    const { error, status } = response!;
    if (error || status !== 200) {
      setErrors({ message: error! });
      setSubmit(false);
    } else {
      const url = callbackUrl ? decodeURIComponent(callbackUrl) : "/drive/my-drive";
      router.push(url);
    }
  }

  return (
    <>
      { errors?.message && <div className="text-red text-center border-1 border-red py-2 mb-5">{`❗${errors.message}`}</div> }
      <Form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 font-poppins"
      >
        <EmailInput errorText={errors?.email?.[0]} />
        <PasswordInput errorText={errors?.password?.[0]} />
        <button
          type="submit"
          disabled={submit}
          className="text-md text-base bg-mauve rounded-sm py-1.5 mt-5 cursor-pointer hover:bg-mauve/90 disabled:bg-surface0 disabled:text-subtext1"
        >
          { submit ? "Submitting..." : "Login" }
        </button>
        <p className="text-md text-center">
          Not registered?
          <Link href="/auth/signin" className="ml-1 text-blue hover:text-lavender">Signin here</Link>
        </p>
      </Form>
    </>
  );
}
