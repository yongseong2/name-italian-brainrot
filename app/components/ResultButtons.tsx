import React, { useEffect, useState } from 'react';
import { shareResult } from '../utils/resultShare';

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
  const [kakaoImageUrl, setKakaoImageUrl] = useState<string | null>(null);

  const kakaoUploadImage = async (imageUrl: string) => {
    try {
      // 이미지를 base64로 변환하는 함수
      const getBase64FromUrl = async (url: string): Promise<string> => {
        const img = document.createElement('img');
        img.crossOrigin = 'anonymous';

        return new Promise((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
          };

          img.onerror = () => {
            reject(new Error('Failed to load image'));
          };

          // CORS 우회를 위한 프록시 URL 사용
          const proxyUrl =
            '/api/proxy-image?url=' + encodeURIComponent(imageUrl);
          img.src = proxyUrl;
        });
      };

      // 이미지를 base64로 변환
      const base64Data = await getBase64FromUrl(imageUrl);

      // base64 데이터를 Blob으로 변환
      const byteString = atob(base64Data.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: 'image/png' });

      // Blob을 File 객체로 변환
      const file = new File([blob], 'character.png', { type: 'image/png' });

      const kakao = window.Kakao;
      if (kakao && !kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }

      const result = await kakao.Share.uploadImage({
        file: [file],
      });

      return result.infos.original.url;
    } catch (error) {
      console.error('Failed to upload image to Kakao:', error);
      return null;
    }
  };

  const handleShare = async () => {
    try {
      if (window.Kakao && window.Kakao.Share) {
        // 이미지를 Kakao 서버에 업로드
        const uploadedImageUrl = await kakaoUploadImage(imageUrl);
        if (!uploadedImageUrl) {
          throw new Error('Failed to upload image to Kakao');
        }

        const shareData = await shareResult({
          name,
          imageUrl: uploadedImageUrl,
          italianName,
          character,
        });

        window.Kakao.Share.sendDefault(shareData);
      } else {
        console.error('Kakao SDK is not loaded properly');
      }
    } catch (error) {
      console.error('Failed to share:', error);
      alert('공유하기에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
