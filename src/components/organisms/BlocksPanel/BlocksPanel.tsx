import { useRef, useState } from "react";
import { availableBlockGroups } from "../../../utils/availableBlocks";
import BlockVariantsSlider from "./BlockVariantsSlider";

export default function BlocksPanel() {
  const [openedGroup, setOpenedGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedGroup = availableBlockGroups.find(
    (group) => group.title === openedGroup
  );

  return (
    <div ref={panelRef} style={{ position: "relative", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px",
        }}
      >
        {availableBlockGroups.map((group) => (
          <button
            key={group.title}
            onClick={() => setOpenedGroup(group.title)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: "#f9f9f9",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {group.title}
          </button>
        ))}
      </div>

      <BlockVariantsSlider
        isOpen={!!openedGroup}
        title={selectedGroup?.title || ""}
        blocks={selectedGroup?.blocks || []}
        onClose={() => setOpenedGroup(null)}
      />
    </div>
  );
}
