'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const [activeIcon, setActiveIcon] = useState('chat');

  const iconList = ['chat', 'profile', 'overview'];

  const markerTopOffsets = {
    chat: 0,
    profile: 86,      
    overview: 174
  };
  const markerTopOffset = markerTopOffsets[activeIcon];

  const handleIconClick = (iconName, route) => {
    if (activeIcon === iconName) return;
    setActiveIcon(iconName);
    if (iconName === 'chat') {
      const lastChattingId = localStorage.getItem('lastChattingId');
      router.push(lastChattingId ? `/chat/${lastChattingId}` : '/chat');
    } else {
      router.push(route);
    }
  };

  const renderIcon = (iconName, route, alt) => {
    const isActive = activeIcon === iconName;
    const src = `/icon/${iconName}${isActive ? 'active' : ''}.png`;

    const className = `transition-all duration-300 transform ${
      isActive ? 'scale-110 opacity-100 mb-1' : 'scale-100 opacity-60 mb-8'
    } cursor-pointer`;

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
    <div className="fixed top-0 left-0 w-20 h-screen bg-[#1F2123] p-4 flex flex-col items-center">
      <div className="flex flex-col items-center relative">
        <Image
          src="/icon/optimo.png"
          alt="Optimo Logo"
          width={50}
          height={50}
          className="mb-16 cursor-pointer"
          onClick={() => handleIconClick('main', '/')}
        />

        <nav className="flex flex-col gap-2 relative min-h-[200px]">
          <div
            className="absolute left-[-14px] w-[6px] h-[48px] transition-all duration-300"
            style={{ top: `${markerTopOffset}px` }}
          >
            <Image
              src="/icon/marker.png"
              alt="marker"
              width={6}
              height={48}
            />
          </div>

          {/* 아이콘 목록 */}
          {iconList.map((icon) => (
            <div key={icon} className="relative">
              {renderIcon(icon, `/${icon}`, `${icon} Icon`)}
            </div>
          ))}
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
