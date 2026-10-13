import { useEffect, useState } from 'react';

function Marketplace() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="page">
      <h1>Marketplace</h1>
      <p>Browse agricultural products available from farmers.</p>

      <div className="product-container">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Quantity: {product.quantity}</p>
            <p>Farmer: {product.farmer}</p>
            <button>View Product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;