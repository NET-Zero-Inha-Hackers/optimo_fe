'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Chatlist from '@/components/Chatlist';
import Image from 'next/image';
import ChatMessages from '@/components/ChatMessages';

// const demoChat = {
//     chattingId: "chat_1",
//     ownerId: "user_1",
//     title: "마크다운 형식 예시",
//     description: "마크다운 형식으로 작성된 대화 예시",
//     chatList: [
//         {
//             sender: "USER",
//             text: "# 마크다운 문법 테스트\n코드와 표를 포함한 다양한 마크다운 예시를 보여주세요.",
//             timestamp: 1704880800000,
//             model: "",
//             use_estimate: 0,
//             llm_estimate: 0
//         },
//         {
//             sender: "AI",
//             text: "### 코드 예시\n```python\ndef hello_world():\n    print('Hello, World!')\n    return True\n```\n\n### 표 예시\n| 이름 | 나이 | 직업 |\n|------|------|------|\n| 김철수 | 25 | 개발자 |\n| 이영희 | 28 | 디자이너 |\n\n### 수식 예시\n`E = mc^2`\n\n### 체크리스트\n- [x] 코드 블록\n- [x] 테이블\n- [x] 인라인 코드\n- [ ] 더 필요한 것이 있나요? 있다면 말씀해주세요. 구체적으로 말씀할 수록 정확도는 높아집니다! Optimo와 함께 에너지를 절약해보세요!",
//             timestamp: 1704880805000,
//             model: "gpt-4",
//             use_estimate: 0.002,
//             llm_estimate: 0.015
//         },
//         {
//             sender: "USER",
//             text: "## 인용문과 링크도 테스트해보고 싶어요!\n\n그리고 이미지는 어떻게 표현하나요?",
//             timestamp: 1704880810000,
//             model: "",
//             use_estimate: 0,
//             llm_estimate: 0
//         },
//         {
//             sender: "AI",
//             text: "> 이것은 인용문입니다.\n>> 중첩된 인용문도 가능합니다.\n\n[마크다운 가이드](https://www.markdownguide.org)\n\n이미지는 이렇게 표현합니다:\n![마크다운 로고](https://markdown-here.com/img/icon256.png)\n\n***\n\n**굵은 글씨**와 *기울임체*, ~~취소선~~도 가능합니다.\n\n### 목록 표현\n1. 첫 번째\n2. 두 번째\n   - 중첩 목록\n   - 서브 아이템",
//             timestamp: 1704880815000,
//             model: "gpt-4",
//             use_estimate: 0.002,
//             llm_estimate: 0.018
//         },
//         {
//             sender: "USER",
//             text: "```javascript\n// 자바스크립트 코드도 테스트해볼까요?\nconst test = () => {\n    console.log('테스트');\n}\n```\n\n다른 프로그래밍 언어는 어떻게 표현되나요?",
//             timestamp: 1704880820000,
//             model: "",
//             use_estimate: 0,
//             llm_estimate: 0
//         },
//         {
//             sender: "AI",
//             text: "여러 프로그래밍 언어 예시입니다:\n\n```java\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"안녕하세요\");\n    }\n}\n```\n\n```sql\nSELECT * FROM users\nWHERE age > 20\nORDER BY name;\n```\n\n```css\n.markdown-example {\n    color: #333;\n    font-weight: bold;\n}\n```\n\n### 키보드 입력\n<kbd>Ctrl</kbd> + <kbd>C</kbd>를 눌러 복사하세요.",
//             timestamp: 1704880825000,
//             model: "gpt-4",
//             use_estimate: 0.002,
//             llm_estimate: 0.016
//         },
//         {
//             sender: "USER",
//             text: "### 수학 수식은 어떻게 표현하나요?\n복잡한 수식도 가능한가요?",
//             timestamp: 1704880830000,
//             model: "",
//             use_estimate: 0,
//             llm_estimate: 0
//         },
//         {
//             sender: "AI",
//             text: "수학 수식 예시입니다:\n\n인라인 수식: `$f(x) = x^2 + 2x + 1$`\n\n블록 수식:\n```math\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n```\n\n행렬:\n```math\n\\begin{bmatrix}\na & b \\\\\nc & d\n\\end{bmatrix}\n```\n\n적분:\n```math\n\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\n```\n\n---\n\n> 💡 **참고**: 일부 마크다운 뷰어에서는 수식 렌더링을 지원하지 않을 수 있습니다.",
//             timestamp: 1704880835000,
//             model: "gpt-4",
//             use_estimate: 0.002,
//             llm_estimate: 0.020
//         }
//     ],
//     createdAt: 1704880800000,
//     modifiedAt: 1704880835000
// };

const demoChat = {
    chattingId: "",
    ownerId: "",
    title: "",
    description: "",
    chatList: [],
    createdAt: 0,
    modifiedAt: 0
};

export default function MainPage() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(true);

    useEffect(() => {
        // localStorage에서 lastchattingid 확인
        const lastChattingId = localStorage.getItem('lastchattingid');
        
        if (lastChattingId) {
            // lastchattingid가 있으면 해당 채팅으로 리다이렉트
            router.push(`/chat/${lastChattingId}`);
        } else {
            // 없으면 현재 페이지에서 빈 채팅 화면 표시
            setIsRedirecting(false);
        }
    }, [router]);

    const [formData, setFormData] = useState({
        content: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // 자동 높이 조절
        e.target.style.height = 'auto';
        const newHeight = Math.min(200, e.target.scrollHeight); // 최대 200px
        e.target.style.height = newHeight + 5 + 'px';
        
        // 스크롤을 맨 아래로 이동
        e.target.scrollTop = e.target.scrollHeight;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 메시지 전송 함수
    const handleSendMessage = () => {
        if (formData.content.trim() === '') return;
        
        // 새 채팅 생성 로직
        const newChattingId = `chat_${Date.now()}`;
        
        // localStorage에 새 chattingId 저장
        localStorage.setItem('lastchattingid', newChattingId);
        
        // 새 채팅 페이지로 이동
        router.push(`/chat/${newChattingId}`);
    };

    const handleInputKeyDown = (e) => {
        if (e.isComposing || (e.nativeEvent && e.nativeEvent.isComposing)) return; // 한글 조합 중에는 무시
        if (e.key === 'Enter' && !e.shiftKey) {
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
                <div className="text-2xl font-bold pl-6 mb-2">{demoChat.title == "" ? "New Chat" : demoChat.title}</div>
                <div className="flex flex-col w-full flex-1 bg-[#3F424A] rounded-lg p-8 min-h-0">
                    <div id="chat-box" className="flex flex-col flex-1 overflow-y-auto min-h-0">
                        <ChatMessages
                            chatList={demoChat.chatList}
                        />
                    </div>
                    <div id="input-box" className="flex flex-row items-center justify-between bg-[#4b4f5b] rounded-lg text-[#eeeeee] min-h-14 shadow-lg">
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            className="w-full px-4 py-2 rounded-md resize-none overflow-y-auto bg-transparent outline-none max-h-[150px]"
                            style={{ 
                                maxHeight: '150px'
                            }}
                            placeholder="내용을 입력하세요..."
                            rows={1}
                        />
                        <button className="p-2 hover:bg-[#5b5f6b] rounded-lg transition-colors" onClick={handleSendMessage}>
                            <img src="/icon/arrow.svg" alt="전송" className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
