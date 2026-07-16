"use client";

import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";

import { ComponentTheme } from "@/components/ui/ti/enums";

export type ExpansionPanelSize = 'lg' | undefined;
export interface TiAccordionProps extends React.PropsWithChildren {
    appearance?: "minimal";
    autoCollapse?: boolean;
    autoScroll?: boolean;
    collapseAllLabel?: string;
    expandAllLabel?: string;
    size?: ExpansionPanelSize
    theme?: ComponentTheme
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

