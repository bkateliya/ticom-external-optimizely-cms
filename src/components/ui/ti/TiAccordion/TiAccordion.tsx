"use client";

import { Themes } from "@/lib/themes";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";
import { ThemeMode } from "../../context/BrandAndTheme/consts";

export type ExpansionPanelSize = 'lg' | undefined;
export interface TiAccordionProps extends React.PropsWithChildren {
    appearance?: "minimal";
    autoCollapse?: boolean;
    autoScroll?: boolean;
    collapseAllLabel?: string;
    expandAllLabel?: string;
    size?: ExpansionPanelSize
    theme?: ThemeMode
}

export function TiAccordion({ appearance, autoCollapse, autoScroll, collapseAllLabel, expandAllLabel, size, theme, children }: TiAccordionProps) {

    const { mode } = useTheme();

    const resolvedTheme = theme || mode;

    return (
        <div>
            <ti-accordion
                appearance={appearance}
                auto-collapse={autoCollapse}
                auto-scroll={autoScroll}
                collapse-all-label={collapseAllLabel}
                expand-all-label={expandAllLabel}
                size={size}
                theme={resolvedTheme}
            >
                {children}
            </ti-accordion>
        </div>
    );
}

