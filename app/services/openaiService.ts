import axios from 'axios';
import { getNameGenerationPrompt } from '../prompts/nameGenerationPrompt';
import { getCharacterConceptPrompt } from '../prompts/characterConceptPrompt';
import { getImageGenerationPrompt } from '../prompts/imageGenerationPrompt';

export const convertToItalian = async (name: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: getNameGenerationPrompt(name),
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const generateCharacterConcept = async (
  name: string,
  additionalSetting: string
) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: getCharacterConceptPrompt(name, additionalSetting),
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const generateItalianBrainrotImage = async (
  characterName: string,
  characterDescription: string
) => {
  try {
    const prompt = getImageGenerationPrompt(
      characterName,
      characterDescription
    );

    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
