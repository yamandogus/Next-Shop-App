"use client";

import { Button } from "@heroui/button";
import { MdAddShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/features/productSlice";
import { useState, useEffect } from "react";
import Header from "@/components/header/page";
import { ProductProps } from "@/lib/product";

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ProductProps) => {
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
      })
    );
  };

  const getBestSellers = () =>
    products.filter((product) => product.rating?.count > 200).slice(0, 4);
  const getNewArrivals = () => [...products].sort((a, b) => b.id - a.id).slice(0, 4);
  const getTrendingProducts = () =>
    [...products].sort((a, b) => b.rating?.rate - a.rating?.rate).slice(0, 4);

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

  const ProductCard = ({ product }: { product: ProductProps }) => (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-shadow">
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
  );

  {
    /* Kategori başlığı bileşeni */
  }
  const CategoryTitle = ({ title, viewAllLink }: { title: string; viewAllLink: string }) => (
    <div className="flex justify-between items-center w-full mb-4">
      <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
      <Link
        href={viewAllLink}
        className="text-blue-600 text-sm hover:text-success transition-colors duration-300 ease-in-out"
      >
        Tümünü Gör ➜
      </Link>
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <Header />

      {/* Çok Satanlar */}
      <div className="w-full">
        <CategoryTitle title="Çok Satanlar" viewAllLink="/products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {getBestSellers().map((product) => (
            <ProductCard key={`bestseller-${product.id}`} product={product} />
          ))}
        </div>
      </div>

      {/* En Yeni Ürünler */}
      <div className="w-full">
        <CategoryTitle title="En Yeni Ürünler" viewAllLink="/products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {getNewArrivals().map((product) => (
            <ProductCard key={`new-${product.id}`} product={product} />
          ))}
        </div>
      </div>

      {/* Trend Ürünler */}
      <div className="w-full">
        <CategoryTitle title="Trend Ürünler" viewAllLink="/products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {getTrendingProducts().map((product) => (
            <ProductCard key={`trending-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
