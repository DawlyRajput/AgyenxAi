import { TavilySearch } from "@langchain/tavily";
 

// search the data from internet 
export const searchTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
  includeImages:true
});