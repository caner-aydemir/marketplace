"use client"
import Image from "next/image";
import Link from "next/link";
import {LoginHeaderContent} from "./LoginHeaderContent";
import OctopusLogo from '../../../public/images/octopusLogo.svg';
import React from "react";

export const Header = () => {
    return (
        <nav className="w-full bg-white flex py-4 px-10  items-center justify-between border border-b-2">
            <div className="inline-flex space-x-2">
                <div className="h-8 w-auto" >
                    <Link href={"/"}>
                        <Image
                            src={OctopusLogo}
                            priority={true}
                            alt="Octopus Logo"
                            width={170}
                            height={36}
                        />
                    </Link>
                </div>
            </div>
            <LoginHeaderContent />
            <button className="rounded-full bg-blue-500 p-2 md:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6  text-slate-100"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
        </nav>
    );
};
