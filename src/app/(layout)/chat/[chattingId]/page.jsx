"use client";
export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Chatlist from "@/components/Chatlist";
import ChatMessages from "@/components/ChatMessages";
import Image from "next/image";

export default function ChatPage() {
  const params = useParams();
  const chattingId = params.chattingId;

  const [chatData, setChatData] = useState({
    chattingId: "",
    ownerId: "",
    title: "",
    description: "",
    chatList: [],
    createdAt: 0,
    modifiedAt: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에 lastchattingid 저장
    localStorage.setItem("lastchattingid", chattingId);

    // DB에서 채팅 데이터 조회 (실제 구현에서는 API 호출)
    fetchChatData(chattingId);
  }, [chattingId]);

  const fetchChatData = async (id) => {
    try {
      setLoading(true);

      // 실제 API 호출
      const response = await fetch(`/api/chat/${id}`);

      if (!response.ok) {
        throw new Error("채팅을 찾을 수 없습니다");
      }

      const data = await response.json();
      setChatData(data);
    } catch (error) {
      console.error("채팅 데이터 조회 실패:", error);
      // 에러 시 빈 채팅으로 설정
      setChatData({
        chattingId: id,
        ownerId: "",
        title: "채팅을 찾을 수 없습니다",
        description: "",
        chatList: [],
        createdAt: 0,
        modifiedAt: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 자동 높이 조절
    e.target.style.height = "auto";
    const newHeight = Math.min(200, e.target.scrollHeight);
    e.target.style.height = newHeight + 5 + "px";

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendMessage = () => {
    if (formData.content.trim() === "") return;

    // TODO: 실제 메시지 전송 로직 구현
    console.log("메시지 전송:", formData.content);

    setFormData({ content: "" });
    const textarea = document.querySelector('textarea[name="content"]');
    if (textarea) textarea.style.height = "auto";
  };

  const handleInputKeyDown = (e) => {
    if (e.isComposing || (e.nativeEvent && e.nativeEvent.isComposing)) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row h-screen">
        <Chatlist />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-screen">
      <Chatlist />
      <div className="flex-1 flex flex-col items-start justify-start p-4">
        <div className="text-2xl font-bold pl-6 mb-2">{chatData.title}</div>
        <div className="flex flex-col w-full flex-1 bg-[#3F424A] rounded-lg p-8 min-h-0">
          <div
            id="chat-box"
            className="flex flex-col flex-1 overflow-y-auto min-h-0"
          >
            <ChatMessages chatList={chatData.chatList} />
          </div>
          <div
            id="input-box"
            className="flex flex-row items-center justify-between bg-[#4b4f5b] rounded-lg text-[#eeeeee] min-h-14 shadow-lg"
          >
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="w-full px-4 py-2 rounded-md resize-none overflow-y-auto bg-transparent outline-none max-h-[150px]"
              style={{ maxHeight: "150px" }}
              placeholder="내용을 입력하세요..."
              rows={1}
            />
            <button
              className="p-2 hover:bg-[#5b5f6b] rounded-lg transition-colors"
              onClick={handleSendMessage}
            >
              <Image src="/icon/arrow.svg" alt="전송" width={28} height={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
