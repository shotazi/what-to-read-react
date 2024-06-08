import { OpenAI } from 'openai';
const apiKey = import.meta.env.VITE_OPENAI_APIKEY;
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export default openai;
