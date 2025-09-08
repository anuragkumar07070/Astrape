import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });
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
        console.log("Fetched products:", response.data); // debug
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
    });
  };

  // Apply filters
  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        if (
          debouncedSearch &&
          !p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        ) {
          return false;
        }

        if (
          filters.category &&
          String(p.category).toLowerCase() !== filters.category.toLowerCase()
        ) {
          return false;
        }

        if (filters.minPrice && p.price < Number(filters.minPrice)) {
          return false;
        }

        if (filters.maxPrice && p.price > Number(filters.maxPrice)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "newest":
            return b._id.localeCompare(a._id); // assuming MongoDB _id
          default:
            return 0;
        }
      });
  }, [products, filters, debouncedSearch]);

  // Unique categories (robust extraction)
  const categories = [
    ...new Set(
      products
        .map((p) =>
          typeof p.category === "string"
            ? p.category
            : p.category?.name || ""
        )
        .filter(Boolean)
    ),
  ];

  return (
    <div className="p-6">
      {products.length === 0 ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          categories={categories}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard
              key={product._id}
              item={product}
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No products found 🚫
          </div>
        )}
      </div>
    </div>
  );
}
