import OpenAI from "openai";
import OPENAI_KEY from "/src/utils/constants.js"; // Ensure this path is correct

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
});

export default openai;
