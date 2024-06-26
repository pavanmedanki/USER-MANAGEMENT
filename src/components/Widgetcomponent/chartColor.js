const defaultMonoColor = [
  "#2388bc",
  "#37afe4",
  "#152b4d",
  "#1c4773",
  "#2172a4",
  "#269dd5",
  "#58bce9",
  "#98d8f4",
  "#1e5d8b",
  "#227db0",
  "#47b6e6",
  "#78caef",
  "#a8dff7",
  "#19325a",
  "#1d527f",
  "#1f6897",
  "#2493c8",
  "#27a8e1",
  "#68c3ec",
  "#88d1f1",
  "#2388bc",
  "#37afe4",
  "#152b4d",
];

const defaultChartColor = [
  "#2E85D9",
  "#B57432",
  "#77B489",
  "#7a4419",
  "#008080",
  "#b1985e",
  "#a78029",
  "#ccc589",
  "#82a66c",
  "#63bdf6",
  "#a6a6a6",
  "#755c1b",
  "#515a47",
  "#77b489",
  "#D7BE82",
  "#bbaba0",
  "#6ca6ef",
  "#7f7f7f",
  "#00445b",
  "#00ae79",
  "#a5a5a5",
  "#f9921d",
  "#65cce9",
  "#007298",
  "#e1595b",
  "#59a14f",
  "#edc948",
  "#76b7b2",
];

const generateColorMonoVarients = (range) => defaultMonoColor?.slice(range);
const generateColorChartVarients = (range) => defaultChartColor?.slice(range);

export const allChartColors = {
  defaultChartColor: defaultChartColor,
  colorChartVarient1: generateColorChartVarients(0),
  colorChartVarient2: generateColorChartVarients(4),
  colorChartVarient3: generateColorChartVarients(8),
  colorChartVarient4: generateColorChartVarients(12),
  colorChartVarient5: generateColorChartVarients(16),
  colorChartVarient6: generateColorChartVarients(20),
  colorChartVarient7: generateColorChartVarients(23),
  colorChartVarient8: generateColorChartVarients(3),
  colorChartVarient9: generateColorChartVarients(6),
  colorChartVarient10: generateColorChartVarients(9),
  colorChartVarient11: generateColorChartVarients(12),
  colorChartVarient12: generateColorChartVarients(15),
  colorChartVarient13: generateColorChartVarients(18),
  colorChartVarient14: generateColorChartVarients(21),
  colorChartVarient15: generateColorChartVarients(5),
  colorChartVarient16: generateColorChartVarients(10),
  colorChartVarient17: generateColorChartVarients(15),
  colorChartVarient18: generateColorChartVarients(20),
  colorChartVarient19: generateColorChartVarients(7),
  colorChartVarient20: generateColorChartVarients(14),
  defaultMonoChartColor: defaultMonoColor,
  monoChartVarient1: generateColorMonoVarients(3),
  monoChartVarient2: generateColorMonoVarients(6),
  monoChartVarient3: generateColorMonoVarients(9),
  monoChartVarient4: generateColorMonoVarients(12),
  monoChartVarient5: generateColorMonoVarients(15),
  monoChartVarient6: generateColorMonoVarients(4),
  monoChartVarient7: generateColorMonoVarients(8),
  monoChartVarient8: generateColorMonoVarients(12),
  monoChartVarient9: generateColorMonoVarients(16),
  monoChartVarient10: generateColorMonoVarients(5),
  monoChartVarient11: generateColorMonoVarients(10),
  monoChartVarient12: generateColorMonoVarients(15),
  monoChartVarient13: generateColorMonoVarients(2),
  monoChartVarient14: generateColorMonoVarients(4),
  monoChartVarient15: generateColorMonoVarients(6),
  monoChartVarient16: generateColorMonoVarients(8),
  monoChartVarient17: generateColorMonoVarients(10),
  monoChartVarient18: generateColorMonoVarients(12),
  monoChartVarient19: generateColorMonoVarients(14),
  monoChartVarient20: generateColorMonoVarients(16),
};
