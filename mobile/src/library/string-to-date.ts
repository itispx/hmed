export function stringToDate(time: string) {
  const now = new Date();

  const timeTemp = time.split(":").map((v) => parseInt(v));

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...timeTemp);
}
