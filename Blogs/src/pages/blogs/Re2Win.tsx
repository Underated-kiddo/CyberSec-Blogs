export default function Ret2Win() {
    return (
        <div className="min-h-screen w-full bg-black text-white px-6 py-12 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <h1 className="text-5xl font-extrabold mb-6 text-green-400 tracking-tight">
                    ret2win — Buffer Overflow Walkthrough
                </h1>

                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                    This challenge demonstrates a classic buffer overflow exploit where our goal
                    is to overwrite the return address and redirect execution to the hidden
                    <span className="text-green-400 font-semibold"> win() </span> function.
                    Below is a full breakdown of the binary, the vulnerability,
                    and how to craft the payload.
                </p>

                {/* Challenge Overview */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Challenge Overview</h2>
                    <p className="text-gray-400 leading-relaxed">
                        In this binary, the main function reads user input into a fixed-size buffer
                        without proper bounds checking. This allows us to overflow the stack and
                        overwrite the saved return pointer. Our objective is to redirect execution
                        to the <code className="text-green-400">win()</code> function which prints the flag.
                    </p>
                </section>

                {/* Binary Analysis */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Binary Analysis</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>The binary is 64-bit and has no stack canary.</li>
                        <li>NX is enabled, but that does not matter for a ret2win exploit.</li>
                        <li>The <code className="text-green-400">win()</code> function exists but is never called.</li>
                        <li>The vulnerable function uses <code className="text-green-400">gets()</code> or an unsafe buffer.</li>
                    </ul>
                </section>

                {/* Finding the Offset */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Finding the Offset</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        To find the exact number of bytes required to overwrite RIP, we use
                        <span className="text-green-400 font-semibold"> pattern_create </span> and
                        <span className="text-green-400 font-semibold"> pattern_offset</span>.
                    </p>
                    <pre className="bg-zinc-900 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto">
                        pattern_create 200
                        pattern_offset &lt;RIP value&gt;
                    </pre>
                </section>

                {/* Crafting the Exploit */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Exploit Payload</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        Once we know the offset, the final payload simply becomes:
                    </p>
                    <pre className="bg-zinc-900 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto">
                        python3 -c "print('A' * OFFSET + WIN_ADDRESS)" | ./ret2win
                    </pre>
                </section>

                {/* Conclusion */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Conclusion</h2>
                    <p className="text-gray-400 leading-relaxed">
                        This challenge is a perfect introductory example to stack-based memory
                        corruption. It teaches the fundamentals of control-flow hijacking without
                        needing ROP chains or advanced mitigations. Mastering ret2win is the first
                        step toward deeper binary exploitation techniques.
                    </p>
                </section>
            </div>
        </div>
    );
}
