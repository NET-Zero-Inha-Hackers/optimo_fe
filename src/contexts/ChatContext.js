"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/chatapi';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [allChats, setAllChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 모든 채팅 데이터를 한 번에 가져오기
  const fetchAllChats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/chattings');
      setAllChats(response);
    } catch (error) {
      console.error('채팅 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 현재 채팅 데이터 가져오기
  const getCurrentChat = () => {
    const chat = allChats.find(chat => chat._id === currentChatId);
    return chat;
  };

  // 채팅 업데이트
  const updateChat = (chatId, updatedData) => {
    console.log(`Context 업데이트 - ID: ${chatId}, 메시지 수: ${updatedData.chatList?.length || 0}`);
    
    setAllChats(prev => {
      const newChats = prev.map(chat => {
        if (chat._id === chatId) {
          // 기존 데이터와 새로운 데이터를 병합
          const mergedData = { ...chat, ...updatedData };
          
          // chatList가 있는 경우 배열을 올바르게 병합
          if (updatedData.chatList && Array.isArray(updatedData.chatList)) {
            mergedData.chatList = [...updatedData.chatList];
          }
          
          return mergedData;
        }
        return chat;
      });
      return newChats;
    });
  };

  // 새 채팅 추가 (중복 방지)
  const addChat = (newChat) => {
    setAllChats(prev => {
      // 이미 존재하는 채팅인지 확인
      const existingChat = prev.find(chat => chat._id === newChat._id);
      if (existingChat) {
        // 기존 채팅이 있으면 업데이트
        return prev.map(chat => 
          chat._id === newChat._id ? { ...chat, ...newChat } : chat
        );
      } else {
        // 새 채팅이면 맨 앞에 추가
        return [newChat, ...prev];
      }
    });
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <ChatContext.Provider value={{
      allChats,
      currentChatId,
      setCurrentChatId,
      getCurrentChat,
      updateChat,
      addChat,
      loading,
      fetchAllChats
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext); 