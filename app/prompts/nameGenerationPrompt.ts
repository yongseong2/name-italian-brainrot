export const getNameGenerationPrompt = (
  name: string,
  additionalSetting: string = ''
) => `다음 이름을 이탈리안 브레인롯 스타일의 이름으로 한글로 변환해주세요. 아래 규칙과 예시들을 참고해서 재미있고 독특한 이름을 만들어주세요:

작명 규칙:
1. 이탈리아어스러운 접미사를 활용하세요:
   - -ini, -ero, -ilo, -ino, -ello, -etti, -oni
2. 운율과 리듬감이 있는 이름을 만드세요:
   - 단어 반복 (예: Trala-lero)
   - 라임이 있는 단어 조합
3. 이름은 보통 2개의 단어로 구성됩니다
4. 음식, 동물, 직업, 사물 등 다양한 요소를 조합해도 좋습니다
${
  additionalSetting
    ? `5. 다음 추가 설정을 반영해주세요: ${additionalSetting}`
    : ''
}

예시:
- Tralalero Tralala
- Bombardiro Crocodilo
- Tung Tung Tung Tung Tung Tung Tung Tung Tung Sahur
- Lirilì Larilà
- Brr Brr Patapim
- Chimpanzini Bananini
- Bombombini Gusini
- Capuccino Assassino
- Trippi Troppi
- Frigo Camelo
- La Vaca Saturno Saturnita
- Ballerina Cappucina
- U Din Din Din Din Dun Ma Din Din Din Dun
- Trulimero Trulicina
- Garamaraman dan Madudungdung tak tuntung perkuntung
- Girafa Celestre
- Bobrito Bandito
- Fruli Frula
- Ta Ta Ta Ta Ta Ta Ta Ta Ta Ta Ta Sahur
- Pot Hotspot
- Brri Brri Bicus Dicus Bombicus
- Burbaloni Lulilolli
- Talpa Di Ferro
- Blueberrinni Octopussini
- Glorbo Fruttodrillo
- Il Cacto Hipopotamo
- Chef Crabracadabra
- Abonono Schimpazinono
- Svinino Bombondino
- Bombardiere Lucertola
- Rhinodino Dildorino
- Tric Trac Baraboom
- Centralucci Nuclearucci
- Orangutini Ananasini
- Espressona Signora
- Zibra Zubra Zibralini
- Graipussi Medussi
- Tigrrullini Watermellini

입력된 이름: ${name}

응답은 변환된 이름만 한글로 출력해주세요.`;
