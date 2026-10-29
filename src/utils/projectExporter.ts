import JSZip from "jszip";
import type { BlockData } from "../type/blocks";

// Нативная замена file-saver: скачивание через временный <a download>
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Даём браузеру начать загрузку перед освобождением URL
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// БАГ #XSS: экранируем пользовательский текст перед вставкой в HTML-экспорт.
// Без этого `<script>` или `"><img onerror=...>` в полях блока выполняются в экспортированной странице.
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Безопасная URL-обёртка для url(...) в CSS — блокирует javascript: схемы
function safeUrl(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (/^(https?:\/\/|\/|\.\/|data:image\/)/i.test(raw)) return escapeHtml(raw);
  return "";
}

// Сокращение для шаблонов ниже
const e = escapeHtml;

export interface ProjectData {
  name: string;
  version: string;
  blocks: BlockData[];
  createdAt: string;
}

export function exportProject(
  blocks: BlockData[],
  projectName: string = "my-landing",
) {
  const project: ProjectData = {
    name: projectName,
    version: "1.0.0",
    blocks,
    createdAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(project, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `${projectName}-project.json`);
}

export async function importProject(file: File): Promise<ProjectData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target?.result as string) as ProjectData;
        if (!project.blocks || !Array.isArray(project.blocks)) {
          reject(new Error("Неверный формат проекта"));
          return;
        }
        resolve(project);
      } catch {
        reject(new Error("Ошибка чтения файла"));
      }
    };
    reader.onerror = () => reject(new Error("Ошибка чтения файла"));
    reader.readAsText(file);
  });
}

export async function exportProjectAsZip(
  blocks: BlockData[],
  projectName: string = "my-landing",
) {
  const zip = new JSZip();

  const project: ProjectData = {
    name: projectName,
    version: "1.0.0",
    blocks,
    createdAt: new Date().toISOString(),
  };

  zip.file("project.json", JSON.stringify(project, null, 2));

  // HTML export
  const htmlContent = generateHtmlFromBlocks(blocks);
  zip.file("index.html", htmlContent);

  // React component export
  const reactContent = generateReactComponent(blocks, projectName);
  zip.file("LandingPage.tsx", reactContent);

  const content = await zip.generateAsync({ type: "blob" });
  downloadBlob(content, `${projectName}.zip`);
}

