"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Sidebar(props) {
    const router = useRouter();
    return (
        <div className="w-24 bg-[#1F2123] p-4 h-screen flex flex-col items-center justify-start">
            <div className="flex flex-col gap-4">
                <Image
                    src="/icon/optima.png"
                    alt="Optima Logo"
                    width={50}
                    height={50}
                    className="mb-4"
                    onClick={() => router.push('/')}
                />
                <nav className="flex flex-col gap-2">
                    <a href="/main" className="p-2 text-sm">
                        메인!
                    </a>
                    <a href="/auth/login" className="p-2 text-sm">
                        로그인!
                    </a>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;