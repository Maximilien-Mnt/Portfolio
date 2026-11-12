/** Command palette (⌘K / Ctrl-K / /) for navigating the site. */
"use client";

import {useState, useRef, useEffect, useCallback} from "react";

/** All navigable routes with labels and icons */
type CommandItem = {
  label: string;
  /** Route to navigate to (relative to root) */
  route: string;
  /** Accessible label/description for screen readers */
  description?: string;
};

const NAV_ITEMS: CommandItem[] = [
  {label: "Home", route: "/", description: "Return to homepage"},
  {label: "Work", route: "/work", description: "View all projects"},
  {label: "Timeline", route: "/timeline", description: "View timeline curve"},
  {label: "Atlas", route: "/atlas", description: "View globe and arcs"},
  {label: "Notes", route: "/notes", description: "View written notes"},
  {label: "About", route: "/about", description: "View about section"},
  {label: "Contact", route: "/contact", description: "View contact information"},
  {label: "Now", route: "/now", description: "View current focus"},
];

/** Items that trigger actions instead of navigation */
const ACTION_ITEMS = [
  {
    label: "Switch theme",
    action: "toggle-theme",
    description: "Toggle light/dark mode",
  },
  {
    label: "Toggle measure mode",
    action: "toggle-measure",
    description: "Show 32px grid and coordinates",
  },
  {
    label: "Open terminal",
    action: "open-terminal",
    description: "Open the terminal overlay",
  },
  {
    label: "Copy email",
    action: "copy-email",
    description: "Copy the email address to clipboard",
  },
];

export function CommandPalette({isOpen: propIsOpen, onOpenChange, onSelect}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect: (item: {label: string; route?: string; action?: string}) => void;
}) {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (propIsOpen !== undefined) setIsOpen(propIsOpen);
  }, [propIsOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpenChange]);

  const handleSelect = useCallback(
    (value: string) => {
      // Check if it's a navigation item
      const navItem = NAV_ITEMS.find((item) => item.label.toLowerCase().includes(value.toLowerCase()));
      if (navItem) {
        onSelect({label: navItem.label, route: navItem.route});
        setIsOpen(false);
        onOpenChange?.(false);
        return;
      }

      // Check if it's an action item
      const actionItem = ACTION_ITEMS.find(
        (item) => item.label.toLowerCase().includes(value.toLowerCase())
      );
      if (actionItem) {
        onSelect({label: actionItem.label, action: actionItem.action});
        setIsOpen(false);
        onOpenChange?.(false);
        return;
      }

      // Default: try to navigate to route if looks like a route
      const routeMatch = value.match(/^\/[\w/.-]*$/);
      if (routeMatch) {
        onSelect({label: value, route: value});
        setIsOpen(false);
        onOpenChange?.(false);
      }
    },
    [onSelect, onOpenChange]
  );

  return (
    <Command
      open={isOpen}
      onOpenChange={setIsOpen}
      onSelect={handleSelect}
      inputRef={inputRef}
      placeholder="⌘K or / to search..."
    >
      <CommandMenu>
        <CommandEmptyState>
          Press ⌘K or / to open the command palette
        </CommandEmptyState>

        <CommandList>
          {/* Navigation items */}
          {NAV_ITEMS.map((item) => (
            <CommandItem key={item.route} value={item.route}>
              <CommandItemMeta>
                {item.description && (
                  <span className="text-muted-foreground text-xs">{item.description}</span>
                )}
              </CommandItemMeta>
              <CommandItemText>{item.label}</CommandItemText>
            </CommandItem>
          ))}

          {/* Action items */}
          {ACTION_ITEMS.map((item) => (
            <CommandItem key={item.action} value={item.action}>
              <CommandItemMeta />
              <CommandItemText>{item.label}</CommandItemText>
            </CommandItem>
          ))}
        </CommandList>
      </CommandMenu>
    </Command>
  );
}

/** Command palette button that opens with ⌘K or / */
export function CommandPaletteButton({className}: {className?: string}) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center rounded-md border border-line bg-bg-2 p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3 transition-colors duration-120 ease-snap",
        "hover:bg-bg-3",
        className
      )}
      aria-haspopup="true"
      aria-label="Open command palette"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
        aria-hidden="true"
      >
        <path d="M21 21l-6-6m2-5l7-7m0 0l-7 7m2-5l7-7" />
      </svg>
      <span className="ml-2">⌘K</span>
    </button>
  );
}