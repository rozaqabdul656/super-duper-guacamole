export function isIntentJson(str: string): boolean {
  try {
    const json = JSON.parse(str);
    return (
      json &&
      typeof json === "object" &&
      typeof json.action === "string" &&
      ["transfer", "swap", "stake"].includes(json.action)
    );
  } catch {
    return false;
  }
}
