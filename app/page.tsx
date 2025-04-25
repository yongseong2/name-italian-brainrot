'use client';

import { useState, useEffect } from 'react';
import { BackgroundImage } from './types/types';
import { BACKGROUND_IMAGES } from './constants/images';
import {
  convertToItalian,
  generateCharacterConcept,
  generateItalianBrainrotImage,
} from './services/openaiService';
import { ResultCard } from './components/ResultCard';
import ShareButton from './components/ShareButton';
import LoadingCard from './components/LoadingCard';
import ResultButtons from './components/ResultButtons';

function App() {
  const [name, setName] = useState('');
  const [italianName, setItalianName] = useState('');
  const [character, setCharacter] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<
    'name' | 'character' | 'image' | null
  >(null);
  const [error, setError] = useState('');
  const [additionalSetting, setAdditionalSetting] = useState('');
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
      setLoadingStage('name');
      const convertedName = await convertToItalian(name);
      setItalianName(convertedName);

      setLoadingStage('character');
      const concept = await generateCharacterConcept(
        convertedName,
        additionalSetting
      );
      setCharacter(concept);

      setLoadingStage('image');
      const imageUrl = await generateItalianBrainrotImage(
        convertedName,
        concept
      );
      setGeneratedImage(imageUrl);
    } catch (error: any) {
      console.error('Error:', error);
      if (error?.response?.data?.error?.type === 'insufficient_quota') {
        setError('비용이 부족합니다.');
      } else {
        setError('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
      setLoadingStage(null);
    }
  };

  const handleReset = () => {
    setName('');
    setItalianName('');
    setCharacter('');
    setGeneratedImage('');
    setError('');
    setLoading(false);
    setLoadingStage(null);
    setAdditionalSetting('');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <main
        className={`flex-grow bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 ${
          !italianName ? 'h-screen' : ''
        }`}
      >
        <ShareButton />
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt='background decoration'
            className='fixed size-[150px] md:size-[300px] lg:size-[500px] object-contain z-[1] opacity-70 pointer-events-none filter drop-shadow-lg animate-float'
            style={{
              ...img.style,
            }}
          />
        ))}

        <div
          className={`w-full max-w-[600px] mx-auto px-1 relative z-10 transition-all duration-700 ease-in-out ${
            !italianName ? 'h-full flex items-center justify-center' : 'py-10'
          }`}
        >
          <div className='w-full'>
            <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 mb-6 relative'>
              <h1 className='text-xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] bg-clip-text text-transparent animate-bounce-slow text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer select-none'>
                🎪 이탈리안 브레인롯 생성기 🎪
              </h1>

              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\s/g, '')
                      .slice(0, 20);
                    setName(value);
                  }}
                  placeholder='✨ 당신의 이름을 입력해주세요. (최대 20글자) ✨'
                  className='w-full px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base border-3 border-dashed rounded-2xl bg-white/90 transition-all duration-300 ease-in-out animate-rainbow-border'
                  required
                  maxLength={20}
                />

                <div className='relative'>
                  <textarea
                    value={additionalSetting}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 100);
                      setAdditionalSetting(value);
                    }}
                    placeholder='✨ (선택사항) 원하는 캐릭터 설정을 추가로 입력해주세요. 예시) 트랄라레로 트랄랄라, 봄바르디로 코르코딜로 느낌낌 등'
                    className='w-full px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base border-3 border-dashed rounded-2xl bg-white/90 transition-all duration-300 ease-in-out min-h-[100px] resize-none'
                    maxLength={100}
                  />
                  <span className='absolute bottom-2 right-3 text-xs text-gray-500'>
                    {additionalSetting.length}/100
                  </span>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed animate-wiggle'
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

            {loading && (
              <>
                {loadingStage === 'name' && <LoadingCard type='name' />}
                {loadingStage === 'character' && (
                  <>
                    <ResultCard
                      title='당신의 이탈리안 브레인롯 이름'
                      content={italianName}
                      emoji='✨'
                    />
                    <LoadingCard type='character' />
                  </>
                )}
                {loadingStage === 'image' && (
                  <>
                    <ResultCard
                      title='당신의 이탈리안 브레인롯 이름'
                      content={italianName}
                      emoji='✨'
                    />
                    <ResultCard
                      title='캐릭터 설정'
                      content={character}
                      emoji='🎭'
                    />
                    <LoadingCard type='image' />
                  </>
                )}
              </>
            )}

            {!loading && italianName && character && generatedImage && (
              <>
                <ResultCard
                  title='당신의 이탈리안 브레인롯 이름'
                  content={italianName}
                  emoji='✨'
                />
                <ResultCard
                  title='캐릭터 설정'
                  content={character}
                  emoji='🎭'
                />
                <ResultCard
                  title='캐릭터 이미지'
                  content={generatedImage}
                  emoji='🎨'
                  isImage
                />
                <ResultButtons
                  name={name}
                  italianName={italianName}
                  character={character}
                  imageUrl={generatedImage}
                  onReset={handleReset}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <footer className='absolute bottom-2 md:bottom-4 right-2 md:right-4 text-[10px] md:text-sm text-gray-600 font-bold z-50'>
        © Copyright 2025 Kim Seong Yong All rights reserved.
      </footer>
    </div>
  );
}

export default App;
