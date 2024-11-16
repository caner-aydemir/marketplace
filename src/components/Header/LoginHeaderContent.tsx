"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

export function LoginHeaderContent() {
    const { user } = useUser();
    const { logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    if (user) {
        return (
            <div className=" flex items-center gap-4">
                <div className="flex items-center gap-3 text-gray-400">
                    <GoSearch className={"w-5 h-5"}/>
                    <RiErrorWarningLine className={"w-5 h-5"}/>
                    <IoNotificationsOutline className={"w-5 h-5"} />
                </div>
                {/* User Avatar */}
                <div className="relative flex items-center">
                    <div className="flex justify-center items-center bg-green-100 text-green-600 rounded-full w-10 h-10 font-bold">
                        {user.firstName[0]}
                        {user.lastName[0]}
                    </div>
                </div>

                <div className="flex items-center relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-1 font-medium text-gray-800 hover:text-gray-600"
                    >
                        {user.firstName} {user.lastName}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-24 w-48 bg-white rounded-md shadow-lg border z-50">
                            <button
                                onClick={logout}
                                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
