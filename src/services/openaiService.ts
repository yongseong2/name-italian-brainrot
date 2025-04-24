import axios from 'axios';

export const convertToItalian = async (name: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `다음 이름을 이탈리안 브레인롯 스타일의 이름으로 한글로 변환해주세요. 아래 예시들을 참고해서 재미있고 독특한 이름을 만들어주세요:

예시:
- Tralalero Tralala
- Bombardiro Crocodilo
- Boneca Ambalabu
- Chimpanzini Bananini
- Capuccino Assassino
- Burbaloni Lulilolli
- Chef Crabracadabra
- Rhinodino Dildorino

입력된 이름: ${name}

응답은 변환된 이름만 한글로 출력해주세요.`,
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
            content: `다음 이탈리안 브레인롯 캐릭터의 특징과 성격을 2-3문장으로 재미있게 설명해주세요. 이름: ${name}

예시 캐릭터들:
- Tralalero Tralala: 노래하는 것을 좋아하는 마법사
- Bombardiro Crocodilo: 폭탄을 던지는 것이 취미인 악어
- Chimpanzini Bananini: 바나나로 마술을 부리는 침팬지
- Capuccino Assassino: 커피를 독살자처럼 정확하게 내리는 바리스타`,
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
    const prompt = `Create a 1:1 image of a surreal character fusion: ${characterName}, ${characterDescription}. The base of the character's body should be an everyday object or vehicle, with character features growing out of it in unexpected ways. Use 3d realistic style with high detail, professional lighting, and clean composition. The character should look absurd but believable, like a high-quality 3D render.`;

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
