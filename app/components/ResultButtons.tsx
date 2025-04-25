import React from 'react';
import { shareResult } from '../utils/resultShare';
import { useEffect } from 'react';
interface ResultButtonsProps {
  name: string;
  italianName: string;
  character: string;
  imageUrl: string;
  onReset: () => void;
}

const ResultButtons = ({
  name,
  italianName,
  character,
  imageUrl,
  onReset,
}: ResultButtonsProps) => {
  const handleShare = () => {
    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendDefault({
        ...shareResult({
          name,
          imageUrl,
          italianName,
          character,
        }),
      });
    } else {
      console.error('Kakao SDK is not loaded properly');
    }
  };

  return (
    <div className='flex flex-col sm:flex-row gap-3 justify-center mt-8 mb-4'>
      <button
        onClick={handleShare}
        className='px-6 py-3 bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
      >
        🎭 내 캐릭터 자랑하기
      </button>
      <button
        onClick={onReset}
        className='px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-dashed border-gray-300'
      >
        ✨ 새로운 캐릭터 만들기
      </button>
    </div>
  );
};

export default ResultButtons;
