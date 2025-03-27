"use client";
import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { SearchIcon } from "../icons";
import NextLink from "next/link";
import { ProductProps } from "@/lib/product";

export function Search() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Api istek hatası oluştu");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <Input
        startContent={<SearchIcon />}
        placeholder="Ürün Ara"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length > 0 && (
        <div className="absolute top-full mt-1 w-[400px] right-0 z-50 max-h-[300px] overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          {filteredProducts.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <li key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <NextLink
                    href={{
                      pathname: `/product/${product.id}`,
                      query: { data: JSON.stringify(product)},
                    }}
                    className="w-full block py-2 px-3"
                    onClick={() => setSearchTerm("")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="max-w-full max-h-full p-1 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.price} ₺
                        </p>
                      </div>
                    </div>
                  </NextLink>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
              Sonuç bulunamadı
            </div>
          )}
        </div>
      )}
    </div>
  );
} 