import { describe, expect, it } from "vitest";
import { cx } from "@/lib/cx";

describe("cx", () => {
  it("junta as classes com espaço", () => {
    expect(cx("a", "b", "c")).toBe("a b c");
  });

  it("ignora vazios, false, null e undefined", () => {
    expect(cx("a", undefined, null, false, "", "b")).toBe("a b");
  });

  it("devolve string vazia sem classes", () => {
    expect(cx()).toBe("");
    expect(cx(false, undefined)).toBe("");
  });

  it("aceita condicionais", () => {
    expect(cx("base", true && "ativo", false && "inativo")).toBe("base ativo");
  });
});
