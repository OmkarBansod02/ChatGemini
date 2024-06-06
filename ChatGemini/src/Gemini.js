
import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = "AIzaSyCPEoUeTvLVDkdQPz1Ki4yS77W8q3yQR9I";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  




export async function sendMsgTogoogleAi(message){
    const res = model.startChat({
        prompt: message,
        maxTokens: 256,
        temperature:0.9,
        top_p:1,
        frequency_penalty:0,
        presense_penalty:0,
    });

  
    const result = await res.sendMessage(message);
 
   
    return result.response.text();
  
}

