import React from "react";
import Image from "next/image";

function page() {
    return (
        <div className="flex flex-col items-center justify-start pt-96 h-screen">
            <Image
                src="/icon/optima.png"
                alt="Optima Logo"
                width={100}
                height={100}
                className="mb-8"
            />
            <h1 className="text-4xl font-bold">Login Page</h1>
            <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                quos.
            </p>
            <div className="flex flex-col items-center justify-center gap-2 my-2">
                <div className="flex flex-row items-center justify-center min-w-64 gap-2 bg-white rounded-md p-2 text-black cursor-pointer">
                    <Image
                        src="/icon/google.svg"
                        alt="Google Logo"
                        width={25}
                        height={25}
                    />
                    <p className="text-xl font-bold">Login with Google</p>
                </div>
                <div className="flex flex-row items-center justify-center min-w-64 gap-2 bg-[#ffe812] rounded-md p-2 text-black cursor-pointer">
                    <Image
                        src="/icon/kakaotalk.svg"
                        alt="KakaoTalk Logo"
                        width={25}
                        height={25}
                    />
                    <p className="text-xl font-bold">Login with KakaoTalk</p>
                </div>
            </div>
        </div>
    );
}

export default page;