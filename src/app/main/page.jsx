import React from 'react';
import Chatlist from '@/components/Chatlist';

function page() {
    return (
        <div className="flex flex-row h-screen">
            <Chatlist />
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Main Page</h1>
            </div>
        </div>
    );
}

export default page;