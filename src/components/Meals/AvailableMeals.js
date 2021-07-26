import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://react-hooks-5b742-default-rtdb.firebaseio.com/available-meals.json"
        );
        const resData = await res.data;
        const data = await resData[Object.keys(resData)[0]];
        setMeals(data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {!hasError ? (
        <Card>
          {!isLoading ? (
            <ul>{mealsList}</ul>
          ) : (
            <p style={{ textAlign: "center" }}>Loading....</p>
          )}
        </Card>
      ) : (
        <Card>
          <p style={{ textAlign: "center", color: "red" }}>
            Failed to get you meals!!
          </p>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
