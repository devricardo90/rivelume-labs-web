import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";

describe("Metadados do site", () => {
  it("define título e descrição não vazios", () => {
    expect(metadata.title).toBe("Rivelume Labs");
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeGreaterThan(0);
  });
});
