import { getModel } from "../config/llmModels.js"

export const codingAgent = async (state) => {
   const intentLlm = await getModel("intent")
   // FIXED: Added quotes around "coding" to prevent a reference error
   const llm = await getModel("coding") 
   
   const intentRes = await intentLlm.invoke(`
    Rules:
    - Output must start with {
    - Output must end with }
    - No markdown
    - No explanation
    - No extra text
    - No \`\`\`
    - Never mention intent

    Allowed Categories:
    "CODE_GENERATION", "CODE_REVIEW", "CODE_EXPLANATION", "DEBUGGING", "OPTIMIZATION", "CONVERSION", "DOCUMENTATION"

    Expected JSON Format Example:
    {"category": "CODE_GENERATION"}

    User Request:
    ${state.prompt}
    `)
    
    // Clean and parse the intent response to extract the intent string cleanly
    let intent = intentRes.content.replace(/[\`'"\n\r]/g, '').trim();
    try {
        const parsedIntent = JSON.parse(intent);
        intent = parsedIntent.category || parsedIntent.intent || intent;
    } catch (e) {
        // Fallback matching if JSON parsing fails but the raw string contains the enum
        if (intent.includes("CODE_GENERATION")) intent = "CODE_GENERATION";
    }

    if (intent === "CODE_GENERATION") {
        const prompt = `
 You are a Agenyx Coding Agent.
 Generate the requested project
 
 Default stack:
 -HTML
 -CSS
 -Javascript

 Use React/Next.js/Vue ONLY if explicitly requested.

 Rules:
 -Responsive
 -Modern UI
 -CSS Variables
 -Flexbox/Grid
 -Smooth Scroll
 -Hover Effects
 -Beautiful spacing
 -Single page unless user asks otherwise
 Return ONLY valid JSON

 Schema:
 {
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}
    Rules:
    - Output must start with {
    - Output must end with }
    - No markdown
    - No explanation
    - No extra text
    - No \`\`\`
    - Never mention intent

    User Request:
    ${state.prompt}
        `
        const res = await llm.invoke(prompt)
        console.log(JSON.parse(res.content));

        return {
            ...state,
            aiResponse:"Code Generated Suceessfully.",
            artifacts:[
                {
                    id:Date.now(),
                    type:"Project",
                    files:data.files || [],
                    title:state.prompt
                }
            ]
        }
     
    }

    const res = await llm.invoke(`
        The user's request is:
        ${intent}

        Return Markdown only.
        Never generate project files.
        Use headings like:

        #Overview
        ## Explanation
        ## Problems
        ## Improvement
        ## Best Practices
        ## Optimized Code (if needed)
        
        User Request:
        
        ${state.prompt}
        `)

        const data =res.content
        return {
            ...state,
            aiResponse:data,
            artifacts:[ ]
        }
}

