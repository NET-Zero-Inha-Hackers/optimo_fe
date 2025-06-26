"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Sidebar(props) {
    const router = useRouter();
    const [activeIcon, setActiveIcon] = useState('chat');

    const handleIconClick = (iconName, route) => {
        if (activeIcon === iconName) return;
        setActiveIcon(iconName);
        router.push(route);
    };

    const renderIcon = (iconName, route, alt) => {
        const isActive = activeIcon === iconName;
        const src = `/icon/${iconName}${isActive ? 'active' : ''}.png`;

        const className = `${isActive ? 'mb-1' : 'mb-8'} cursor-pointer`;

        return (
            <Image
                key={iconName}
                src={src}
                alt={alt}
                width={50}
                height={50}
                className={className}
                onClick={() => handleIconClick(iconName, route)}
            />
        );
    };

    return (
        <div className="relative w-24 bg-[#1F2123] p-4 h-screen flex flex-col items-center">
            <div className="flex flex-col items-center">
                <Image
                    src="/icon/optimo.png"
                    alt="Optimo Logo"
                    width={50}
                    height={50}
                    className="mb-16 cursor-pointer"
                    onClick={() => handleIconClick('main', '/')}
                />
                <nav className="flex flex-col gap-2">
                    {renderIcon('chat', '/chat', 'Chat Icon')}
                    {renderIcon('profile', '/profile', 'Profile Icon')}
                    {renderIcon('overview', '/overview', 'Overview Icon')}
                </nav>
            </div>

            <Image
                src="/icon/logout.png"
                alt="Logout Icon"
                width={50}
                height={50}
                className="cursor-pointer absolute bottom-6"
            />
        </div>

    );
}