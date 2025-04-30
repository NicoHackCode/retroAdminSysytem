import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../domain/models/Product";
import { ProductService } from "../../../infrastructure/services/productService";

export const ProductCrud = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(ProductService.getAll());
  }, []);

  const handleAdd = () => {
    const product: Product = { id: uuidv4(), ...newProduct };
    ProductService.create(product);
    setProducts(ProductService.getAll());
    setNewProduct({ name: "", description: "", price: 0 });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleUpdate = () => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      ...newProduct,
    };

    ProductService.update(updatedProduct);
    setProducts(ProductService.getAll());
    setEditingProduct(null);
    setNewProduct({ name: "", description: "", price: 0 });
  };

  const handleDelete = (id: string) => {
    ProductService.delete(id);
    setProducts(ProductService.getAll());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Precio"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
        }
      />
      {editingProduct ? (
        <>
          <button onClick={handleUpdate}>Actualizar producto</button>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setNewProduct({ name: "", description: "", price: 0 });
            }}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </>
      ) : (
        <button onClick={handleAdd}>Agregar producto</button>
      )}

      <table style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
