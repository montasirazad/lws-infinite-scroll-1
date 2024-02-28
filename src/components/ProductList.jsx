/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Product from "./Product";
const productPerPage = 10;
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productPerPage}&skip=${
          page * productPerPage
        }`
      );

      const data = await response.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProduct) => [...prevProduct, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };
    const observer = new IntersectionObserver(onIntersection);
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // clean up

    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);
  return (
    <>
      <div>product list</div>
      {products.map((product) => (
        <Product
          title={product.title}
          price={product.price}
          thumbnail={product.thumbnail}
          key={product.id}
        />
      ))}
      {hasMore && (
        <div className="text-center text-3xl my-3" ref={loaderRef}>
          Loading more product ....
        </div>
      )}
    </>
  );
};

export default ProductList;
