import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Convert this from C to Java #include <stdio.h> int main() { printf(Hello, world!\n); return 0; }" }],
        model: "gpt-3.5-turbo",

    });

    console.log(completion.choices[0]);
}

main()