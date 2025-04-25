export const initializeKakao = () => {
  try {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      console.log('Kakao SDK loaded');
    };
    script.onerror = (error) => {
      console.error('Failed to load Kakao SDK:', error);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  } catch (error) {
    console.error('Error initializing Kakao:', error);
  }
};

export const shareKakao = (imageUrl: string) => {
  try {
    if (!window.Kakao) {
      console.error('Kakao SDK not loaded');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      if (!import.meta.env.VITE_KAKAO_KEY) {
        console.error('Kakao API key not found');
        return;
      }
      window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      console.log('Kakao SDK initialized');
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '🎪 나의 이탈리안 브레인롯 캐릭터 🎪',
        description: '이탈리안 브레인롯 캐릭터로 변신해보세요!',
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '나도 변신하기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Error sharing to Kakao:', error);
  }
};
