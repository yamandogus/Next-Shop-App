"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import { RootState } from "@/store";
import { addProduct, clearProducts, removeProduct } from "@/store/features/productSlice";
import { ProductProps } from "@/lib/product";

export const CartPreview = () => {
  const { items } = useSelector((state: RootState) => state.product as { items: ProductProps[] });
  const total =
    items?.length > 0
      ? items.reduce((acc: number, tot: ProductProps) => acc + tot.price * tot.quantity, 0)
      : 0;
  const formattedTotal = Number(total).toFixed(2);
  const dispatch = useDispatch();

  return (
    <div className="w-100 dark:bg-gray-800 dark:text-white">
      {!items || items.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500">Sepetiniz boş</p>
        </div>
      ) : (
        <>
          <div className="space-y-6 max-h-72 overflow-auto">
            <div className="flex justify-end">
              <button
                className="text-red-500 underline py-1"
                onClick={() => dispatch(clearProducts())}
              >
                Sepeti temizle
              </button>
            </div>
            {Array.isArray(items) && items.length > 0
              ? items.map((item) => (
                  <div key={item.id} className="flex flex-col border-b pb-4">
                    <div key={item.id} className="flex gap-3 items-center justify-between">
                      <div className="relative w-full md:w-24 h-24 flex-shrink-0">
                        <Image
                          fill
                          alt={item.title}
                          className="object-contain rounded-md"
                          src={item.image}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x ${item.price}
                            </p>
                          </div>
                          <div>
                            <div className="flex flex-row gap-2 items-center justify-between">
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
                              <div className="flex gap-2 items-center">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Toplam:</span>
              <span className="font-bold">${formattedTotal ? formattedTotal : 0}</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 gap-2 py-4">
              <Link className="w-3/4" href="/cart">
                <Button className="w-full" color="success" size="sm" variant="flat">
                  Sepete Git
                </Button>
              </Link>
              <Link className="w-3/4" href="/checkout">
                <Button className="w-full" color="success" size="sm">
                  Ödemeye Geç
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
