import type { BlockData, BlockProps } from "../../../type/blocks";

interface EditPanelProps {
  block?: BlockData;
  onChange: (updated: BlockProps) => void;
}

export default function EditPanel({ block, onChange }: EditPanelProps) {
  if (!block) return <div>Выберите блок для редактирования</div>;

  const props = block.props || {};

  return (
    <div>
      <h3>Редактирование Hero</h3>

      <label>
        Заголовок:
        <input
          type="text"
          value={props.title || ""}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </label>

      <br />
      <label>
        Описание:
        <input
          type="text"
          value={props.description || ""}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </label>

      <br />
      <label>
        Кнопка:
        <input
          type="text"
          value={props.buttonText || ""}
          onChange={(e) => onChange({ buttonText: e.target.value })}
        />
      </label>

      <br />
      <label>
        Фон (URL):
        <input
          type="text"
          value={props.backgroundImage || ""}
          onChange={(e) => onChange({ backgroundImage: e.target.value })}
        />
      </label>
    </div>
  );
}
