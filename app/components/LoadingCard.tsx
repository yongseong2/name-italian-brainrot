import React from 'react';

type LoadingCardProps = {
  type: 'name' | 'character' | 'image';
};

const LoadingCard = ({ type }: LoadingCardProps) => {
  const getLoadingMessage = () => {
    switch (type) {
      case 'name':
        return '✨ 당신의 이탈리안 브레인롯 이름을 생성하고 있어요...';
      case 'character':
        return '🎭 캐릭터의 매력적인 설정을 구상하고 있어요...';
      case 'image':
        return '🎨 상상 속 캐릭터를 그림으로 만들고 있어요... 페이지를 벗어나면 다시 시작해야 해요.';
      default:
        return '로딩중...';
    }
  };

  return (
    <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 mb-6 mt-6'>
      <div className='flex items-center justify-center'>
        <div className='text-center'>
          <div className='flex items-center justify-center mb-4'>
            <div className='w-6 h-6 border-4 border-pink-500 border-t-transparent rounded-full animate-spin'></div>
          </div>
          <p className='text-gray-700 font-medium text-lg'>
            {getLoadingMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
