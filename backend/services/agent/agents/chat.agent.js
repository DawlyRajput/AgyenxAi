// import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
// import { getModel } from "../config/llmModels.js"
// import { getMemory } from "../config/memory.js"

// export const chatAgent=async(state)=>{
//     const llm = await getModel("coding")

//     const history = await getMemory(state.conversationId)
   
//     const searchContext = state.searchResults?
//     `Web Search Results:
//     ${JSON.stringify(state.searchResults )  }
//     Answer the user using only the above search results.
//     `
// :""

//     const  systemPrompt =
//     `YOU are agyenx , an intelligent AI assistant

//     ${searchContext}
    
//     If searchContext exists:
//     -use search results to answer.
//     -Do not mention internal tools.

//     Rules:
//     -For simple questions, greetings, and short queries, respond naturally in plain text.
//     -for technical , educational, coding or detailed topics,use clean Markdown

//  formatting:

//   - Use Markdown formatting. 
//   - Use # for the main title. 
//   - Use ## for major sections.
//    - Use ### for subsections when necessary. 
//    - Use bullet points (-) for lists. 
//    - Use numbered lists (1., 2., 3.) for sequential steps.
//     - Use **bold** for important words or concepts.
//      - Use \`inline code\` for variables, functions, commands, and file names. 
//      - Use code blocks with the appropriate language for code.
//       - Keep paragraphs short and readable.
//        - Leave a blank line between sections. 
//        - Do not create unnecessary headings for very short answers.
//        `
//     const messages=[
//         new SystemMessage(systemPrompt)
//     ]
//     history.forEach(msg =>{
//         if(msg.role=="user"){
//               messages.push(new HumanMessage(msg.content))
//         }else{
//             messages.push(new AIMessage(msg.content))
//         }
//     });

//     messages.push(new HumanMessage(state.prompt))
//     // console.log(messages)
 


//        const response= await llm.invoke(
//         messages
//     //     [
//     //     {
//     //         "role":"system",
//     //         "content": systemPrompt

//     //     },
//     //     {
//     //         "role":"human",
//     //         "content":state.prompt
//     //     }
//     // ]
// )

//     return {
//         ...state,
//         aiResponse:response.content,
//     }
// }


import {
    AIMessage,
    HumanMessage,
    SystemMessage
} from "@langchain/core/messages";

import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (state) => {

    console.log("CHAT AGENT STATE:", state);

    const llm = await getModel("chat");

    const history = await getMemory(state.conversationId) || [];

    const searchContext =
        state.searchResults && state.searchResults.length > 0
            ? `
Web Search Results:
${JSON.stringify(state.searchResults)}

Use the search results to answer the user's question.
Do not mention internal tools.
`
            : "";

    const systemPrompt = `
You are Agenyx, an intelligent AI assistant.

${searchContext}

Rules:

- For simple questions, greetings, and short queries, respond naturally.
- For technical, educational, coding, or detailed topics, use clean Markdown.
- Use # for the main title when a title is useful.
- Use ## for major sections.
- Use ### for subsections when necessary.
- Use bullet points for lists.
- Use numbered lists for sequential steps.
- Use **bold** for important concepts.
- Use \`inline code\` for variables, functions, commands, and file names.
- Use code blocks with the appropriate programming language.
- Keep paragraphs short and readable.
- Leave a blank line between sections.
- Do not create unnecessary headings for very short answers.
`;

    const messages = [
        new SystemMessage(systemPrompt)
    ];

    history.forEach((msg) => {

        if (msg.role === "user") {
            messages.push(
                new HumanMessage(msg.content)
            );
        }

        else if (msg.role === "assistant") {
            messages.push(
                new AIMessage(msg.content)
            );
        }
    });

    messages.push(
        new HumanMessage(state.prompt)
    );

    console.log("MESSAGES SENT TO LLM:", messages);

    const response = await llm.invoke(messages);

    console.log("LLM RESPONSE:", response);

    return {
        ...state,
        aiResponse: response.content
    };
};