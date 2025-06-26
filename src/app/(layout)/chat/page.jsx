'use client';
import { useEffect, useState } from 'react';
import Chatlist from '@/components/Chatlist';
import Image from 'next/image';
import Chatlist from '@/components/Chatlist';

const demoChat = {
    chattingId: "chat_1",
    ownerId: "user_1",
    title: "날씨에 대한 대화",
    description: "날씨와 산책에 대한 대화",
    chatList: [
        {
            sender: "USER",
            text: "안녕하세요! 오늘 날씨가 어떤가요?",
            timestamp: 1704880800000,
            model: "",
            use_estimate: 0,
            llm_estimate: 0
        },
        {
            sender: "AI", 
            text: "안녕하세요! 오늘은 맑고 화창한 날씨입니다. 기온은 약 20도 정도로 따뜻한 편이에요.",
            timestamp: 1704880805000,
            model: "gpt-4",
            use_estimate: 0.002,
            llm_estimate: 0.015
        },
        {
            sender: "USER",
            text: "좋네요! 날씨가 이렇게 좋으니 오후에 산책하기 정말 좋을 것 같아요. 요즘 재택근무하면서 운동량이 많이 줄었는데, 이런 날씨에는 공원에서 가볍게 걷기라도 해야겠어요. 혹시 근처에 추천할만한 산책로나 공원이 있을까요? 저는 나무가 많고 조용한 곳을 선호하는데, 그런 곳이면 더 좋을 것 같아요. 운동화도 새로 샀으니 잘 활용할 수 있는 기회가 될 것 같네요.",
            timestamp: 1704880810000,
            model: "",
            use_estimate: 0,
            llm_estimate: 0
        },
        {
            sender: "AI",
            text: "네, 정말 산책하기 좋은 날씨네요! 나무가 많고 조용한 곳을 찾으신다면 중앙공원을 추천드립니다. 울창한 숲길과 조용한 산책로가 잘 조성되어 있어요. 새로 구매하신 운동화를 신고 가벼운 걷기 운동하기에 딱 좋을 것 같네요. 다만 오늘은 날씨가 좋은 만큼 자외선이 강할 수 있으니 자외선 차단제를 꼭 바르시고, 수분 보충을 위해 물도 챙기시는 것 잊지 마세요. 즐거운 산책 되시길 바랍니다!",
            timestamp: 1704880815000,
            model: "gpt-4",
            use_estimate: 0.002,
            llm_estimate: 0.018
        },
        {
            sender: "USER",
            text: "중앙공원 추천 감사합니다! 자외선 차단제랑 물도 꼭 챙기도록 할게요. 그런데 혹시 중앙공원 근처에 괜찮은 카페도 있나요? 산책 끝나고 커피 한잔 하면서 쉬고 싶네요.",
            timestamp: 1704880820000,
            model: "",
            use_estimate: 0,
            llm_estimate: 0
        },
        {
            sender: "AI",
            text: "네! 중앙공원 남쪽 출구 근처에 '그린카페'라는 곳이 있어요. 통유리창이 있어서 공원 전경을 보면서 커피를 즐기실 수 있답니다. 특히 수제 레몬에이드가 유명하고, 야외 테라스도 있어서 날씨 좋은 날에는 밖에서 음료를 즐기시기에도 좋아요. 산책하시면서 땀도 흘리셨을 테니 시원한 음료 한잔이면 딱 좋을 것 같네요!",
            timestamp: 1704880825000,
            model: "gpt-4",
            use_estimate: 0.002,
            llm_estimate: 0.016
        },
        {
            sender: "USER",
            text: "와, 그린카페 정말 좋네요! 테라스에서 마시는 레몬에이드가 벌써부터 기대돼요. 오늘 저녁에는 날씨가 어떨 것 같나요? 해 질 때까지 공원에 있을까 하는데요.",
            timestamp: 1704880830000,
            model: "",
            use_estimate: 0,
            llm_estimate: 0
        },
        {
            sender: "AI",
            text: "오늘 저녁에는 기온이 약간 떨어져서 선선할 것으로 예상됩니다. 해질녘에는 18도 정도로 예보되어 있어요. 특히 일몰 시간이 오후 7시 30분경인데, 중앙공원에서 보는 노을이 정말 아름답다고 해요! 다만 저녁에는 기온이 떨어질 수 있으니 가벼운 겉옷을 하나 챙기시는 것을 추천드립니다. 해 질 무렵의 공원에서 즐기는 레몬에이드와 노을이라니, 정말 멋진 하루가 될 것 같네요!",
            timestamp: 1704880835000,
            model: "gpt-4",
            use_estimate: 0.002,
            llm_estimate: 0.020
        }
    ],
    createdAt: 1704880800000,
    modifiedAt: 1704880835000
};


export default function MainPage() {

    const [formData, setFormData] = useState({
        content: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // 자동 높이 조절
        e.target.style.height = 'auto';
        const newHeight = Math.min(200, e.target.scrollHeight); // 최대 200px
        e.target.style.height = newHeight + 5 + 'px';
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard");
    };

    return (
        <div className="flex flex-row h-screen">
            <Chatlist />
            <div className="flex-1 flex flex-col items-start justify-start p-4">
                <div className="text-2xl font-bold pl-6 mb-2">{demoChat.title}</div>
                <div className="flex flex-col w-full h-full bg-[#3F424A] rounded-lg p-8 min-h-0">
                    <div id="chat-box" className="flex flex-col flex-1 overflow-y-scroll min-h-0">
                        {demoChat.chatList.map((message, index) => (
                            <div key={index} className={`flex mb-7 ${message.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                                <div className="flex flex-row">
                                    <Image src={message.sender === 'USER' ? '/icon/user.png' : '/icon/ai.png'} alt="user" width={24} height={24} className="w-10 h-10 rounded-lg z-10" />
                                    <div className="flex flex-col ml-2">
                                        <div className="text-xs font-semibold">{message.sender}</div>
                                        <div className={`flex flex-col text-xs rounded-2xl pr-4 pl-7 py-5 -ml-5 ${message.sender === 'USER' ? 'items-end bg-[#4b4f5b]' : 'items-start bg-[#28303F]'}`}>
                                            {message.text}
                                            <div className={`flex flex-row w-full items-center justify-between mt-8 ${message.sender === 'AI' ? '' : 'hidden'}`}>
                                                <div className="text-xs text-[#888888]">Model: {message.model}</div>
                                                <button 
                                                    onClick={() => handleCopyText(message.text)}
                                                    className="text-xs text-[#888888] hover:text-[#aaaaaa] transition-colors flex flex-row items-center bg-[#202633] rounded-lg min-h-7 px-4 gap-4"
                                                >
                                                    <Image src="/icon/copy.svg" alt="copy" width={10} height={10} />
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="input-box" className="flex flex-row items-center justify-between bg-[#4b4f5b] rounded-lg text-[#eeeeee] min-h-14 shadow-lg">
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md resize-none overflow-y-auto bg-transparent outline-none"
                            style={{ 
                                maxHeight: '150px'
                            }}
                            placeholder="내용을 입력하세요..."
                            rows={1}
                        />
                        <button className="p-2 hover:bg-[#5b5f6b] rounded-lg transition-colors">
                            <img src="/icon/arrow.svg" alt="전송" className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
