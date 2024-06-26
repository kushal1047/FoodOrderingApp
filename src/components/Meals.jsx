import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const defaultConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", defaultConfig, []);
  if (isLoading) {
    return <p className="center">Fetching data.....</p>;
  }
  if (error) {
    return <Error title="An error occured!" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
