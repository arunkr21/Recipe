"use client";

import { useParams } from "next/navigation";
import { getMealsByCategory } from "@/actions/mealdb.actions";
import RecipeGrid from "@/components/RecipeGrid";

export default function CategoryRecipesPage() {
  const params = useParams();
  // folder name is [catagory] (misspelled), so the param is `catagory`
  const category = params.catagory;

  return (
    <RecipeGrid
      type="category"
      value={category}
      fetchAction={getMealsByCategory}
      backLink="/dashboard"
    />
  );
}
