import { useEffect, useState } from "react";
import { Product } from "../../../domain/models/Product";
import { ProductService } from "../../../infrastructure/services/productService";
import "./ProductViewer.css";

export const ProductViewer = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = ProductService.getAll();
    setProducts(allProducts);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-window">
        <h2>Inventario de productos</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Precio:</strong> ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
