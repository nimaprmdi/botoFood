import CategoriesPage from "../../components/templates/CategoriesPage";

const Categories = ({ data }) => {
  console.log("data", data);

  return <CategoriesPage data={data} />;
};

export default Categories;

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;

  console.log("difficulty", difficulty === "");

  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter((detail) => detail.Difficulty && detail.Difficulty === difficulty);
    //

    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"] || "";
      const [timeDetails] = cookingTime.split(" ");

      if (time === "less" && timeDetails && +timeDetails <= 30) {
        return detail;
      } else if (time === "more" && +timeDetails > 30) {
        return detail;
      }
    });
    //

    if (time && difficulty && timeResult.length && difficultyResult.length) {
      return item;
    } else if (!time && difficulty && difficultyResult.length) {
      return item;
    } else if (time && !difficulty && timeResult.length) {
      return item;
    }
  });

  return {
    props: {
      data: filteredData,
    },
  };
}
