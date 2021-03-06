import React from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import styles from "./Products.module.css";
import Loading from "./Loading";
import AddToCartButton from "./AddToCartButton";

const Products = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData(url) {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (erro) {
        setError(erro);
      } finally {
        setLoading(false);
      }
    }
    fetchData("https://fakestoreapi.com/products");
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Ocorreu um erro.</p>;
  if (!data) return null;
  return (
    <section className="animeUp">
      <Head
        title="placeProducts"
        description="placeProducts - The most company of Products in America Latina."
      />
      <h1 className={styles.mainTitle}>
        Find your products <span>more easily</span>
      </h1>
      <div className={styles.products}>
        {data.map((product) => (
          <div className={styles.productContainer}>
            <AddToCartButton data={product} classButton="pageProducts">
              Add To Cart
            </AddToCartButton>
            <Link
              to={`product/${product.id}`}
              className={styles.product}
              key={product.id}
            >
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
