import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "", maxPrice: "" });
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { addToCart } = useCart();

  // debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(filters.search), 300);
    return () => clearTimeout(handler);
  }, [filters.search]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/items");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    return (
      (!debouncedSearch || p.name.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
      (!filters.category || p.category === filters.category) &&
      (!filters.maxPrice || p.price <= Number(filters.maxPrice))
    );
  });

  return (
    <div className="p-6">
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filtered.map((product) => (
          <ProductCard
            key={product._id}
            item={product} // note: ProductCard expects `item` prop
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
  
}
