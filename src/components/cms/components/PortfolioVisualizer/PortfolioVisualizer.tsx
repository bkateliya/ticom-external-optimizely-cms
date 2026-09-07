import { tv } from "tailwind-variants";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import { TiPortfolioViewer } from "@/components/ui/ti/TiPortfolioViewer/TiPortfolioViewer";
import { PortfolioVisualizerComponentType } from "./PortfolioVisualizer.model";

const portfolioVisualizer = tv({
  // ti-portfolio-viewer sizes the SVG to the host width but keeps the asset's
  // own fixed height, so under ~1024px the diagram letterboxes into a band of
  // dead space and its labels shrink past legibility. AEM avoided that by
  // hiding it on phones; we hold it at width and scroll instead.
  base: "overflow-x-auto",
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
    <div className={portfolioVisualizer({ bordered: !content.removeBorder })}>
      <TiPortfolioViewer svgUrl={svgUrl} className="min-w-[1024px] md:min-w-0" />
    </div>
  );
}
