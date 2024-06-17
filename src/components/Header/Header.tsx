"use client";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { MdMenu } from "react-icons/md";

const menuItemClass =
  "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-yellow-500 hover: after:w-full after:transition-all";

export function Header() {
  const pathname = usePathname();
  const [scrollYPosition, setScrollYPosition] = useState(0);

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    setScrollYPosition(scrollY);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <>
      <div
        className={clsx(
          "fixed top-0 w-full transition-colors duration-500 z-40",
          {
            "bg-white drop-shadow-md": scrollYPosition > 50,
          }
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items center justify-beetween py-4 text-yellow-500">
            <Link
              href="/"
              className="text-3xl font-bold uppercase"
              scroll={false}
            >
              Obelix
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={twMerge(
                  menuItemClass,
                  `${pathname === "/" ? "after:w-full " : ""}`
                )}
                scroll={false}
              >
                Home
              </Link>
              <Link
                href="/about us"
                className={twMerge(
                  menuItemClass,
                  `${pathname === "/about" ? "after:w-full " : ""}`
                )}
                scroll={false}
              >
                About us
              </Link>
              <Link
                href="/products"
                className={twMerge(
                  menuItemClass,
                  `${pathname === "/products" ? "after:w-full " : ""}`
                )}
                scroll={false}
              >
                Products
              </Link>
              <Link
                href="/contact"
                className={twMerge(
                  menuItemClass,
                  `${pathname === "/contact" ? "after:w-full " : ""}`
                )}
                scroll={false}
              >
                Contact
              </Link>
            </nav>
            <button className="text-2xl h-10 w-10 border border-transparent hover: border-yellow-500 hover:text-white  flex md-hidden items-center justify-center transition colors">
              <MdMenu />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
