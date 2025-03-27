import React from "react";
import { title } from "../primitives";
import { Button } from "@heroui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="inline-block w-full text-center justify-center mb-4 bg-gradient-to-r from-violet-950/40 via-indigo-900/30 to-blue-900/40 dark:from-violet-950/70 dark:via-indigo-950/60 dark:to-blue-950/70 backdrop-blur-sm p-6 rounded-xl">
      <div className="">
        <span className={title()}>Next-Shop&nbsp;</span>
        <span className={title({ color: "violet" })}>Mağazasına&nbsp;</span>
        <br className="block md:hidden" />
        <span className={title()}>Hoş Geldiniz</span>
      </div>
      <div className="text-center text-gray-500 dark:text-gray-400 my-4">
        Harika fiyatlarla muhteşem ürünleri keşfedin ve hızlı kargo ile teslim alın.
      </div>
      <div className="flex justify-center items-center">
        <Button as={Link} href="/products" variant="flat" color="success" size="sm" className="font-bold">
          Tüm Ürünleri Gör
        </Button>
      </div>
    </div>
  );
};

export default Header;
