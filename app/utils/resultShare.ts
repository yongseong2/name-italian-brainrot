interface ShareResultContent {
  imageUrl: string;
  italianName: string;
  character: string;
}

export const shareResult = ({
  imageUrl,
  italianName,
  character,
}: ShareResultContent) => {
  return {
    objectType: 'feed',
    content: {
      title: '🎭 나의 이탈리안 브레인롯 캐릭터를 소개합니다! 🎭',
      imageUrl: imageUrl,
      description: `${italianName}\n\n${character}`,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    },
    buttons: [
      {
        title: '나도 캐릭터 만들기',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    ],
  };
};
