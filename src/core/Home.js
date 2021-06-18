import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Banner from "./Banner";
import Feature from "./Feature";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout>
      <Banner />
      <Feature />
      <div class="container pb-16">
        <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
          top new arrival
        </h2>
        <div class="grid grid-cols-4 gap-6">
          {productsBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
