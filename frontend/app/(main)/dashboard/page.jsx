import { getRecipeOfTheDay } from "@/actions/mealdb.actions";
import React from "react";

const DashboardPage = async () => {
  const recipeData = await getRecipeOfTheDay();
  const catagoriesData = await getCatagories();
  const areasData = await getAreas();

  const recipeofTheDay = recipeData?.recipe;
  const catagories = catagoriesData?.recipe || [];
  const areas = areasData?.areas || [];

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4">DashboardPage</div>
  );
};

export default DashboardPage;
