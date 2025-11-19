export default function Ret2Win() {
    return (
        <div className="min-h-screen w-full bg-black text-white px-6 py-12 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <h1 className="text-5xl font-extrabold mb-6 text-green-400 tracking-tight">
                    ret2win — Beginner’s Exploitation Walkthrough
                </h1>

                {/* Introduction */}
                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                    Ret2win is one of the cleanest and most beginner-friendly exploitation
                    techniques in binary hacking. Instead of injecting shellcode or crafting
                    complex ROP chains, you simply overwrite the return address and redirect
                    execution into a hidden <span className="text-green-400 font-semibold">win()</span>
                    function. This walkthrough guides beginners through tools, mindset,
                    analysis, and payload building.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                    In ret2win challenges, the goal of the challenge is to force the program to run a function which it normally wouln't run under normal circumstances.
                </p>

                {/* Tools Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Tools You Need</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>
                            <span className="text-green-400 font-semibold">Ghidra / IDA Free</span> — for reverse engineering,
                            finding hidden functions, and checking buffer sizes.
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">pwntools</span> — Python framework for building exploits.<br />
                            <code className="text-green-400">pip install pwntools</code>
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">GDB + peda/pwndbg</span> — for debugging, inspecting registers,
                            and analyzing crashes.
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">pattern_create / pattern_offset</span> — for calculating
                            the exact overflow length.
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">objdump</span> — helps find function addresses in the program.
                            With <code className="text-green-400">objdump -d</code>, you get full disassembly and can locate the function’s address.
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">radare2</span> — an open-source reverse-engineering tool for
                            analyzing and debugging binaries. It shows disassembly, memory maps, and debugging info.
                            In short: it tears a binary open and gives full control to inspect and manipulate everything.
                            <br />
                            eg. <span className="text-green-400 font-semibold">r2 -d &lt;file&gt;</span>, then use
                            <span className="text-green-400 font-semibold"> afl | grep &lt;function&gt;</span> to find target addresses.
                        </li>
                    </ul>

                </section>

                {/* Understanding the Binary */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Step 1 — Understanding the Binary</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Start by loading the binary into Ghidra. Look for a function like
                        <code className="text-green-400"> win()</code> that prints the flag but is never called. Identify
                        the vulnerable function, which usually contains unsafe input functions
                        like <code className="text-green-400">gets()</code> or a fixed-size buffer with missing bounds checks. Ensure there are no stack canaries, as these challenges are often designed to be beginner-friendly.
                    </p>
                </section>

                {/* Finding Offset */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Step 2 — Finding the Offset</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        To determine how many bytes it takes to reach the saved return pointer,
                        use the pattern generator tools below:
                    </p>
                    <pre className="bg-zinc-900 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto">
                        {`pattern_create 200
pattern_offset <RIP_VALUE>`}
                    </pre>
                    <p className="text-gray-400 leading-relaxed mt-4">
                        This reveals the exact <span className="text-green-400 font-semibold">OFFSET</span> — the number of bytes
                        required to overwrite RIP.
                    </p>
                    <p className="text-gray-400 leading-relaxed mt-4">
                        The saved <span className="text-green-400 font-semibold">RIP</span>
                        (Instruction Pointer) is the value that tells the CPU where to execute next.
                        During a buffer overflow, once you determine the exact offset, you can overwrite
                        this saved RIP with any address you want — usually the location of your
                        exploit function, such as <span className="text-green-400 font-semibold">ret2win()</span>.
                    </p>

                    <p className="text-gray-400 leading-relaxed mt-4">
                        The goal is simple: fill the buffer up to the offset, then overwrite RIP with the
                        address you want the program to jump to. Once RIP is overwritten, the CPU follows
                        your injected address, giving you full control over program flow.
                    </p>

                </section>

                {/* Gathering Addresses */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Step 3 — Gathering Required Addresses</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Find the address of <code className="text-green-400">win()</code>.</li>
                        <li>Check for any required <span className="text-green-400">ROP gadgets</span> (rare in ret2win challenges).</li>
                        <li>Confirm calling conventions (x64 uses registers; x86 uses the stack).</li>
                    </ul>
                </section>

                {/* Craft Payload */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Step 4 — Crafting the Payload</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        After obtaining the offset and the target function address, construct
                        the final payload:
                    </p>
                    <pre className="bg-zinc-900 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto">
                        {`python3 -c "print('A' * OFFSET + WIN_ADDRESS)" | ./ret2win`}
                    </pre>

                    <p className="text-gray-400 leading-relaxed mt-4">
                        Or using pwntools:
                    </p>

                    <pre className="bg-zinc-900 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto">
                        {`from pwn import *

p = process('./ret2win')
win = p64(0x401200)  # example
payload = b'A' * OFFSET + win

p.sendline(payload)
p.interactive()`}
                    </pre>

                    <p className="text-gray-400 leading-relaxed mt-4">
                        This payload works because it fills the buffer up to the exact <span className="text-green-400 font-semibold">OFFSET</span>,
                        then overwrites the saved <span className="text-green-400 font-semibold">RIP</span> with the address of <span className="text-green-400 font-semibold">win()</span>.
                        When the vulnerable function returns, the CPU uses the overwritten RIP and jumps directly to <span className="text-green-400 font-semibold">win()</span>,
                        executing it instead of returning to the normal flow. This simple yet powerful technique demonstrates how controlling memory can redirect program execution.
                    </p>

                </section>

                {/* Approach Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">How Beginners Should Approach This</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Inspect the binary instead of guessing.</li>
                        <li>Start with clean binaries without canaries or PIE.</li>
                        <li>Practice calculating offsets quickly.</li>
                        <li>Repeat small challenges until the process becomes automatic.</li>
                    </ul>
                </section>

                {/* Recommendations */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Recommended Practice</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>
                            <span className="text-green-400 font-semibold">Beginner:</span> ROP Emporium ret2win, PicoCTF, 247CTF
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">Intermediate:</span> pwn.college, PIE-enabled binaries,
                            ret2libc challenges
                        </li>
                        <li>
                            <span className="text-green-400 font-semibold">Advanced:</span> full ROP chains, heap exploitation,
                            kernel-level challenges
                        </li>
                    </ul>
                </section>

                {/* Conclusion */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-green-300">Conclusion</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Ret2win is the perfect introduction to binary exploitation. It teaches
                        stack layout, memory corruption, and control-flow hijacking without
                        requiring advanced mitigations or complex chains. Mastering this
                        technique lays the foundation for deeper exploitation skills.
                    </p>
                </section>
            </div>
        </div>
    );
}
