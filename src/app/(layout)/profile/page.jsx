"use client";

import React from "react";
import Image from 'next/image';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";

const userData = {
    name: "강유진",
    email: "using6843@gmail.com",
    profileImageURL: "1"
};

const data = [
    { model: "GPT-4.1", requests: 2524, powerWh: "100.96Wh", perMessageWh: "0.04Wh" },
    { model: "GPT-4.1 mini", requests: 1345, powerWh: "67.25Wh", perMessageWh: "0.05Wh" },
    { model: "GPT-4.1 nano", requests: 234, powerWh: "14.04Wh", perMessageWh: "0.06Wh" },
    { model: "o4-mini (high)", requests: 234, powerWh: "14.04Wh", perMessageWh: "0.06Wh" },
    { model: "GPT-4.5", requests: 234, powerWh: "14.04Wh", perMessageWh: "0.06Wh" },
    { model: "GPT-4.5", requests: 234, powerWh: "14.04Wh", perMessageWh: "0.06Wh" },
    { model: "GPT-4.5", requests: 234, powerWh: "14.04Wh", perMessageWh: "0.06Wh" },
    { model: "GPT-4.5", requests: 234, powerWh: "14.04Wh", perMessageWh: "0.06Wh" },
];

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor("model", { header: "AI 모델" }),
    columnHelper.accessor("requests", { header: "요청 수" }),
    columnHelper.accessor("powerWh", { header: "전력 소모" }),
    columnHelper.accessor("perMessageWh", { header: "Wh per message" }),
];

export default function ProfilePage() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const totalRequests = data.reduce((acc, row) => acc + row.requests, 0);
    const totalPowerWh = data.reduce((acc, row) => {
        const val = parseFloat(row.powerWh.replace("Wh", ""));
        return acc + (isNaN(val) ? 0 : val);
    }, 0).toFixed(2);

    return (
        <div className="flex flex-col h-screen text-white">
            <div className="text-white w-full flex flex-col items-center pb-16">
                <div className="w-full h-64 relative">
                    <Image
                        src="/icon/background.png"
                        alt="background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="-mt-20 z-10">
                    <Image
                        src={`/userProfile/${userData.profileImageURL}.png`}
                        alt="profile"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xl font-bold">{userData.name}</p>
                    <p className="text-gray-400 underline">{userData.email}</p>
                </div>

            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="space-y-8 p-8 flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold">지속 가능성 대시보드</h3>
                    <p className="text-sm text-gray-400">
                        가장 많이 쓰이는 LLM, GPT-4보다 약 1000Wh를 절약했어요 ❗️
                    </p>

                    {/* 게이지 그래프 */}
                    <div className="flex gap-10">
                        <GaugeCard title="전력 소비량" percentage={65} />
                        <GaugeCard title="CO₂ 소비량" percentage={55} />
                    </div>

                    <div className="bg-neutral-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto w-full flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-white">AI 모델별 요청 및 전력 소모</h2>
                        <div className="overflow-x-auto rounded-xl border border-gray-600 flex flex-col">
                            <table className="min-w-[720px] table-auto text-white">
                                <thead className="bg-neutral-700">
                                    <tr>
                                        <th className="p-3 text-left border-b border-gray-600">AI 모델</th>
                                        <th className="p-3 text-left border-b border-gray-600">요청 수</th>
                                        <th className="p-3 text-left border-b border-gray-600">전력 소모</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="max-h-[240px] overflow-y-auto">
                                <table className="min-w-[720px] table-auto text-white">
                                    <tbody>
                                        {data.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-neutral-700 transition">
                                                <td className="p-3 border-b border-gray-700">{row.model}</td>
                                                <td className="p-3 border-b border-gray-700">{row.requests.toLocaleString()}</td>
                                                <td className="p-3 border-b border-gray-700">{row.powerWh} / {row.perMessageWh} per message</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <table className="min-w-[720px] table-auto text-white bg-neutral-700 rounded-b-xl border-t border-gray-600">
                                <tfoot>
                                    <tr>
                                        <td className="p-3 font-semibold">Total</td>
                                        <td className="p-3 font-semibold">{totalRequests.toLocaleString()}</td>
                                        <td className="p-3 font-semibold">{totalPowerWh}Wh</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GaugeCard({ title, percentage }) {
    return (
        <div className="flex flex-row p-16 gap-16 bg-neutral-800 rounded-xl items-center justify-center shadow-lg">
            <div className="w-24 h-24">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textColor: "white",
                        pathColor: "#A3E635",
                        trailColor: "#444",
                    })}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4 text-sm text-center leading-tight">
                <div className="font-bold text-lg">{title}</div>
                <div className="text-sm text-gray-400">기준치 대비<br />현재 예상량</div>
            </div>
        </div>
    );
}
