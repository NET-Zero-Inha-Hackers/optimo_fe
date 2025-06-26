'use client';

import React, { useState } from "react";
import Image from "next/image";

function page() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 로그인 로직 구현
        console.log('Login attempt:', formData);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image
                src="/icon/optima.png"
                alt="Optima Logo"
                width={100}
                height={100}
                className="mb-8"
            />
            <h1 className="text-4xl font-bold mb-8">Login Page</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-80">
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}

export default page;