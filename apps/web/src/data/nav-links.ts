export type NavLink = {
  label: string;
  href: string;
  disabled: boolean;
};

export const navLinks: NavLink[] = [
  {
    label: "Books",
    href: "/books",
    disabled: false,
  },
  {
    label: "Authors",
    href: "/authors",
    disabled: true,
  },
  {
    label: "Genres",
    href: "/genres",
    disabled: true,
  },
  {
    label: "About",
    href: "/about",
    disabled: true,
  },
];
