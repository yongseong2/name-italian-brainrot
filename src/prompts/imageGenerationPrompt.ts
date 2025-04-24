export const getImageGenerationPrompt = (
  characterName: string,
  characterDescription: string
) => `Create a 1:1 surreal character image in Italian Brainrot style with these specific requirements:

Character Design Rules:
1. Base: Start with an everyday object, food item, or vehicle as the main body
2. Fusion Elements: Add unexpected character features growing from the base
3. Italian Aesthetic: Include subtle Italian-inspired elements (e.g. pasta details, pizza patterns, Italian colors)
4. Surreal Touches:
   - Impossible but believable proportions
   - Whimsical color combinations
   - Unexpected object combinations
5. Expression: The character should have a friendly, comedic expression

Technical Requirements:
- Style: Hyper-realistic 3D render
- Quality: High detail with professional lighting
- Composition: Clean, centered, with character clearly visible
- Background: Simple but complementary background
- Aspect Ratio: 1:1 square format

Character Details:
Name: ${characterName}
Description: ${characterDescription}

The final image should be both absurd and charming, maintaining a playful and positive tone typical of Italian Brainrot memes.`;
