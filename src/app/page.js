import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex h-screen bg-black">
        {/* 왼쪽: Optimo 인트로 */}
        <div className="relative flex flex-col justify-center items-center w-1/2 h-full bg-black overflow-hidden animate-slideup">
          {/* 빛나는 점 효과 */}
          <div className="absolute inset-0 z-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-lime-400 opacity-100 blur-[1px] animate-glow"
                style={{
                  width: '6px',
                  height: '6px',
                  top: `${Math.random() * 95}%`,
                  left: `${Math.random() * 95}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          {/* 로고 */}
          <div className="z-10 mb-6">
            <img src="/icon/optimo.png" alt="Optimo Logo" className="w-20 h-20 mx-auto" />
          </div>
          {/* 타이틀 */}
          <h1 className="z-10 text-5xl font-bold text-lime-400 mb-8">Optimo</h1>
          {/* 설명 문구 */}
          <div className="z-10 text-center text-2xl font-semibold">
            <p className="text-white">
              필요할 때만 <span className="text-lime-400">AI의 힘을</span><br />
              <span className="text-lime-400">지구를 생각</span>하는 스마트한 선택
            </p>
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="flex flex-col justify-center items-center w-1/2 h-full bg-black">
          <div className="w-80">
            <h2 className="text-white text-2xl font-semibold mb-6 text-center">로그인</h2>
            <form>
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full mb-4 px-4 py-3 rounded-full outline-none text-black text-xs font-semibold h-12"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-lime-400 text-white text-xl font-bold hover:bg-lime-500 transition-colors h-12"
              >
                제출
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
