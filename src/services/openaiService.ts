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
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('이름 변환 중 오류가 발생했습니다.');
  }
};

export const generateCharacterConcept = async (name: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: getCharacterConceptPrompt(name),
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('캐릭터 컨셉 생성 중 오류가 발생했습니다.');
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
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('이미지 생성 중 오류가 발생했습니다.');
  }
};
