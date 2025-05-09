import { type ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function BlockGroupWrapper({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0)",
            transition: "0.2s",
          }}
        >
          ▶
        </span>
        <span style={{ marginLeft: "8px" }}>{title}</span>
      </div>

      {open && (
        <div style={{ paddingLeft: "16px", marginTop: "8px" }}>{children}</div>
      )}
    </div>
  );
}
