import React from "react";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-row">
            <Sidebar />

            {/* 메인 컨텐츠 */}
            <div className="flex-1 ml-20">
                {children}
            </div>
        </div>
    );
}