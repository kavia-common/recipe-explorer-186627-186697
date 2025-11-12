export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  timeMinutes: number;
  servings: number;
  tags: string[];
  ingredients: string[];
  steps: string[];
};

export const RECIPES: Recipe[] = [
  {
    id: "lemon-garlic-salmon",
    title: "Lemon Garlic Salmon",
    description: "Crispy pan-seared salmon with a zesty lemon garlic butter sauce.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
    timeMinutes: 25,
    servings: 2,
    tags: ["seafood", "quick", "healthy"],
    ingredients: [
      "2 salmon fillets",
      "2 tbsp butter",
      "2 cloves garlic, minced",
      "1 lemon (juice + zest)",
      "Salt & pepper",
      "Fresh parsley",
    ],
    steps: [
      "Pat salmon dry and season with salt and pepper.",
      "Sear salmon skin-side down 4-5 min, flip and cook 2-3 min.",
      "Add butter and garlic to pan; cook until fragrant.",
      "Finish with lemon juice and zest; spoon sauce over salmon.",
      "Garnish with parsley and serve.",
    ],
  },
  {
    id: "creamy-mushroom-pasta",
    title: "Creamy Mushroom Pasta",
    description: "Silky cream sauce with sautéed mushrooms and parmesan over al dente pasta.",
    image: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1600&auto=format&fit=crop",
    timeMinutes: 30,
    servings: 3,
    tags: ["vegetarian", "comfort", "pasta"],
    ingredients: [
      "300g pasta",
      "250g mushrooms, sliced",
      "2 cloves garlic, minced",
      "1 cup cream",
      "1/2 cup grated parmesan",
      "Olive oil, salt & pepper",
      "Parsley to finish",
    ],
    steps: [
      "Cook pasta until al dente; reserve 1/2 cup pasta water.",
      "Sauté mushrooms in olive oil until browned.",
      "Add garlic; cook 30 seconds.",
      "Stir in cream; simmer 2-3 minutes.",
      "Add parmesan and pasta; toss, loosen with pasta water.",
      "Season and garnish with parsley.",
    ],
  },
  {
    id: "summer-quinoa-salad",
    title: "Summer Quinoa Salad",
    description: "Fresh quinoa salad with cucumbers, tomatoes, herbs and a lemon vinaigrette.",
    image: "https://images.unsplash.com/photo-1552767059-8fcec7f2e86e?q=80&w=1600&auto=format&fit=crop",
    timeMinutes: 20,
    servings: 4,
    tags: ["salad", "gluten-free", "healthy", "quick"],
    ingredients: [
      "1 cup quinoa",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/4 red onion, thinly sliced",
      "Fresh mint & parsley",
      "2 tbsp olive oil",
      "1 lemon, juiced",
      "Salt & pepper",
    ],
    steps: [
      "Cook quinoa and cool slightly.",
      "Whisk olive oil, lemon juice, salt and pepper.",
      "Combine quinoa, vegetables, and herbs; toss with dressing.",
      "Adjust seasoning and serve chilled or room temp.",
    ],
  },
];

export function searchRecipes(query: string): Recipe[] {
  if (!query) return RECIPES;
  const q = query.toLowerCase();
  return RECIPES.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.tags.some(t => t.toLowerCase().includes(q)) ||
    r.ingredients.some(i => i.toLowerCase().includes(q))
  );
}

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find(r => r.id === id);
}
