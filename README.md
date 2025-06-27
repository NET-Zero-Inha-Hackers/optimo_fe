# Optimo Frontend

> **지구를 생각하는 AI 채팅 플랫폼** 🌱

Optimo는 AI 사용 시 발생하는 전력 소비를 고려하여, 필요할 때만 AI의 힘을 사용하는 스마트한 채팅 플랫폼입니다.

## 🚀 기술 스택

- **Framework**: Next.js 14.2.30 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Context API
- **Markdown Rendering**: React Markdown + KaTeX (수학 공식 지원)
- **UI Components**: Custom Components
- **Authentication**: JWT Token (쿠키 기반)
- **Real-time Communication**: WebSocket

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (layout)/          # 레이아웃 그룹
│   │   ├── chat/          # 채팅 페이지
│   │   ├── overview/      # 개요 페이지
│   │   └── profile/       # 프로필 페이지
│   ├── auth/              # 인증 관련
│   ├── globals.css        # 전역 스타일
│   ├── layout.js          # 루트 레이아웃
│   └── page.js            # 홈페이지 (로그인)
├── components/            # 재사용 가능한 컴포넌트
│   ├── Chat.jsx           # 채팅 아이템 컴포넌트
│   ├── Chatlist.jsx       # 채팅 목록
│   ├── ChatMessages.jsx   # 채팅 메시지
│   └── Sidebar.jsx        # 사이드바 네비게이션
├── contexts/              # React Context
│   ├── AuthContext.js     # 인증 상태 관리
│   └── ChatContext.js     # 채팅 상태 관리
└── lib/                   # 유틸리티 및 API
    ├── api.js             # API 클라이언트
    ├── chatapi.js         # 채팅 API
    └── websocket.js       # WebSocket 연결
```

## 🛠️ 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd optimo_fe
```

### 2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음을 추가하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔧 주요 기능

### 인증 시스템
- 이메일 기반 로그인
- JWT 토큰 자동 갱신
- 로컬 스토리지를 통한 세션 유지

### 채팅 기능
- 실시간 AI 채팅
- 마크다운 렌더링 지원
- 수학 공식 (KaTeX) 지원
- 채팅 히스토리 관리

### UI/UX
- 다크 테마
- 반응형 디자인
- 애니메이션 효과
- 사이드바 네비게이션

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#84cc16` (Lime-400)
- **Background**: `#1F2123` (Dark Gray)
- **Text**: `#ffffff` (White)
- **Secondary Text**: `#9ca3af` (Gray-400)

### 폰트
- **Sans**: Geist Sans (Variable Font)
- **Mono**: Geist Mono (Variable Font)

## 📱 페이지 구조

1. **홈페이지 (`/`)**: 로그인 화면
2. **채팅 (`/chat`)**: AI 채팅 인터페이스
3. **개요 (`/overview`)**: 사용 통계 및 개요
4. **프로필 (`/profile`)**: 사용자 프로필 관리

## 🔌 API 연동

### API 클라이언트 특징
- 자동 토큰 갱신
- 401 에러 시 자동 재시도
- 쿠키 기반 인증
- axios와 동일한 인터페이스

### 주요 API 엔드포인트
- `GET /api/user/info` - 사용자 정보 조회
- `POST /api/auth/refresh` - 토큰 갱신
- `POST /api/chat` - 채팅 메시지 전송

## 🚀 배포

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

### 환경 변수
프로덕션 환경에서는 `NEXT_PUBLIC_API_URL`을 실제 API 서버 URL로 설정하세요.

## 🧪 개발 가이드

### 코드 스타일
- ESLint 설정 사용
- Prettier 포맷팅 권장
- 컴포넌트는 PascalCase
- 파일명은 camelCase 또는 kebab-case

### 상태 관리
- 전역 상태: React Context API 사용
- 로컬 상태: useState, useEffect 사용
- 인증 상태: AuthContext에서 관리

### 컴포넌트 작성 규칙
- 함수형 컴포넌트 사용
- Props 타입 검증 권장
- 재사용 가능한 컴포넌트로 분리

## 🔍 디버깅

### 개발자 도구
- React Developer Tools
- Next.js 개발 서버의 자동 리로드
- 브라우저 개발자 도구

### 로그 확인
- 콘솔에서 API 요청/응답 로그 확인
- 인증 상태 변경 로그
- WebSocket 연결 상태 로그

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**Optimo** - 지구를 생각하는 스마트한 AI 선택 🌍
