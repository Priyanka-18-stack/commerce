import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string(),
  image: z.string().url("Invalid URL"),
});

export default function AddProduct({ addProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data) => {
    addProduct(data); 
    alert("✅ Product added successfully!");
    reset();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded my-6">
      <h1 className="text-2xl font-bold mb-4">➕ Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register("title")}
            className="border rounded px-3 py-2 w-full"
            placeholder="Product title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Price in USD"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="border rounded px-3 py-2 w-full"
            rows="4"
            placeholder="Product description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            {...register("category")}
            className="border rounded px-3 py-2 w-full"
            placeholder="Category"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            {...register("image")}
            className="border rounded px-3 py-2 w-full"
            placeholder="https://example.com/product.jpg"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
