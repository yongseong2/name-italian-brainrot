export const kakaoShare = (imageUrl: string) => {
  return {
    objectType: 'feed',
    content: {
      title: '🎪이탈리안 브레인롯 캐릭터를 만들어보세요!🎪',
      imageUrl: imageUrl,
      description: '내 이름을 AI가 캐릭터로 변신시켜줍니다',
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
