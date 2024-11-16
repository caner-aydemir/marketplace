import React from 'react';
import LoginContent from "@/components/LoginContent";
import LoginForm from "@/components/LoginForm";

const Page = () => {
    return (
        <div className="flex h-screen">
            <div className=" flex-1 flex flex-col items-center justify-center bg-gray-50 ">
                <LoginContent />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <LoginForm />
            </div>
        </div>
    );
};

export default Page;
