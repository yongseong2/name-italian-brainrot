import { useState, useEffect } from 'react';
import { BackgroundImage } from './types/types';
import { BACKGROUND_IMAGES } from './constants/images';
import {
  convertToItalian,
  generateCharacterConcept,
  generateItalianBrainrotImage,
} from './services/openaiService';
import { ResultCard } from './components/ResultCard';

function App() {
  const [name, setName] = useState('');
  const [italianName, setItalianName] = useState('');
  const [character, setCharacter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>(
    []
  );
  const [generatedImage, setGeneratedImage] = useState<string>('');

  useEffect(() => {
    const randomizedImages = BACKGROUND_IMAGES.map((src) => ({
      src,
      style: {
        top: `${Math.random() * 80}vh`,
        left: `${Math.random() * 80}vw`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }));

    setBackgroundImages(randomizedImages);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const convertedName = await convertToItalian(name);
      setItalianName(convertedName);
      const concept = await generateCharacterConcept(convertedName);
      setCharacter(concept);
      const imageUrl = await generateItalianBrainrotImage(
        convertedName,
        concept
      );
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 relative pt-4 overflow-y-auto'>
      {backgroundImages.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt='background decoration'
          className='fixed size-[150px] md:size-[300px] lg:size-[500px] object-contain z-0 opacity-70 pointer-events-none filter drop-shadow-lg animate-float'
          style={{
            ...img.style,
          }}
        />
      ))}

      <div
        className={`w-full max-w-[600px] mx-auto px-1 relative z-10 transition-all duration-700 ease-in-out ${
          !italianName ? 'min-h-screen flex flex-col justify-center' : 'pt-4'
        }`}
      >
        <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 mb-6'>
          <h1 className='text-2xl md:text-3xl font-extrabold mb-4 font-comic bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] bg-clip-text text-transparent animate-bounce-slow text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer select-none'>
            🎪 이탈리안 브레인롯 생성기 🎪
          </h1>

          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
              placeholder='✨ 당신의 이름을 입력해주세요. ✨'
              className='w-full px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base border-3 border-dashed rounded-2xl bg-white/90 transition-all duration-300 ease-in-out font-comic animate-rainbow-border'
              required
            />

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed font-comic animate-wiggle'
            >
              {loading
                ? '🌈 마법 시전 중... 🌈'
                : '🎭 이탈리안 브레인롯 변신! 🎭'}
            </button>
          </form>
        </div>

        {error && (
          <div className='mt-4 p-4 bg-red-100 text-red-700 rounded-lg animate-bounce-custom'>
            {error}
          </div>
        )}

        {italianName && (
          <ResultCard
            title='당신의 이탈리안 브레인롯 이름'
            content={italianName}
            gradientFrom='pink-500'
            gradientTo='purple-500'
            emoji='✨'
          />
        )}

        {character && (
          <ResultCard
            title='캐릭터 설정'
            content={character}
            gradientFrom='blue-500'
            gradientTo='teal-500'
            emoji='🎭'
          />
        )}

        {generatedImage && (
          <ResultCard
            title='캐릭터 이미지'
            content={generatedImage}
            gradientFrom='green-500'
            gradientTo='blue-500'
            emoji='🎨'
            isImage
          />
        )}
      </div>
    </div>
  );
}

export default App;
