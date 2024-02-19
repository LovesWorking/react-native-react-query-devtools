type StatusColorMap = {
  [key: string]: { backgroundColor: string };
};

const statusToBgColorStyle: StatusColorMap = {
  fresh: { backgroundColor: "#A6F4C5" }, // Green
  stale: { backgroundColor: "#FEDF89" }, // Yellow
  fetching: { backgroundColor: "#B2DDFF" }, // Blue
  paused: { backgroundColor: "#D9D6FE" }, // Indigo
  noObserver: { backgroundColor: "#EAECF0" }, // Grey
  inactive: { backgroundColor: "#FEDF89" }, // Yellow
};

export function getStatusBgColorStyle(status: string): {
  backgroundColor: string;
} {
  const defaultStyle = { backgroundColor: "#EAECF0" }; // Default to "noObserver" color
  return statusToBgColorStyle[status] || defaultStyle;
}
