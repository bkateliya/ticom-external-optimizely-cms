import { PromoBlockComponentType } from "./PromoBlock.model";

import { OptiComponentProps } from "@/lib/ts/component-props";

import styles from "./styles.module.css";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

export function PromoBlockComponent({
  content,
}: OptiComponentProps<typeof PromoBlockComponentType>) {
  if (!content) {
    return null;
  }

  const split = content.split || "large-right";
  const leftClass =
    split === "large-left" ? styles.largeFlex : styles.smallFlex;
  const rightClass =
    split === "large-right" ? styles.largeFlex : styles.smallFlex;

  return (
    <ThemeProvider theme="theme-accent">
      <div className={styles.base}>
        <div className={clsx(styles.promoBlock)}>
          <div className={leftClass}>
            <ExtendedOptimizelyComponent
              content={content.leftContent}
              parentField="leftContent"
            />
          </div>
          <div className={rightClass}>
            <ExtendedOptimizelyComponent
              content={content.rightContent}
              parentField="rightContent"
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
