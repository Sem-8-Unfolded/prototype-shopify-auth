'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log({ response });
            if (!response?.error) {
                router.push("/");
                router.refresh();
            }

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            console.log("Login Successful", response);
        } catch (error: any) {
            console.error("Login Failed:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}