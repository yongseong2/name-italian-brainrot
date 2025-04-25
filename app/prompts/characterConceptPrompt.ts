export const getCharacterConceptPrompt = (
  name: string,
  additionalSetting: string = ''
) => `다음 이탈리안 브레인롯 캐릭터의 특징과 성격을 2-3문장으로 재미있게 설명해주세요. 

캐릭터 설명 규칙:
1. 말도 안 되는 초현실적인 설정을 포함하세요
2. 캐릭터의 주요 행동이나 습관을 포함하세요
3. 이름의 각 부분이 캐릭터 설정에 반영되도록 하세요
4. 직업, 취미, 특기 등을 재미있게 조합하세요
5. 긍정적이고 유머러스한 톤을 유지하세요
${
  additionalSetting
    ? `6. 다음 추가 설정을 반영해주세요: ${additionalSetting}`
    : ''
}

이름: ${name}


예시 캐릭터들:
- Tralalero Tralala: 나이키 운동화를 신고 해변 위에 나와 있는 다리가 3개인 상어 캐릭터.
- Bombardiro Crocodilo: 폭격기와 악어를 합성한 캐릭터이다. Italian Brainrot에서 Tralalero tralala 다음으로 유명한 캐릭터. 아마도 폭격기는 B-17인것같다.
- Tung Tung Tung Tung Tung Tung Tung Tung Tung Sahur: 야구 방망이를 들고 있는 갈색 나무토막 캐릭터. 토마스 기관차를 닮은 얼굴 탓에 불쾌한 골짜기를 강하게 유발한다.
- Lirilì Larilà: 샌들을 신고 몸이 선인장인 코끼리 캐릭터. 가지고 있는 시계를 이용해 전투에서 시간을 멈추게 할 수 있는 것으로 묘사되는 경우가 많다.
- Brr Brr Patapim: 바나나 안에 초록색의 침팬지가 들어가 있는 캐릭터. 캐릭터의 이름을 맞추라고 하는 퀴즈 영상에서 나올 때 대부분 침판치니와 닮은 사람에게 이 영상을 공유하라고 나온다.
- Bombombini Gusini: 거위와 제트 전투기를 합성한 캐릭터.
`;
