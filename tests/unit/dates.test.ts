import { describe, expect, it } from "vitest";
import { addDays, dateKey, diffDays, isDateKey, isValidTimeZone, weekStart } from "@/engine/dates";

describe("dateKey por fuso horário", () => {
  // 23:30 em São Paulo (UTC-3) = 02:30 UTC do dia seguinte
  const instant = new Date("2026-03-11T02:30:00Z");

  it("o mesmo instante cai em dias diferentes conforme o fuso", () => {
    expect(dateKey(instant, "America/Sao_Paulo")).toBe("2026-03-10");
    expect(dateKey(instant, "UTC")).toBe("2026-03-11");
    expect(dateKey(instant, "Asia/Tokyo")).toBe("2026-03-11");
    expect(dateKey(instant, "Pacific/Auckland")).toBe("2026-03-11");
    expect(dateKey(instant, "America/Los_Angeles")).toBe("2026-03-10");
  });

  it("vira o dia exatamente à meia-noite local", () => {
    expect(dateKey("2026-06-01T02:59:59Z", "America/Sao_Paulo")).toBe("2026-05-31");
    expect(dateKey("2026-06-01T03:00:00Z", "America/Sao_Paulo")).toBe("2026-06-01");
  });

  it("respeita horário de verão (Nova York)", () => {
    // Antes e depois da mudança de 2026-03-08: meia-noite local muda de offset
    expect(dateKey("2026-03-08T04:59:59Z", "America/New_York")).toBe("2026-03-07");
    expect(dateKey("2026-03-08T05:00:00Z", "America/New_York")).toBe("2026-03-08");
    expect(dateKey("2026-03-09T03:59:59Z", "America/New_York")).toBe("2026-03-08");
    expect(dateKey("2026-03-09T04:00:00Z", "America/New_York")).toBe("2026-03-09");
  });

  it("usa fuso padrão quando o informado é inválido", () => {
    expect(isValidTimeZone("Não/Existe")).toBe(false);
    expect(dateKey(instant, "Não/Existe")).toBe("2026-03-10");
  });
});

describe("aritmética de datas", () => {
  it("soma dias atravessando mês, ano e bissexto", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("diffDays é b - a e não sofre com horário de verão", () => {
    expect(diffDays("2026-03-07", "2026-03-10")).toBe(3);
    expect(diffDays("2026-03-10", "2026-03-07")).toBe(-3);
    expect(diffDays("2026-11-01", "2026-11-02")).toBe(1);
  });

  it("weekStart devolve a segunda-feira", () => {
    expect(weekStart("2026-10-03")).toBe("2026-09-28"); // sábado
    expect(weekStart("2026-09-28")).toBe("2026-09-28"); // segunda
    expect(weekStart("2026-10-04")).toBe("2026-09-28"); // domingo
  });

  it("isDateKey valida formato e calendário", () => {
    expect(isDateKey("2026-02-28")).toBe(true);
    expect(isDateKey("2026-02-30")).toBe(false);
    expect(isDateKey("26-2-3")).toBe(false);
  });
});
