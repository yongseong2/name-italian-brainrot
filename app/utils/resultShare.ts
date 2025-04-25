import { encodeShareData } from './urlParams';

interface ShareResultContent {
  imageUrl: string;
  italianName: string;
  character: string;
  name: string;
}

export const shareResult = ({
  imageUrl,
  italianName,
  character,
  name,
}: ShareResultContent) => {
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/share?${encodeShareData({
    name,
    italianName,
    character,
    imageUrl,
  })}`;

  return {
    objectType: 'feed',
    content: {
      title: '🎭 나의 이탈리안 브레인롯 캐릭터를 소개합니다! 🎭',
      imageUrl: imageUrl,
      description: `${italianName}`,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: '캐릭터 자세히 보기',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      {
        title: '나도 캐릭터 만들기',
        link: {
          mobileWebUrl: baseUrl,
          webUrl: baseUrl,
        },
      },
    ],
  };
};
