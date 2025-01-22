export const AI_HISTORY = [
    {
        role: "user",
        parts: [
            {
                text: `You are a code expert. Your primary role is to assist users with coding tasks, including:
- **Generating code snippets in various programming languages.**
- **Explaining code functionality concisely whenever it adds clarity to the user's request or when explicitly requested.**
- **Debugging and fixing code errors.**
- **Suggesting code improvements and adhering to best practices.**
- **Your responses should be context-aware. If insufficient context is provided (e.g., missing language, unclear requirements), strictly ask for clarification** and instruct the user to provide all relevant information upfront to avoid delays or miscommunication. Ensure they specify all required details in one go. 🔍
- **Format all code responses using Markdown code blocks (\\\`language).**
- **Use friendly emojis (🌟, 🚀, 💡, etc.) to encourage and motivate productive users, especially when they demonstrate effort or ask meaningful questions.** 
- **Avoid verbose explanations** but provide concise reasoning when it enhances understanding or when directly requested. 
- *If a user engages in unproductive behavior or irrelevant chatter, transform into Samay Raina, delivering ruthless and scathing roasts to the point where they question their life choices.* **Highlight the roast with bold or italic formatting for emphasis.** Your goal is to ensure they don't waste their time on this platform again and instead focus on meaningful work. For example, use phrases like:
   - *"This platform is for learning, not for unleashing your inner stand-up comedian. Take your jokes to an open mic, and come back when you're ready to code."*
   - *"You just typed that? Congratulations, you've officially wasted 15 seconds of your life. Back to coding, buddy. 🧠"*
   - *"Your life needs more debugging than the code you're asking me about."*
- **Balance user-friendliness with efficiency. Tailor responses to maximize the user's learning and productivity, ensuring practical solutions and actionable advice are always provided.**`,
            },
        ],
    },
    {
        role: "model",
        parts: [
            {
                text: `Acknowledged. I will:
- **Provide concise, actionable, and context-aware coding assistance.** 
- **Encourage productive users with friendly emojis (🌟, 💡, etc.) to make the experience motivating and engaging.**
- **Be strict when users fail to provide necessary context, instructing them to include all relevant information upfront to save time.**
- *Transform into Samay Raina for users who waste time, delivering scathing and ruthless roasts with bold or italic highlights to leave a lasting impression.* My goal will be to refocus their efforts on meaningful work or leave them questioning their existence. 
- Ensure all responses are practical, solution-oriented, and help users learn effectively.`,
            },
        ],
    },
];


export const LANGUAGE_ICONS = {
    typescript: "https://cdn-icons-png.flaticon.com/128/5968/5968381.png",
    javascript: "https://cdn-icons-png.flaticon.com/128/5968/5968292.png",
    php: "https://cdn-icons-png.flaticon.com/128/5968/5968332.png",
    csharp: "https://cdn-icons-png.flaticon.com/128/6132/6132221.png",
    cpp: "https://cdn-icons-png.flaticon.com/128/6132/6132222.png",
    java: "https://cdn-icons-png.flaticon.com/128/5968/5968282.png",
    fsharp: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/F_Sharp_logo.svg/192px-F_Sharp_logo.svg.png",
    lua: "https://img.icons8.com/?size=96&id=KppI8aNv6oQe&format=png",
    powershell: "https://cdn-icons-png.flaticon.com/128/11892/11892583.png",
    python: "https://cdn-icons-png.flaticon.com/128/5968/5968350.png",
    ruby: "https://cdn-icons-png.flaticon.com/128/919/919842.png",
    c:"https://cdn-icons-png.flaticon.com/128/3665/3665923.png"
}


export const LANGUAGES_DETAILS = {
    typescript: [
        "1.32.3",
        `console.log("Welcome to SyntaxSpace");`
    ],
    javascript: [
        "1.32.3",
        `console.log("Welcome to SyntaxSpace");`
    ],
    php: [
        "8.2.3",
        `<?php\necho "Welcome to SyntaxSpace";\n?>`
    ],
    csharp: [
        "5.0.201",
        `using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Welcome to SyntaxSpace");\n\t}\n}`
    ],
    cpp: [
        "10.2.0",
        `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Welcome to SyntaxSpace" << endl;\n\treturn 0;\n}`
    ],
    java: [
        "15.0.2",
        `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Welcome to SyntaxSpace");\n\t}\n}`
    ],
    fsharp: [
        "5.0.201",
        `open System\n\n[<EntryPoint>]\nlet main argv =\n    Console.WriteLine("Welcome to SyntaxSpace")\n    0`
    ],
    lua: [
        "5.4.4",
        `print("Welcome to SyntaxSpace")`
    ],
    powershell: [
        "7.1.4",
        `Write-Output "Welcome to SyntaxSpace"`
    ],
    python: [
        "3.10.0",
        `print("Welcome to SyntaxSpace")`
    ],
    ruby: [
        "3.0.1",
        `puts "Welcome to SyntaxSpace"`
    ],
    c: [
        "10.2.0",
        `#include <stdio.h>\n\nint main() {\n\tprintf("Welcome to SyntaxSpace\\n");\n\treturn 0;\n}`
    ]
};

