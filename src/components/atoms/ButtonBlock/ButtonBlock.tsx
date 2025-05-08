import React from "react";

interface ButtonBlockProps {
  label: string;
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ label }) => {
  return (
    <button
      style={{
        padding: "10px 20px",
        borderRadius: "4px",
        backgroundColor: "#007BFF",
        color: "#fff",
      }}
    >
      {label}
    </button>
  );
};

export default ButtonBlock;
