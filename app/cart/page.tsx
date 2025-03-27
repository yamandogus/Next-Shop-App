"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { addProduct, removeProduct, clearProducts } from "@/store/features/productSlice";
import { useDispatch } from "react-redux";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";
import { Button } from "@heroui/button";
import Link from "next/link";
import { ProductProps } from "@/lib/product";

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  const total =
    items?.length > 0
      ? items.reduce((acc: number, tot: ProductProps) => acc + tot.price * tot.quantity, 0)
      : 0;
  const formattedTotal = Number(total).toFixed(2);

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto p-4 min-h-screen">
        <h1 className="text-3xl text-center font-bold mb-8 dark:text-white">Sepetim</h1>
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Sepetiniz boş</p>
          <Link href="/">
            <Button color="primary" size="lg">
              Alışverişe Devam Et
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-4 dark:text-white">Sepetim</h1>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">Ürünler</h2>
          <button
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium"
            onClick={() => dispatch(clearProducts())}
          >
            Sepeti Temizle
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-36 h-36 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold dark:text-white mb-2">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap justify-between items-end gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center gap-3 overflow-hidden">
                      <button
                        className="flex items-center justify-center text-white font-bold bg-green-500 w-5 h-5 rounded-full"
                        onClick={() => dispatch(addProduct(item))}
                      >
                        <span className="inline-flex items-center justify-center">+</span>
                      </button>
                      <span className="inline-flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        className="flex items-center justify-center text-white font-bold bg-red-500 w-5 h-5 rounded-full"
                        onClick={() => dispatch(removeProduct(item))}
                      >
                        <span className="inline-flex items-center justify-center">-</span>
                      </button>
                    </div>

                    <button
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1"
                      onClick={() => {
                        for (let i = 0; i < item.quantity; i++) {
                          dispatch(removeProduct(item));
                        }
                      }}
                    >
                      <MdDelete size={18} />
                      <span>Kaldır</span>
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Birim Fiyat: ${item.price}
                    </p>
                    <p className="text-lg font-bold dark:text-white">
                      Toplam: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium dark:text-white">Genel Toplam:</span>
            <span className="text-2xl font-bold dark:text-white">${formattedTotal}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/" className="w-full sm:w-auto">
              <Button color="success" variant="flat" className="w-full">
                Alışverişe Devam Et
              </Button>
            </Link>
            <Link href="/checkout" className="w-full sm:w-auto">
              <Button color="success" className="w-full">
                Ödemeye Geç
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
