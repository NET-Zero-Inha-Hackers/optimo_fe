"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chatlist from "@/components/Chatlist";
import Image from "next/image";
import ChatMessages from "@/components/ChatMessages";
import { newChatWebSocket, continueChatWebSocket } from "@/lib/websocket";

export default function MainPage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [chat, setChat] = useState({
    chattingId: "",
    ownerId: "",
    title: "",
    description: "",
    chatList: [],
    createdAt: 0,
    modifiedAt: 0,
  });

  useEffect(() => {
    // localStorage에서 lastchattingid 확인
    const lastChattingId = localStorage.getItem("lastchattingid");

    if (lastChattingId) {
      // lastchattingid가 있으면 해당 채팅으로 리다이렉트
      router.push(`/chat/${lastChattingId}`);
    } else {
      // 없으면 현재 페이지에서 빈 채팅 화면 표시
      setIsRedirecting(false);
    }
  }, [router]);

  const [formData, setFormData] = useState({
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 자동 높이 조절
    e.target.style.height = "auto";
    const newHeight = Math.min(200, e.target.scrollHeight); // 최대 200px
    e.target.style.height = newHeight + 5 + "px";

    // 스크롤을 맨 아래로 이동
    e.target.scrollTop = e.target.scrollHeight;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 메시지 전송 함수
  const handleSendMessage = () => {
    const userChatElement = {
      sender: "USER",
      text: formData.content,
      timestamp: Math.floor(Date.now() / 1000),
      model: "",
      use_estimate: 0,
      llm_estimate: 0,
    };

    setChat((prev) => ({
      ...prev,
      chatList: [...prev.chatList, userChatElement],
    }));
    function modelNameHandler(modelName) {
      // 모델 이름 처리 로직 (예: 상태 업데이트 등)
      const aiChatElemnet = {
        sender: "AI",
        text: "",
        timestamp: Math.floor(Date.now() / 1000),
        model: modelName,
        use_estimate: 0,
        llm_estimate: 0,
      };
      setChat((prev) => ({
        ...prev,
        chatList: [...prev.chatList, aiChatElemnet],
      }));
      console.log("모델 이름:", modelName);
    }
    function modelResponseHandler(id, text) {
      // append text to the last AI message
      setChat((prev) => {
        const updatedChatList = prev.chatList;
        const lastIndex = prev.chatList.length - 1;
        updatedChatList[lastIndex].text += text;
        return {
          ...prev,
          chatList: updatedChatList,
        };
      });

      console.log("모델 응답:", id, text);
    }
    function metadataHandler(id, title, description) {
      // 메타데이터 처리 로직 (예: 상태 업데이트 등)
      setChat((prev) => ({
        ...prev,
        chattingId: id,
        title: title,
        description: description,
      }));
      // localStorage에 새 chattingId 저장
      localStorage.setItem("lastchattingid", id);
      console.log("메타데이터:", id, title, description);
    }

    if (chat.chatList.length > 0) {
      // 기존 채팅이 있는 경우
      const socket = continueChatWebSocket(
        chat.chattingId,
        formData.content,
        localStorage.getItem("jwtToken"),
        modelNameHandler,
        modelResponseHandler
      );
    } else {
      // WebSocket 연결 설정
      const socket = newChatWebSocket(
        formData.content,
        localStorage.getItem("jwtToken"),
        modelNameHandler,
        modelResponseHandler,
        metadataHandler
      );
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.isComposing || (e.nativeEvent && e.nativeEvent.isComposing)) return; // 한글 조합 중에는 무시
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 리다이렉트 중일 때 로딩 화면 표시
  if (isRedirecting) {
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
        <div className="text-2xl font-bold pl-6 mb-2">
          {chat.title == "" ? "New Chat" : chat.title}
        </div>
        <div className="flex flex-col w-full flex-1 bg-[#3F424A] rounded-lg p-8 min-h-0">
          <div
            id="chat-box"
            className="flex flex-col flex-1 overflow-y-auto min-h-0"
          >
            <ChatMessages chatList={chat.chatList} />
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
              style={{
                maxHeight: "150px",
              }}
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