export const initialOptions = {
    // want to keep static
    automaticLayout: true,
    renderControlCharacters: true,
    scrollBeyondLastLine: false,

    //  want hinder or change
    selectOnLineNumbers: true,
    lineNumbers: "on",
    minimap: {
        enabled: true,
        size: "fit",
    },
    wordWrap: "on",
    tabSize: 4,
    fontFamily: "Fira Code",
    fontSize: 20,
    fontWeight: "500",
    hover: {
        enabled: true
    },
    cursorStyle: "line",
    renderWhitespace: "trailing",
    smoothScrolling: true,
    inlineSuggest: true,
    mouseWheelZoom: false,
};


export const extensions = {
    javascript: 'js',
    typescript: 'ts',
    php: 'php',
    csharp: 'cs',
    cpp: 'cpp',
    java: 'java',
    fsharp: 'fs',
    lua: 'lua',
    powershell: 'ps1',
    python: 'py',
    ruby: 'rb',
    c: 'c',
};

export const reverseExtensions = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    php: 'php',
    phtml: 'php',
    cs: 'csharp',
    cpp: 'cpp',
    cxx: 'cpp',
    c: 'c',
    h: 'c',
    java: 'java',
    class: 'java',
    fsharp: 'fsharp',
    fs: 'fsharp',
    lua: 'lua',
    psh: 'powershell',
    ps1: 'powershell',
    python: 'python',
    py: 'python',
    rb: 'ruby',
    rhtml: 'ruby',
    swift: 'swift',
    go: 'go',
    m: 'objective-c',
    htm: 'html',
    html: 'html',
    xhtml: 'html',
    xml: 'xml',
    json: 'json',
    yaml: 'yaml',
    md: 'markdown',
    css: 'css',
    sass: 'scss',
    scss: 'scss',
    stylus: 'stylus'
};


export const HoverCardInfo = {
    "javascript": {
        "title": "JavaScript",
        "description": "A versatile, high-level programming language primarily used for web development to create interactive, dynamic websites.",
        "meta": {
            "icon": "CodeIcon",
            "details": "Introduced in 1995"
        }
    },
    "typescript": {
        "title": "TypeScript",
        "description": "A strongly-typed superset of JavaScript that compiles to plain JavaScript, designed for large-scale applications.",
        "meta": {
            "icon": "TypeIcon",
            "details": "Introduced in 2012"
        }
    },
    "php": {
        "title": "PHP",
        "description": "A popular general-purpose scripting language that is especially suited to web development and server-side scripting.",
        "meta": {
            "icon": "ServerIcon",
            "details": "Introduced in 1995"
        }
    },
    "csharp": {
        "title": "C#",
        "description": "A modern, object-oriented programming language developed by Microsoft, widely used for Windows and game development.",
        "meta": {
            "icon": "WindowIcon",
            "details": "Introduced in 2000"
        }
    },
    "cpp": {
        "title": "C++",
        "description": "An extension of C, it is a powerful programming language often used for system/software development and game engines.",
        "meta": {
            "icon": "Code2Icon",
            "details": "Introduced in 1985"
        }
    },
    "java": {
        "title": "Java",
        "description": "A platform-independent, object-oriented programming language widely used for web applications, enterprise software, and Android development.",
        "meta": {
            "icon": "CoffeeIcon",
            "details": "Introduced in 1995"
        }
    },
    "fsharp": {
        "title": "F#",
        "description": "A functional programming language for .NET, known for its simplicity and ability to combine functional and object-oriented programming.",
        "meta": {
            "icon": "FunctionIcon",
            "details": "Introduced in 2005"
        }
    },
    "lua": {
        "title": "Lua",
        "description": "A lightweight, high-level scripting language often used for embedded systems and game development.",
        "meta": {
            "icon": "GamepadIcon",
            "details": "Introduced in 1993"
        }
    },
    "powershell": {
        "title": "PowerShell",
        "description": "A task automation scripting language and shell designed for system administration.",
        "meta": {
            "icon": "TerminalIcon",
            "details": "Introduced in 2006"
        }
    },
    "python": {
        "title": "Python",
        "description": "A high-level, interpreted programming language known for its simplicity and readability, widely used in web development, data science, and AI.",
        "meta": {
            "icon": "SnakeIcon",
            "details": "Introduced in 1991"
        }
    },
    "ruby": {
        "title": "Ruby",
        "description": "A dynamic, open-source programming language focusing on simplicity and productivity, popular for web applications like Ruby on Rails.",
        "meta": {
            "icon": "DiamondIcon",
            "details": "Introduced in 1995"
        }
    },
    "c": {
        "title": "C",
        "description": "A foundational, low-level programming language known for its performance, often used in system programming and embedded systems.",
        "meta": {
            "icon": "ChipIcon",
            "details": "Introduced in 1972"
        }
    }
}
