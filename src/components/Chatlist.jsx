'use client';
import React, { useEffect, useState } from 'react';
import Chat from '@/components/Chat';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const mockChatData = [
    {
        chattingId: "1",
        ownerId: "userA123",
        title: "프로젝트 킥오프 회의",
        description: "새 프로젝트 시작을 위한 킥오프 미팅 내용 정리입니다.",
        createdAt: 1687756800000,
        modifiedAt: 1687760400000
    },
    {
        chattingId: "2",
        ownerId: "userB456",
        title: "버그 수정 내역",
        description: "이번주에 처리한 버그 목록과 수정 방법 공유합니다.",
        createdAt: 1687843200000,
        modifiedAt: 1687929600000
    },
    {
        chattingId: "3",
        ownerId: "userC789",
        title: "디자인 피드백",
        description: "최근 UI/UX 디자인에 대한 피드백과 개선 사항입니다.",
        createdAt: 1687828800000,
        modifiedAt: 1687832400000
    },
    {
        chattingId: "4",
        ownerId: "userD234",
        title: "고객 미팅 요약",
        description: "오늘 고객과 진행한 미팅 내용과 주요 요구 사항입니다.",
        createdAt: 1687905600000,
        modifiedAt: 1687912800000
    },
    {
        chattingId: "5",
        ownerId: "userE567",
        title: "서버 점검 안내",
        description: "다음 주 서버 점검 일정과 서비스 중단 시간 안내입니다.",
        createdAt: 1687884000000,
        modifiedAt: 1687887600000
    },
    {
        chattingId: "6",
        ownerId: "userF890",
        title: "마케팅 전략 회의",
        description: "신제품 출시를 위한 마케팅 전략 회의록입니다.",
        createdAt: 1687862400000,
        modifiedAt: 1687866000000
    },
    {
        chattingId: "7",
        ownerId: "userG321",
        title: "주간 개발 회고",
        description: "이번 주 개발 진행 상황과 이슈를 정리한 회고록입니다.",
        createdAt: 1687790400000,
        modifiedAt: 1687794000000
    }
];

export default function Chatlist() {
    const router = useRouter();
    const [lastViewedChatId, setLastViewedChatId] = useState(() => {
        return localStorage.getItem("lastChattingId") || null;
    });

    useEffect(() => {
        function handleStorageChange(e) {
            if (e.key === "lastChattingId") {
                setLastViewedChatId(e.newValue);
            }
        }
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="flex flex-col w-80 h-screen overflow-x-visible">
            <div className="flex items-center justify-between p-4 mb-2 w-full">
                <h2 className="text-xl font-bold text-left">My Chats</h2>
                <Image
                    src="/icon/newChat.png"
                    alt="newChat Icon"
                    width={32}
                    height={32}
                    className="cursor-pointer"
                    onClick={() => { }}
                />
            </div>

            <div className="relative h-[85vh] overflow-y-scroll overflow-x-visible px-1 pt-1">
                <div className="relative z-0">
                    {mockChatData.map((chat) => (
                        <Chat
                            key={chat.chattingId}
                            title={chat.title}
                            description={chat.description}
                            onClick={() => {
                                localStorage.setItem("lastChattingId", chat.chattingId);
                                setLastViewedChatId(chat.chattingId);
                                router.push('/chat/' + chat.chattingId);
                            }}
                            isActive={chat.chattingId === lastViewedChatId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}