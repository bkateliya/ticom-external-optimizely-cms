import { tv } from "tailwind-variants";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import { TiPortfolioViewer } from "@/components/ui/ti/TiPortfolioViewer/TiPortfolioViewer";
import { PortfolioVisualizerComponentType } from "./PortfolioVisualizer.model";

const portfolioVisualizer = tv({
  base: "hidden md:block",
  variants: {
    bordered: {
      true: "border border-pl-border-color-primary p-8",
    },
  },
});

export function PortfolioVisualizerComponent({
  content,
}: OptiComponentProps<typeof PortfolioVisualizerComponentType>) {
  if (!content?.file) {
    return null;
  }

  const svgUrl = getBynderImageFromContext(content.file)?.transformBaseUrl;
  if (!svgUrl) {
    return null;
  }

  return (
    <TiPortfolioViewer
      svgUrl={svgUrl}
      className={portfolioVisualizer({ bordered: !content.removeBorder })}
    />
  );
}
