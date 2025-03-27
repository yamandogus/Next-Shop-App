export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js E-Ticaret",
  description: "Fakestoreapi ile oluşturulmuş modern bir e-ticaret sitesi.",
  navItems: [
    {
      label: "Ana Sayfa",
      href: "/",
    },
    {
      label: "Ürünler",
      href: "/products",
    },
    {
      label: "Hakkımızda",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Ana Sayfa",
      href: "/",
    },
    {
      label: "Ürünler",
      href: "/products",
    },
    {
      label: "Hakkımızda",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    website: "https://heroui.com",
  },
};
