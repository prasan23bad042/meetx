"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // LOGIN
  const onLogin = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          alert("Logged in successfully");
        },
        onError: (err) => {
          alert(err.error?.message || "Login failed");
        },
      }
    );
  };

  // REGISTER
  const onRegister = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => {
          alert("Account created");
        },
        onError: (err) => {
          alert(err.error?.message || "Signup failed");
        },
      }
    );
  };

  // Loading state
  if (isPending) {
    return <div className="p-10 text-lg">Loading...</div>;
  }

  // If logged in
  if (session) {
    return (
      <div className="flex flex-col gap-y-4 p-10">
        <h2 className="text-xl font-bold">
          Logged in as {session.user.name || session.user.email}
        </h2>

        <Button onClick={() => authClient.signOut()} className="w-40">
          Sign Out
        </Button>
      </div>
    );
  }

  // If NOT logged in
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-y-4 w-[350px] p-6 border rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center">AutoFlow AI Login</h2>

        <Input
          placeholder="Name (for signup)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>Login</Button>

        <Button variant="outline" onClick={onRegister}>
          Create Account
        </Button>
      </div>
    </div>
  );
}
