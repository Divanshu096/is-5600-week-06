import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const limit = 10;

const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setProducts(data.slice(offset, offset + limit));
    }
  }, [offset, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => {
      if (!tagQuery) {
        return product;
      }
      return product.tags.some(({ title }) => title === tagQuery);
    });

    setOffset(0); 
    setProducts(filtered.slice(0, limit)); 
  };

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleNext = () => {
    setOffset((prevOffset) =>
      prevOffset + limit < data.length ? prevOffset + limit : prevOffset
    );
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={handlePrevious}
          disabled={offset === 0} 
        />

        <Button
          text="Next"
          handleClick={handleNext}
          disabled={offset + limit >= data.length} 
        />
      </div>
    </div>
  );
};

export default CardList;
