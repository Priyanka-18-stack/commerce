import { useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  // Convert USD → INR
  const convertToINR = (usd) => {
    const rate = 83;
    return (usd * rate).toLocaleString("en-IN", { style: "currency", currency: "INR" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="text-gray-700 float-right">✖</button>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={product.image} alt={product.title} className="h-48 object-contain mx-auto md:mx-0" />
          <div>
            <h2 className="font-bold text-xl">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="mt-4 font-bold">{convertToINR(product.price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
