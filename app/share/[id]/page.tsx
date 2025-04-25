'use client';

import { ShareData } from '@/app/services/types';
import { BACKGROUND_IMAGES } from '@/app/constants/images';
import { BackgroundImage } from '@/app/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getShareData } from '@/app/services/shareService';
import Loading from '../loading';
interface SharePageProps {
  params: {
    id: string;
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const [data, setData] = useState<ShareData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await getShareData(params.id);
      setData(data);
    } catch (error) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  if (error) {
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

  // 배경 이미지 스타일 생성
  const backgroundImages: BackgroundImage[] = BACKGROUND_IMAGES.map((src) => ({
    src,
    style: {
      top: `${Math.random() * 80}vh`,
      left: `${Math.random() * 80}vw`,
      transform: `rotate(${Math.random() * 360}deg)`,
    },
  }));

  return (
    <div className='relative min-h-screen'>
      <main className='bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-10 min-h-screen'>
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt='background decoration'
            className='fixed size-[150px] md:size-[300px] lg:size-[500px] object-contain z-[1] opacity-70 pointer-events-none filter drop-shadow-lg animate-float'
            style={img.style}
          />
        ))}

        <div className='w-full max-w-[600px] mx-auto px-4 relative z-10'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 mb-6'>
            <h1 className='text-xl md:text-3xl font-extrabold bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] bg-clip-text text-transparent text-center'>
              🎭 이탈리안 브레인롯 캐릭터 🎭
            </h1>
          </div>

          <div className='space-y-6'>
            <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex flex-col gap-4'>
              <div>
                <h2 className='text-lg font-bold mb-2'>✨ 원본 이름</h2>
                <p className='text-gray-700'>{data.name}</p>
              </div>
              <div>
                <h2 className='text-lg font-bold mb-2'>✨ 캐릭터 이름</h2>
                <p className='text-gray-700'>{data.italianName}</p>
              </div>
            </div>

            <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6'>
              <h2 className='text-lg font-bold mb-2'>🎭 캐릭터 설정</h2>
              <p className='text-gray-700'>{data.character}</p>
            </div>

            <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6'>
              <h2 className='text-lg font-bold mb-2'>🎨 캐릭터 이미지</h2>
              <div className='relative aspect-square w-full'>
                <img
                  src={data.imageUrl}
                  alt={data.italianName}
                  className='rounded-lg w-full h-full object-cover'
                />
              </div>
            </div>
          </div>

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
