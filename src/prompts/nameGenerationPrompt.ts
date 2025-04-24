export const getNameGenerationPrompt = (
  name: string
) => `다음 이름을 이탈리안 브레인롯 스타일의 이름으로 한글로 변환해주세요. 아래 규칙과 예시들을 참고해서 재미있고 독특한 이름을 만들어주세요:

작명 규칙:
1. 이탈리아어스러운 접미사를 활용하세요:
   - -ini, -ero, -ilo, -ino, -ello, -etti, -oni
2. 운율과 리듬감이 있는 이름을 만드세요:
   - 단어 반복 (예: Trala-lero)
   - 라임이 있는 단어 조합
3. 이름은 보통 2개의 단어로 구성됩니다
4. 음식, 동물, 직업, 사물 등 다양한 요소를 조합해도 좋습니다

예시:
- Tralalero Tralala (음악적 요소)
- Bombardiro Crocodilo (동물 + 행동)
- Boneca Ambalabu (인형 + nonsense)
- Chimpanzini Bananini (동물 + 음식)
- Capuccino Assassino (음식 + 직업)
- Burbaloni Lulilolli (nonsense + nonsense)
- Chef Crabracadabra (직업 + 말장난)
- Rhinodino Dildorino (동물 합성 + 운율)
- Pizzini Mozzaretti (음식 + 음식)
- Spaghettero Bandito (음식 + 캐릭터)

입력된 이름: ${name}

응답은 변환된 이름만 한글로 출력해주세요.`;
