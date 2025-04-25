'use client';

import { useSearchParams } from 'next/navigation';
import { decodeShareData } from '../utils/urlParams';
import { ResultCard } from '../components/ResultCard';
import Link from 'next/link';
import { BACKGROUND_IMAGES } from '../constants/images';
import { Suspense, useEffect, useState } from 'react';
import { BackgroundImage } from '../types/types';

function SharePageContent() {
  const searchParams = useSearchParams();
  const { italianName, character, imageUrl } = decodeShareData(searchParams);
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>(
    []
  );

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

  if (!italianName || !character || !imageUrl) {
    return (
      <div className='relative min-h-screen'>
        <main className='bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center min-h-screen'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 max-w-md mx-4 text-center'>
            <h1 className='text-2xl font-bold mb-4 text-gray-800'>
              😅 잘못된 접근이에요!
            </h1>
            <p className='text-gray-600 mb-6'>
              올바른 공유 링크가 아니거나 만료된 것 같아요.
            </p>
            <Link
              href='/'
              className='px-6 py-3 bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block'
            >
              ✨ 나도 캐릭터 만들러 가기
            </Link>
          </div>
        </main>
        <footer className='absolute bottom-2 md:bottom-4 right-2 md:right-4 text-[10px] md:text-sm text-gray-600 font-bold z-50'>
          © Copyright 2025 Kim Seong Yong All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen'>
      <main className='bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-10 min-h-screen'>
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

        <div className='w-full max-w-[600px] mx-auto px-4 relative z-10'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 mb-6'>
            <h1 className='text-xl md:text-3xl font-extrabold bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] bg-clip-text text-transparent text-center'>
              🎭 이탈리안 브레인롯 캐릭터 🎭
            </h1>
          </div>

          <ResultCard title='캐릭터 이름' content={italianName} emoji='✨' />
          <ResultCard title='캐릭터 설정' content={character} emoji='🎭' />
          <ResultCard
            title='캐릭터 이미지'
            content={imageUrl}
            emoji='🎨'
            isImage
          />

          <div className='flex justify-center mt-8'>
            <Link
              href='/'
              className='px-6 py-3 bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
            >
              ✨ 나도 캐릭터 만들러 가기
            </Link>
          </div>
        </div>
      </main>
      <footer className='absolute bottom-2 md:bottom-4 right-2 md:right-4 text-[10px] md:text-sm text-gray-600 font-bold z-50'>
        © Copyright 2025 Kim Seong Yong All rights reserved.
      </footer>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SharePageContent />
    </Suspense>
  );
}
