import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { exportProject, importProject, type ProjectData } from "../utils/projectExporter";
import type { BlockData } from "../type/blocks";

describe("exportProject — downloadBlob без file-saver", () => {
  beforeEach(() => {
    // jsdom не реализует createObjectURL — мокаем
    vi.stubGlobal("URL", Object.assign(URL, { createObjectURL: vi.fn(() => "blob:mock"), revokeObjectURL: vi.fn() }));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("создаёт <a download> с именем файла и чистит URL", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    const blocks = [{ id: "a", type: "hero", variant: "hero-1", props: {} }] as unknown as BlockData[];
    exportProject(blocks, "test-proj");
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});

describe("importProject — валидация", () => {
  const fileWith = (content: string) => new File([content], "p.json", { type: "application/json" });

  it("валидный проект резолвится", async () => {
    const json = JSON.stringify({ name: "n", version: "1.0.0", blocks: [], createdAt: "" });
    await expect(importProject(fileWith(json))).resolves.toMatchObject({ name: "n" } as Partial<ProjectData>);
  });

  it("проект без массива blocks отклоняется", async () => {
    await expect(importProject(fileWith(JSON.stringify({ name: "n" })))).rejects.toThrow();
  });

  it("битый JSON отклоняется", async () => {
    await expect(importProject(fileWith("{oops"))).rejects.toThrow();
  });
});
