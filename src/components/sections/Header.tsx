"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

import { site } from "@/config/site";
import { Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleThemeChange = useCallback(
    (next: string) => {
      setTheme(next);
      closeMenu();
    },
    [setTheme, closeMenu],
  );

  const isDark = theme === "dark";
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close mobile menu on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isMenuOpen, closeMenu]);

  // Mounted guard: theme icon is only rendered after hydration to avoid
  // server/client mismatch on the resolved theme.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = site.nav;

  return (
    <header className={cn("sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Wordmark name={site.name} />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-fg-2 text-sm font-medium transition-colors duration-120 ease-snap",
                  isActive(item.href) ? "text-fg underline underline-offset-4" : "hover:text-fg",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            </Button>
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleThemeChange(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeMenu}
              aria-label="Open command palette (⌘K)"
              title="Command palette (⌘K)"
            >
              ⌘K
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 border-t border-line bg-bg px-4 pb-4"
            role="menu"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-1" aria-labelledby="mobile-menu">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block px-3 py-3 text-sm text-fg hover:bg-bg-2 rounded-md"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-line pt-4 flex gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleThemeChange(isDark ? "light" : "dark")}
                  className="flex-1 justify-start"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {isDark ? "Light mode" : "Dark mode"}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="flex-1 justify-start"
                aria-label="Open command palette (⌘K)"
              >
                ⌘K Command palette
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
