'use client';

import { useEffect } from 'react';
import { BACKGROUND_IMAGES } from '../constants/images';
import { kakaoShare } from '../utils/kakaoShare';

const ShareButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const share = () => {
    const randomImage =
      BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];

    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendDefault({
        ...kakaoShare(
          'https://italian-brainrot-genertaor.vercel.app' + randomImage
        ),
      });
    } else {
      console.error('Kakao SDK is not loaded properly');
    }
  };

  return (
    <button
      onClick={share}
      className='absolute top-4 right-4 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-50'
      aria-label='공유하기'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-6 h-6'
      >
        <path
          fillRule='evenodd'
          d='M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  );
};

export default ShareButton;
