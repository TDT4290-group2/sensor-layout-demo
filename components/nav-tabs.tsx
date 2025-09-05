"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export function NavTabs({
  routes,
}: {
  routes: Array<{ name: string; path: string }>;
}) {
  const pathname = usePathname();
  const navLinkRefs = useRef<Array<HTMLElement>>([]); // Refs to the nav links
  const [pillWidth, setPillWidth] = useState<number>();
  const [pillLeft, setPillLeft] = useState<number>();

  const activeNavIndex = routes.findIndex(
    (route) => route.path === pathname || (route.path === "" && pathname === "/"),
  );

  return (
    <div className="flew-row relative mx-auto flex h-11 rounded-full px-0.5">
      <span
        className="absolute top-0 bottom-0 z-10 flex overflow-hidden rounded-full py-1.5 transition-all duration-300"
        style={{ left: pillLeft, width: pillWidth }}
      >
        <span className="h-full w-full rounded-full bg-slate-300 shadow-sm" />
      </span>
      {routes.map((route, i) => {
        return (
          <Link
            href={route.path}
            key={route.path}
            ref={(el) => {
              if (!el) return;

              // Add the ref to the array
              navLinkRefs.current[i] = el;
              // If the current link is the active one, set the pill width and left offset
              if (i === activeNavIndex) {
                setPillWidth(el.offsetWidth);
                setPillLeft(el.offsetLeft);
              }
            }}
            className={
              `${i === activeNavIndex ? "text-black" : "text-neutral-700 hover:text-black dark:text-vektor-blue dark:hover:text-vektor-bg"} z-20 my-auto cursor-pointer select-none rounded-full px-4 text-center font-medium text-sm`
            }
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
}
