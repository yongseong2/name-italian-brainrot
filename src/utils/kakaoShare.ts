export const kakaoShare = (
  imageUrl: string
): {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
} => {
  return {
    objectType: 'feed',
    content: {
      title: '🎪 이탈리안 브레인롯 캐릭터를 만들어보세요! 🎪',
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
  };
};
