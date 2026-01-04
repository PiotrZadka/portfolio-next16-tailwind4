"use client";

import { useEffect, useState } from "react";

const codeLines = [
  { text: "const developer = {", delay: 0 },
  { text: '  name: "Piotr Zadka",', delay: 100 },
  { text: '  role: "Full-stack Developer",', delay: 200 },
  { text: '  location: "Leeds, UK",', delay: 300 },
  { text: "  skills: [", delay: 400 },
  { text: '    "React", "TypeScript",', delay: 500 },
  { text: '    "Next.js", "Node.js",', delay: 600 },
  { text: '    "AWS", "AI Agents"', delay: 700 },
  { text: "  ],", delay: 800 },
  { text: "  passion: () => {", delay: 900 },
  { text: "    return buildCoolStuff();", delay: 1000 },
  { text: "  }", delay: 1100 },
  { text: "};", delay: 1200 },
];

export function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Animate lines appearing
    const lineTimers = codeLines.map((_, index) => {
      return setTimeout(() => {
        setVisibleLines(index + 1);
      }, codeLines[index].delay + 500);
    });

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#1e1e2e] rounded-2xl overflow-hidden border border-border shadow-2xl font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
          <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
        </div>
        <span className="text-muted-foreground text-xs ml-2">developer.ts</span>
      </div>

      {/* Code content */}
      <div className="p-4 space-y-1 text-[13px] leading-relaxed">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="flex">
            <span className="w-6 text-muted-foreground/50 select-none text-right mr-4">
              {index + 1}
            </span>
            <span>
              <SyntaxHighlight text={line.text} />
            </span>
          </div>
        ))}
        {visibleLines < codeLines.length && (
          <div className="flex">
            <span className="w-6 text-muted-foreground/50 select-none text-right mr-4">
              {visibleLines + 1}
            </span>
            <span
              className={`w-2 h-5 bg-primary ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
            />
          </div>
        )}
        {visibleLines === codeLines.length && (
          <div className="flex">
            <span className="w-6 text-muted-foreground/50 select-none text-right mr-4">
              {codeLines.length + 1}
            </span>
            <span
              className={`w-2 h-5 bg-primary ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SyntaxHighlight({ text }: { text: string }) {
  // Simple syntax highlighting
  const highlighted = text
    // Keywords
    .replace(/\b(const|return)\b/g, '<span class="text-[#cba6f7]">$1</span>')
    // Strings
    .replace(/"([^"]*)"/g, '<span class="text-[#a6e3a1]">"$1"</span>')
    // Properties before colon
    .replace(/(\w+):/g, '<span class="text-[#89b4fa]">$1</span>:')
    // Function calls
    .replace(/(\w+)\(\)/g, '<span class="text-[#f9e2af]">$1</span>()')
    // Brackets and punctuation
    .replace(/([{}[\],;()])/g, '<span class="text-[#cdd6f4]">$1</span>')
    // Arrow function
    .replace(/=&gt;/g, '<span class="text-[#cba6f7]">=&gt;</span>');

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}
