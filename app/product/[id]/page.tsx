"use client";

import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { SlArrowLeft, SlBasket } from "react-icons/sl";
import { IoStar } from "react-icons/io5";
import Link from "next/link";

import { addProduct } from "@/store/features/productSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const productData = searchParams.get("data");
  const product = productData ? JSON.parse(productData) : null;
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const productWithQuantity = {
      ...product,
      quantity: 1,
    };

    dispatch(addProduct(productWithQuantity));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">Ürün bulunamadı</p>
          <Link href="/">
            <Button color="primary" size="sm">
              Alışverişe Devam Et
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start mb-4">
        <Button as={Link} color="success" href="/" size="sm">
          <SlArrowLeft />
        </Button>
      </div>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/3 h-[300px] flex-shrink-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain rounded-md"
            />
          </div>

          {/* Ürün Detayları */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="text-xl font-bold dark:text-white mb-2">{product.title}</h1>

            <div className="flex items-center gap-2 mb-2">
              <IoStar className="text-yellow-500" size={16} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {product.rating.rate}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.rating.count} Yorum)
              </span>
            </div>
            <p className="text-md text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {product.description}
            </p>

            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              <span className="text-gray-600 dark:text-gray-300">Toplam Fiyat:</span> $
              {product.price}
            </div>
            <div className="mt-auto">
              <Button
                color={added ? "success" : "primary"}
                size="md"
                className="w-full md:w-auto"
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <SlBasket className="mr-1" />
                    Sepete Eklendi
                  </>
                ) : (
                  <>
                    <SlBasket className="mr-1" />
                    Sepete Ekle
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
