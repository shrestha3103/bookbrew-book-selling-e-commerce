'use server';

/**
 * @fileOverview Provides personalized book recommendations based on user history.
 *
 * - getPersonalizedBookRecommendations - A function that returns personalized book recommendations.
 * - PersonalizedBookRecommendationsInput - The input type for the getPersonalizedBookRecommendations function.
 * - PersonalizedBookRecommendationsOutput - The return type for the getPersonalizedBookRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBookRecommendationsInputSchema = z.object({
  browsingHistory: z.array(z.string()).describe('List of book titles the user has browsed.'),
  purchaseHistory: z.array(z.string()).describe('List of book titles the user has purchased.'),
  wishlist: z.array(z.string()).describe('List of book titles currently in the user\'s wishlist.'),
});
export type PersonalizedBookRecommendationsInput = z.infer<
  typeof PersonalizedBookRecommendationsInputSchema
>;

const PersonalizedBookRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('List of recommended book titles.'),
});
export type PersonalizedBookRecommendationsOutput = z.infer<
  typeof PersonalizedBookRecommendationsOutputSchema
>;

export async function getPersonalizedBookRecommendations(
  input: PersonalizedBookRecommendationsInput
): Promise<PersonalizedBookRecommendationsOutput> {
  return personalizedBookRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBookRecommendationsPrompt',
  input: {schema: PersonalizedBookRecommendationsInputSchema},
  output: {schema: PersonalizedBookRecommendationsOutputSchema},
  prompt: `You are a book recommendation expert. Based on the user's provided browsing history, purchase history, and wishlist, recommend books that the user might be interested in.  Do not recommend books already present in the user's history or wishlist.

Browsing History: {{browsingHistory}}
Purchase History: {{purchaseHistory}}
Wishlist: {{wishlist}}

Recommendations:`,
});

const personalizedBookRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedBookRecommendationsFlow',
    inputSchema: PersonalizedBookRecommendationsInputSchema,
    outputSchema: PersonalizedBookRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
