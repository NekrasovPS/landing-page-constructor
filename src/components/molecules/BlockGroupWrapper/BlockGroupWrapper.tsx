// src/components/molecules/BlockGroupWrapper/BlockGroupWrapper.tsx
import { type ReactNode, useState } from "react";

interface BlockGroupWrapperProps {
  title: string;
  children: ReactNode;
}

export default function BlockGroupWrapper({
  title,
  children,
}: BlockGroupWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0)",
            transition: "0.2s",
          }}
        >
          ▶
        </span>
        <span style={{ marginLeft: "8px" }}>{title}</span>
      </div>

      {isOpen && (
        <div style={{ marginTop: "8px", paddingLeft: "16px" }}>{children}</div>
      )}
    </div>
  );
}
