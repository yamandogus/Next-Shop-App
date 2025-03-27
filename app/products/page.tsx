"use client";

import { Button } from "@heroui/button";
import { MdAddShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/features/productSlice";
import { useState, useEffect } from "react";
import { IoLaptopOutline } from "react-icons/io5";
import { FcBusinesswoman } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FaBars } from "react-icons/fa";
import { GiGemChain } from "react-icons/gi";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const categories = [
  { id: 0, name: "", label: "Tümü", icon: FaBars, color: "blue" },
  {
    id: 1,
    name: "men's clothing",
    label: "Erkek Giyim",
    icon: FcBusinessman,
    color: "",
  },
  {
    id: 2,
    name: "jewelery",
    label: "Mücevher",
    icon: GiGemChain,
    color: "blue",
  },
  {
    id: 3,
    name: "electronics",
    label: "Elektronik",
    icon: IoLaptopOutline,
    color: "blue",
  },
  {
    id: 4,
    name: "women's clothing",
    label: "Kadın Giyim",
    icon: FcBusinesswoman,
    color: "",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Api istek hatası oluştu");
        }

        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else if (selectedCategory) {
      const filtered = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
      })
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Hata: {error}</div>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.name ? "solid" : "bordered"}
            color={selectedCategory === category.name ? "success" : "default"}
            onPress={() => setSelectedCategory(category.name)}
            className="flex items-center gap-2"
          >
            <category.icon />
            {category.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-shadow"
          >
            <Link
              href={{
                pathname: `/product/${product.id}`,
                query: { data: JSON.stringify(product) },
              }}
            >
              <div className="p-4">
                <div className="relative w-full h-40 mb-4 flex items-center justify-center bg-white rounded-lg">
                  <img
                    alt={product.title}
                    className="object-contain max-h-full"
                    height={160}
                    src={product.image}
                    width={160}
                  />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white text-center line-clamp-2 h-12 mb-2">
                  {product.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3 text-sm text-center flex-grow mb-4">
                  {product.description}
                </p>
                <div className="font-bold text-lg text-neutral-900 dark:text-white text-center">
                  {product.price} $
                </div>
              </div>
            </Link>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 flex justify-center">
              <Button
                size="sm"
                color="success"
                className="font-bold text-white"
                onPress={() => handleAddToCart(product)}
              >
                <MdAddShoppingCart className="mr-1" /> Sepete Ekle
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
