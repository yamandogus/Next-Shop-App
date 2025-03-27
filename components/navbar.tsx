"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { LuShoppingCart } from "react-icons/lu";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { CartPreview } from "./cart/cart-preview";
import { LiaShopware } from "react-icons/lia";

export const Navbar = () => {
  const { items, totalQuantity } = useSelector((state: RootState) => state.product);
  const [mounted, setMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <LiaShopware className="text-2xl" />
              <p className="font-bold text-inherit">Next Shop</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-success data-[active=true]:font-medium hover:text-success transition-colors duration-300 ease-in-out",
                    selectedItem === item.href && "text-success font-medium"
                  )}
                  href={item.href}
                  onClick={() => setSelectedItem(item.href)}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden sm:flex">
            <ThemeSwitch />
          </NavbarItem>
          {/* Sepet */}
          <NavbarItem className="hidden sm:flex">
            <Popover>
              <PopoverTrigger>
                <div className="relative cursor-pointer">
                  <LuShoppingCart size={24} />
                  {mounted && (totalQuantity > 0 || items.length > 0) && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {totalQuantity || items.length}
                    </span>
                  )}
                </div>
              </PopoverTrigger>

              <PopoverContent className="border-1 dark:border-gray-800 rounded-lg dark:bg-gray-800 dark:text-white">
                <div>
                  <CartPreview />
                </div>
              </PopoverContent>
            </Popover>
          </NavbarItem>
        </NavbarContent>

        {/* Mobilde Navbar */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarItem>
            <NextLink href="/cart">
              <LuShoppingCart size={24} />
              {mounted && (totalQuantity > 0 || items.length > 0) && (
                <span className="absolute top-5 right-13 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {totalQuantity || items.length}
                </span>
              )}
            </NextLink>
          </NavbarItem>
          <NavbarMenuToggle />
        </NavbarContent>
      </HeroUINavbar>
    </>
  );
};
