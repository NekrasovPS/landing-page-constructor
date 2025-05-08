export default function FeatureBlock() {
  return (
    <section
      style={{
        padding: "32px",
        background: "#fffbe6",
        border: "1px solid #f0e68c",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "12px" }}>Особенность</h2>
      <ul style={{ listStyle: "disc", paddingLeft: "20px", color: "#444" }}>
        <li>Преимущество 1</li>
        <li>Преимущество 2</li>
        <li>Преимущество 3</li>
      </ul>
    </section>
  );
}
