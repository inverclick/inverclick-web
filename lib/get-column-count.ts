export function getGridColumns({
  gridWidth,
  childWidth,
  gap = 0,
}: {
  gridWidth: number;
  childWidth: number;
  gap?: number;
}) {
  const columns = Math.floor(gridWidth / (childWidth + gap));

  return columns;
}
