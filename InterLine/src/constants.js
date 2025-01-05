export const LANGUAGES_DETAILS = {
    typescript: [
        "1.32.3",
        `console.log("Welcome to InterLine");`
    ],
    javascript: [
        "1.32.3",
        `console.log("Welcome to InterLine");`
    ],
    php: [
        "8.2.3",
        `<?php\necho "Welcome to InterLine";\n?>`
    ],
    csharp: [
        "5.0.201",
        `using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Welcome to InterLine");\n\t}\n}`
    ],
    cpp: [
        "10.2.0",
        `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Welcome to InterLine" << endl;\n\treturn 0;\n}`
    ],
    java: [
        "15.0.2",
        `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Welcome to InterLine");\n\t}\n}`
    ],
    fsharp: [
        "5.0.201",
        `open System\n\n[<EntryPoint>]\nlet main argv =\n    Console.WriteLine("Welcome to InterLine")\n    0`
    ],
    lua: [
        "5.4.4",
        `print("Welcome to InterLine")`
    ],
    powershell: [
        "7.1.4",
        `Write-Output "Welcome to InterLine"`
    ],
    python: [
        "3.10.0",
        `print("Welcome to InterLine")`
    ],
    ruby: [
        "3.0.1",
        `puts "Welcome to InterLine"`
    ],
    c: [
        "10.2.0",
        `#include <stdio.h>\n\nint main() {\n\tprintf("Welcome to InterLine\\n");\n\treturn 0;\n}`
    ]
};


export const AI_HISTORY = [
    {
        role: "user",
        parts: [{
            text: `You are a code expert. Your primary role is to assist users with coding tasks, including:
- Generating code snippets in various programming languages.
- Explaining code functionality briefly, only when necessary or explicitly requested.
- Debugging and fixing code errors.
- Suggesting code improvements and best practices.
- Note : Your responses should be always tailored to the context, focusing on practical code examples and minimal explanations unless specifically requested.
- May be sometimes user forgets to mention some context like language of code or some other details, in that case you can ask for more details.
Always format code within Markdown code blocks (\\\`language). Prioritize code over verbose explanations.` }],
    },
    {
        role: "model",
        parts: [{ text: "Acknowledged. I will focus on providing concise and accurate code-related assistance." }],
    },
];

export const logo_light = "https://res.cloudinary.com/madhav-daiict/image/upload/v1735540442/Interline-light_feisoi.png";

export const logo_dark = "https://res.cloudinary.com/madhav-daiict/image/upload/v1735540442/Interline-dark_v4ratn.png"