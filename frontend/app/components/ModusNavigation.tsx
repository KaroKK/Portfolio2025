"use client";

import React from "react";
import "../styles/shell.css";
import { ModusId } from "../types/modi";

export type NavItem = {
  id: ModusId;
  label: string;
  icon: React.ReactElement;
};

export const navItems: NavItem[] = [
  {
    id: "ueberblick",
    label: "About me",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="3" y="13" width="5" height="8" rx="2" />
        <rect x="10" y="13" width="11" height="8" rx="2" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="8" cy="6" r="2.5" />
        <circle cx="16" cy="12" r="2.5" />
        <circle cx="9" cy="18" r="2.5" />
        <path d="M9.8 7.4 14 10.6M14.6 13.2 10.5 16" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "projekte",
    label: "Projekte",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6M9 13h6M9 17h3" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: "kontakt",
    label: "Kontakt",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 6h16v12H4z" />
        <path d="m5 8 6.2 4.1a1 1 0 0 0 1.1 0L18 8" strokeWidth="1.4" />
      </svg>
    ),
  },
];

type ModusNavigationProps = {
  aktiverModus: ModusId;
  assistentOffen: boolean;
  onModusChange: (modus: ModusId) => void;
  onToggleBrain: () => void;
};

export default function ModusNavigation({ aktiverModus, assistentOffen, onModusChange, onToggleBrain }: ModusNavigationProps) {
  return (
    <aside className="left-rail">
      <div className="rail-headline">PORTFOLIO</div>

      <div className="rail-buttons">
        <button
          className={`rail-button ${assistentOffen ? "active" : ""}`}
          aria-label="Assistent umschalten"
          onClick={onToggleBrain}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M12 3c2.2 0 4 1.8 4 4 0 .6-.1 1.1-.3 1.6A2 2 0 0 1 16 12c0 .4-.1.7-.2 1A4 4 0 0 1 12 21c-2.2 0-4-1.8-4-4 0-.4.1-.7.2-1A4 4 0 0 1 8 10c0-1 .4-1.9 1-2.6.7-1.4 2.1-2.4 3.7-2.4Z"
              strokeWidth="1.3"
            />
            <circle cx="10" cy="10" r="1" fill="currentColor" />
            <circle cx="14" cy="14" r="1" fill="currentColor" />
          </svg>
        </button>
        <div className="rail-label">{assistentOffen ? "Assistent an" : "Assistent aus"}</div>
      </div>

      <div className="rail-buttons">
        {navItems.map((item) => (
          <div key={item.id}>
            <button
              className={`rail-button ${aktiverModus === item.id ? "active" : ""}`}
              onClick={() => onModusChange(item.id)}
              aria-label={item.label}
            >
              {item.icon}
            </button>
            <div className="rail-label">{item.label}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
