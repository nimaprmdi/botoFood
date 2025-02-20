import { useRouter } from "next/router";
import DetailsPage from "../../components/templates/DetailsPage";

const Details = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading Page</h2>;
  }

  return <DetailsPage {...data} />;
};

export default Details;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const json = await res.json();
  const data = json.slice(0, 10);
  const paths = data.map((item) => ({ params: { id: item.id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const res = await fetch(`${process.env.BASE_URL}/data/${id}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notfound: true,
    };
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
