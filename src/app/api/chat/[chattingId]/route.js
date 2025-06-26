import { NextResponse } from 'next/server';

// 임시 더미 데이터 (실제로는 DB에서 조회)
const dummyChats = {
    'chat_1': {
        chattingId: "chat_1",
        ownerId: "user_1",
        title: "첫 번째 채팅",
        description: "저장된 첫 번째 채팅입니다",
        chatList: [
            {
                sender: "USER",
                text: "안녕하세요!",
                timestamp: Date.now() - 10000,
                model: "",
                use_estimate: 0,
                llm_estimate: 0
            },
            {
                sender: "AI",
                text: "안녕하세요! 무엇을 도와드릴까요?",
                timestamp: Date.now() - 5000,
                model: "gpt-4",
                use_estimate: 0.002,
                llm_estimate: 0.015
            }
        ],
        createdAt: Date.now() - 10000,
        modifiedAt: Date.now() - 5000
    },
    'chat_2': {
        chattingId: "chat_2",
        ownerId: "user_1",
        title: "두 번째 채팅",
        description: "저장된 두 번째 채팅입니다",
        chatList: [
            {
                sender: "USER",
                text: "프로그래밍에 대해 질문이 있어요",
                timestamp: Date.now() - 8000,
                model: "",
                use_estimate: 0,
                llm_estimate: 0
            },
            {
                sender: "AI",
                text: "프로그래밍에 대해 어떤 질문이 있으신가요? 구체적으로 말씀해주시면 더 정확한 답변을 드릴 수 있습니다.",
                timestamp: Date.now() - 3000,
                model: "gpt-4",
                use_estimate: 0.003,
                llm_estimate: 0.020
            }
        ],
        createdAt: Date.now() - 8000,
        modifiedAt: Date.now() - 3000
    }
};

export async function GET(request, { params }) {
    try {
        const { chattingId } = params;
        
        // 실제 구현에서는 DB에서 조회
        // const chatData = await db.chat.findUnique({
        //     where: { chattingId: chattingId }
        // });
        
        const chatData = dummyChats[chattingId];
        
        if (!chatData) {
            return NextResponse.json(
                { error: '채팅을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(chatData);
    } catch (error) {
        console.error('채팅 조회 오류:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

export async function POST(request, { params }) {
    try {
        const { chattingId } = params;
        const body = await request.json();
        
        // 실제 구현에서는 DB에 메시지 저장
        // const newMessage = await db.message.create({
        //     data: {
        //         chattingId: chattingId,
        //         sender: body.sender,
        //         text: body.text,
        //         model: body.model,
        //         use_estimate: body.use_estimate,
        //         llm_estimate: body.llm_estimate
        //     }
        // });
        
        console.log('새 메시지 저장:', { chattingId, ...body });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('메시지 저장 오류:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
} 