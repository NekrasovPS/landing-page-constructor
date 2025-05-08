import React from "react";

interface TitleBlockProps {
  text: string;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ text }) => {
  return (
    <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
      {text}
    </h2>
  );
};

export default TitleBlock;
