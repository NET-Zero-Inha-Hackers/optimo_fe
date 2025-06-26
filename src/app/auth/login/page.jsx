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
            <h1
                className="z-10 text-5xl font-bold text-lime-400 mb-8"
                style={{ textShadow: '0 0 16px #a3e635, 0 0 32px #a3e635' }}
            >
                Optimo
            </h1>
            
            <div className="absolute inset-0 z-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-lime-400 opacity-100 blur-lg animate-glow"
                        style={{
                            width: '8px',
                            height: '8px',
                            top: `${Math.random() * 95}%`,
                            left: `${Math.random() * 95}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-80">
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md h-12"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-lime-400 text-white rounded-md hover:bg-lime-500 transition-colors text-base font-bold h-12"
                >
                    로그인
                </button>
            </form>
            <div className="z-10 text-center text-2xl font-semibold">
                <p
                    className="text-white"
                    style={{ textShadow: '0 0 8px #a3e635, 0 0 16px #a3e635' }}
                >
                    필요할 때만 <span className="text-lime-400">AI의 힘을</span><br />
                    <span className="text-lime-400">지구를 생각</span>하는 스마트한 선택
                </p>
            </div>
        </div>
    );
}

export default page;