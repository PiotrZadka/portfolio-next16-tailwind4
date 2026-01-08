"use client";

import { useEffect, useState, useMemo } from "react";
import { ReactNode } from "react";

const codeLines = [
  { text: "const developer = {", delay: 0 },
  { text: '  name: "Piotr Zadka",', delay: 100 },
  { text: '  contact: "piotr.zadka@gmail.com",', delay: 200 },
  { text: '  role: "Full-stack Developer",', delay: 300 },
  { text: '  location: "Leeds, UK",', delay: 400 },
  { text: "  skills: [", delay: 500 },
  { text: '    "React", "TypeScript",', delay: 600 },
  { text: '    "Next.js", "GraphQL",', delay: 700 },
  { text: '    "Cloud", "AI Agents"', delay: 800 },
  { text: "  ],", delay: 900 },
  { text: "  passion: () => {", delay: 1000 },
  { text: "    return buildCoolStuff();", delay: 1100 },
  { text: "  }", delay: 1200 },
  { text: "};", delay: 1300 },
];

export function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Optimized animation using a single interval
    let currentLine = 0;
    const animationInterval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setVisibleLines(currentLine + 1);
        currentLine++;
      } else {
        clearInterval(animationInterval);
      }
    }, 150); // Consistent typing speed

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(animationInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-terminal-bg rounded-2xl overflow-hidden border border-border shadow-2xl font-mono text-sm transition-colors duration-300">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-border transition-colors duration-300">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
          <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
        </div>
        <span className="text-terminal-line-number text-xs ml-2">
          developer.ts
        </span>
      </div>

      {/* Code content */}
      <div className="p-4 space-y-1 text-[13px] leading-relaxed text-terminal-text">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="flex">
            <span className="w-6 text-terminal-line-number select-none text-right mr-4">
              {index + 1}
            </span>
            <code>
              <SyntaxHighlight text={line.text} />
            </code>
          </div>
        ))}
        {visibleLines < codeLines.length && (
          <div className="flex">
            <span className="w-6 text-terminal-line-number select-none text-right mr-4">
              {visibleLines + 1}
            </span>
            <span
              className={`w-2 h-5 bg-primary ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
            />
          </div>
        )}
        {visibleLines === codeLines.length && (
          <div className="flex">
            <span className="w-6 text-terminal-line-number select-none text-right mr-4">
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

// Token types for syntax highlighting
type TokenType =
  | "keyword"
  | "string"
  | "property"
  | "function"
  | "punctuation"
  | "text";

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Keywords
    const keywordMatch = remaining.match(/^(const|return|let|var|function)\b/);
    if (keywordMatch) {
      tokens.push({ type: "keyword", value: keywordMatch[0] });
      remaining = remaining.slice(keywordMatch[0].length);
      continue;
    }

    // Strings (double quotes)
    const stringMatch = remaining.match(/^"[^"]*"/);
    if (stringMatch) {
      tokens.push({ type: "string", value: stringMatch[0] });
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    // Property (word followed by colon)
    const propertyMatch = remaining.match(/^(\w+):/);
    if (propertyMatch) {
      tokens.push({ type: "property", value: propertyMatch[1] });
      tokens.push({ type: "punctuation", value: ":" });
      remaining = remaining.slice(propertyMatch[0].length);
      continue;
    }

    // Function call (word followed by parentheses)
    const functionMatch = remaining.match(/^(\w+)\(\)/);
    if (functionMatch) {
      tokens.push({ type: "function", value: functionMatch[1] });
      tokens.push({ type: "punctuation", value: "()" });
      remaining = remaining.slice(functionMatch[0].length);
      continue;
    }

    // Arrow function
    const arrowMatch = remaining.match(/^=>/);
    if (arrowMatch) {
      tokens.push({ type: "keyword", value: "=>" });
      remaining = remaining.slice(2);
      continue;
    }

    // Punctuation
    const punctuationMatch = remaining.match(/^[{}[\],;()=]/);
    if (punctuationMatch) {
      tokens.push({ type: "punctuation", value: punctuationMatch[0] });
      remaining = remaining.slice(1);
      continue;
    }

    // Whitespace and other text
    const textMatch = remaining.match(/^[^"{}[\],;()=\w]+|^\w+/);
    if (textMatch) {
      tokens.push({ type: "text", value: textMatch[0] });
      remaining = remaining.slice(textMatch[0].length);
      continue;
    }

    // Fallback: consume one character
    tokens.push({ type: "text", value: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

function SyntaxHighlight({ text }: { text: string }): ReactNode {
  const tokens = useMemo(() => tokenize(text), [text]);

  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case "keyword":
            return (
              <span key={index} className="text-syntax-keyword">
                {token.value}
              </span>
            );
          case "string":
            return (
              <span key={index} className="text-syntax-string">
                {token.value}
              </span>
            );
          case "property":
            return (
              <span key={index} className="text-syntax-property">
                {token.value}
              </span>
            );
          case "function":
            return (
              <span key={index} className="text-syntax-function">
                {token.value}
              </span>
            );
          case "punctuation":
            return (
              <span key={index} className="text-syntax-punctuation">
                {token.value}
              </span>
            );
          default:
            return (
              <span key={index} className="text-terminal-text">
                {token.value}
              </span>
            );
        }
      })}
    </>
  );
}
