export const getImageGenerationPrompt = (
  characterName: string,
  characterDescription: string,
  additionalSetting: string = ''
) => `Create a 1:1 surreal character image in Italian Brainrot style with these specific requirements:

Character Design Rules:
1. Base: Start with an everyday object, food item, or vehicle as the main body
2. Fusion Elements: Add unexpected character features growing from the base (e.g. animal parts, human limbs, exaggerated accessories)
3. Surreal Touches:
   - Impossible but believable proportions
   - Whimsical or contrasting color combinations
   - Absurd but harmonized object-animal fusions (like a crocodile-headed airplane or a shark wearing sneakers)
4. Expression: The character should have a friendly, comedic, or slightly mischievous expression
5. Use appropriate backgrounds for character images without adding descriptive text

${additionalSetting ? `6. Additional Setting: ${additionalSetting}` : ''}

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
