import React from "react";
import { Link } from 'react-router-dom';

export const Card = ({ product }) => {
  const randomId = Math.floor(Math.random() * 100);
  return (
    <Link to={`/products/${product.id}`}>
    <div className="border border-gray-300 rounded-2xl p-3 flex flex-col justify-center items-center">
      <img
        src={`https://picsum.photos/id/${randomId}/200/300`}
        alt="product-img"
        className="rounded-2xl"
      />
      <h2 className="text-2xl font-bold p-2">{product.name}</h2>
      <p className="text-primary"> {product.price} تومان</p>
      <small>موجودی انبار: {product.quantity} عدد </small>
    </div>
    </Link>
  );
};
