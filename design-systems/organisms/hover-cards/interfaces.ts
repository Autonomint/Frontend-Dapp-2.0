export interface HoverWrapperProps {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  setCurrentIndex: (index: number | null) => void;
  item: {
    title: string;
    subtitle?: string;
  };
}
