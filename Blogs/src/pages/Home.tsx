import { Link } from "react-router-dom";
import { TerminalSquare } from "lucide-react";

export default function Home() {
    const blogs = [
        // { 
        //     title: "247CTF  Challenges",
        //     path: "blogs/247CTFs",
        //     description: "My 247CTF solves ,touched on MISC,Reverse engineering, WebExploit, PWN,Beginner stuff too"
        // },
        {
            title: "Buffer Overflow",
            path: "/blogs/ret2win",
            description:"Buffer overflow occurs when a program writes more data into a buffer than it can handle, spilling into nearby memory.This blog focuses on Ret2Win, an exploit technique used to take advantage of such overflows.Click to dive in and learn how it works."
        },
    ];

    return (
        <div className="min-h-screen w-full bg-black text-white px-6 py-12 flex flex-col items-center">
            <div className="max-w-4xl text-center mb-16">
                <div className="flex justify-center mb-4">
                    <TerminalSquare className="w-14 h-14 text-green-400 animate-pulse" />
                </div>
                <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
                    Larry's CyberSec Corner
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Welcome to my personal CyberSecurity Blog Page.
                    A place where I post all my dives in the security industry with digestible write-ups.
                </p>
            </div>

            <h2 className="text-3xl mb-8 font-semibold">Blogs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {blogs.map((blog, index) => (
                    <Link key={index} to={blog.path}>
                        <div className="relative group p-6 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-green-400">
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{blog.description}</p>
                            <div className="absolute inset-0 rounded-xl bg-green-400 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
