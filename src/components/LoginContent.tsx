import React from 'react';
import Image from 'next/image';
import LoginPageImage from '../../public/images/loginPageImage.svg';
import OctopusLogo from '../../public/images/octopusLogo.svg';

const LoginContent: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full p-8 gap-y-10 items-center">
           <div className={"w-full"}>
               <Image
                   src={OctopusLogo}
                   alt="Octopus Market Logo"
                   width={170}
                   height={36}
               />
           </div>
            <div className="w-full ">
                    <Image
                        src={LoginPageImage}
                        alt="Octopus Market Login Banner"
                        width={411}
                        height={411}
                        className="m-auto"
                        loading="lazy"
                    />
                    <h1 className="text-3xl font-semibold mb-6 text-black">
                        Let Free Your Creativity with Our Intuitive Content Creator
                    </h1>
                    <p>
                        No design degree is required! Effortlessly craft and design stunning
                        and captivating content using our user-friendly creative editor.
                        With our drag-and-drop technology, anyone can create amazing
                        marketing materials in.
                    </p>
                </div>
        </div>
    );
};

export default LoginContent;