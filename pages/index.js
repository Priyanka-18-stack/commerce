import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";
import ProductModal from "../components/ProductModal";
import AddProduct from "../components/AddProduct";
import { ShoppingCart } from "lucide-react";

// Fetch all products
const fetchAllProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Fetch all categories
const fetchCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) return [];
  return res.json();
};

// Fetch single product details
const fetchProductById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
};

// Convert USD to INR
const convertToINR = (usd) =>
  (usd * 83).toLocaleString("en-IN", { style: "currency", currency: "INR" });

export default function Home() {
  const { cart, addToCart } = useCartStore();
  const { products: localProducts, addProduct } = useProductStore();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Fetch all products
  const { data: apiProducts = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  // Fetch all categories
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (loadingProducts || loadingCategories)
    return <p className="p-6">Loading...</p>;

  // Combine API + local products
  const combinedProducts = [...apiProducts, ...localProducts];

  // Filter by category
  const filteredByCategory =
    category === "all"
      ? combinedProducts
      : combinedProducts.filter((p) => p.category === category);

  // Filter by search
  const filtered = filteredByCategory.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 relative">
        <h1 className="text-2xl font-bold">🛍️ E-commerce Store</h1>

        {/* Search + Category */}
        <div className="flex gap-2 items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-64"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Cart */}
        <button className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <ShoppingCart size={20} />
          <span>{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
        </button>
      </header>

      {/* Product Grid */}
      <main>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded shadow p-3 flex flex-col">
                <div className="flex-1 flex flex-col">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-40 object-contain mx-auto"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.png"; // fallback image
                      }}
                    />
                  ) : (
                    <div className="h-40 flex items-center justify-center border bg-gray-100">
                      <span className="text-gray-500 text-center">Image not available</span>
                    </div>
                  )}
                  <h2 className="font-semibold mt-2 text-sm line-clamp-2">{p.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{p.description}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-bold">{convertToINR(p.price)}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        const product = await fetchProductById(p.id);
                        setSelected(product);
                      } catch {
                        alert("Failed to fetch product details");
                      }
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm flex-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Product Form */}
      <AddProduct addProduct={addProduct} />

      {/* Product Modal */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
