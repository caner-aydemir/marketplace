import {Header} from "@/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <Header />
            {children}
        </div>
    );
}