function generateHtmlFromBlocks(blocks: BlockData[]): string {
  const blocksHtml = blocks
    .map((block) => {
      const props = block.props || {};
      switch (block.variant) {
        case "hero-1":
          return `
  <section style="min-height: 500px; display: flex; align-items: center; justify-content: center; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${safeUrl(props.backgroundImage)}); background-size: cover; color: white; text-align: center; padding: 40px 20px;">
    <div>
      <h1 style="font-size: 48px; margin-bottom: 16px;">${e(props.title || "Добро пожаловать")}</h1>
      <p style="font-size: 20px; margin-bottom: 24px;">${e(props.description || "Создавайте лендинги легко и быстро")}</p>
      <button style="padding: 16px 32px; font-size: 18px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;">${e(props.buttonText || "Начать")}</button>
    </div>
  </section>`;
        case "hero-2":
          return `
  <section style="min-height: 500px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 40px 20px;">
    <div>
      <h1 style="font-size: 56px; margin-bottom: 20px;">${e(props.title || "Создавайте красиво")}</h1>
      <p style="font-size: 20px; margin-bottom: 30px; opacity: 0.9;">${e(props.description || "Конструктор лендингов для современных разработчиков")}</p>
      <button style="padding: 16px 32px; font-size: 18px; background: white; color: #667eea; border: none; border-radius: 50px; cursor: pointer;">${e(props.buttonText || "Попробовать")}</button>
    </div>
  </section>`;
        case "feature-2":
          return `
  <section style="padding: 60px 40px; background: #f0f4f8;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 36px; text-align: center; margin-bottom: 40px;">${e(props.title || "Наши преимущества")}</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <div style="font-size: 40px; margin-bottom: 16px;">🚀</div>
          <h3 style="font-size: 20px; margin-bottom: 12px;">${e(props.feature1Title || "Быстро")}</h3>
          <p style="color: #666;">${e(props.feature1Description || "Молниеносная скорость работы")}</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <div style="font-size: 40px; margin-bottom: 16px;">✨</div>
          <h3 style="font-size: 20px; margin-bottom: 12px;">${e(props.feature2Title || "Качественно")}</h3>
          <p style="color: #666;">${e(props.feature2Description || "Внимание к каждой детали")}</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <div style="font-size: 40px; margin-bottom: 16px;">🛡️</div>
          <h3 style="font-size: 20px; margin-bottom: 12px;">${e(props.feature3Title || "Надежно")}</h3>
          <p style="color: #666;">${e(props.feature3Description || "Гарантия стабильной работы")}</p>
        </div>
      </div>
    </div>
  </section>`;
        case "pricing-1":
          return `
  <section style="padding: 80px 40px; background: #f9fafb;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 36px; text-align: center; margin-bottom: 16px;">${e(props.title || "Тарифные планы")}</h2>
      <p style="text-align: center; color: #666; margin-bottom: 48px;">${e(props.subtitle || "Выберите план, который подходит именно вам")}</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
        <div style="background: white; padding: 32px; border-radius: 16px; border: 2px solid #e5e7eb;">
          <h3 style="font-size: 20px; margin-bottom: 8px;">${e(props.plan1Name || "Старт")}</h3>
          <div style="font-size: 48px; font-weight: bold; margin-bottom: 8px;">${props.plan1Price === "0" ? "Бесплатно" : `${e(props.plan1Price)} ₽`}</div>
          <p style="color: #666; margin-bottom: 8px;">в месяц</p>
          <ul style="list-style: none; color: #666; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">${(props.plan1Features || "").split(",").filter((f) => f.trim()).map((f) => `<li>✓ ${e(f.trim())}</li>`).join("")}</ul>
          <button style="width: 100%; padding: 12px; background: #f3f4f6; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">${e(props.plan1ButtonText || "Начать")}</button>
        </div>
        <div style="background: white; padding: 32px; border-radius: 16px; border: 2px solid #3b82f6; box-shadow: 0 0 0 4px #dbeafe;">
          <h3 style="font-size: 20px; margin-bottom: 8px;">${e(props.plan2Name || "Профи")}</h3>
          <div style="font-size: 48px; font-weight: bold; margin-bottom: 8px;">${e(props.plan2Price)} ₽</div>
          <p style="color: #666; margin-bottom: 8px;">в месяц</p>
          <ul style="list-style: none; color: #666; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">${(props.plan2Features || "").split(",").filter((f) => f.trim()).map((f) => `<li>✓ ${e(f.trim())}</li>`).join("")}</ul>
          <button style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;">${e(props.plan2ButtonText || "Выбрать")}</button>
        </div>
        <div style="background: white; padding: 32px; border-radius: 16px; border: 2px solid #e5e7eb;">
          <h3 style="font-size: 20px; margin-bottom: 8px;">${e(props.plan3Name || "Бизнес")}</h3>
          <div style="font-size: 48px; font-weight: bold; margin-bottom: 8px;">${e(props.plan3Price)} ₽</div>
          <p style="color: #666; margin-bottom: 8px;">в месяц</p>
          <ul style="list-style: none; color: #666; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">${(props.plan3Features || "").split(",").filter((f) => f.trim()).map((f) => `<li>✓ ${e(f.trim())}</li>`).join("")}</ul>
          <button style="width: 100%; padding: 12px; background: #f3f4f6; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">${e(props.plan3ButtonText || "Связаться")}</button>
        </div>
      </div>
    </div>
  </section>`;
        case "footer-1":
          return `
  <footer style="background: linear-gradient(180deg, #1f2937, #111827); color: #9ca3af; padding: 64px 32px;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px;">
        <div>
          <div style="font-size: 24px; font-weight: bold; color: white; margin-bottom: 16px;">${e(props.brandLogo || "🚀")} ${e(props.brandName || "Company")}</div>
          <p style="font-size: 14px; line-height: 1.6;">${e(props.brandDescription || "")}</p>
        </div>
        <div>
          <h4 style="color: white; font-size: 14px; text-transform: uppercase; margin-bottom: 16px;">${e(props.column1Title || "Продукт")}</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(props.column1Links || "")
              .split(",")
              .filter((l) => l.trim())
              .map(
                (l: string) =>
                  `<a href="#" style="color: #9ca3af; text-decoration: none;">${e(l.trim())}</a>`,
              )
              .join("")}
          </div>
        </div>
        <div>
          <h4 style="color: white; font-size: 14px; text-transform: uppercase; margin-bottom: 16px;">${e(props.column2Title || "Компания")}</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(props.column2Links || "")
              .split(",")
              .filter((l) => l.trim())
              .map(
                (l: string) =>
                  `<a href="#" style="color: #9ca3af; text-decoration: none;">${e(l.trim())}</a>`,
              )
              .join("")}
          </div>
        </div>
        <div>
          <h4 style="color: white; font-size: 14px; text-transform: uppercase; margin-bottom: 16px;">${e(props.column3Title || "Поддержка")}</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(props.column3Links || "")
              .split(",")
              .filter((l) => l.trim())
              .map(
                (l: string) =>
                  `<a href="#" style="color: #9ca3af; text-decoration: none;">${e(l.trim())}</a>`,
              )
              .join("")}
          </div>
        </div>
      </div>
      <div style="padding-top: 32px; border-top: 1px solid #374151; text-align: center; font-size: 14px;">
        ${e(props.copyright || "© 2024 Company. Все права защищены.")}
      </div>
    </div>
  </footer>`;
        default:
          return `
  <!-- Block: ${e(block.variant)} -->`;
      }
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; }
    img { max-width: 100%; height: auto; }
    a { text-decoration: none; }
  </style>
</head>
<body>
  ${blocksHtml}
</body>
</html>`;
}

function generateReactComponent(
  blocks: BlockData[],
  projectName: string,
): string {
  const safeName = projectName.replace(/[^a-zA-Z]/g, "") || "My";

  return `import React from 'react';
import './LandingPage.css';

export default function ${safeName}Landing() {
  return (
    <div className="landing-page">
      {/* Generated landing with ${blocks.length} blocks */}
      {/* Add your block components here */}
    </div>
  );
}
`;
}
