import React from "react";

interface ImageBlockProps {
  src: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt="Image Block"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    />
  );
};

export default ImageBlock;
