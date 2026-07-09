import clsx from "clsx";
import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";

/** Icon size token passed to `<ti-svg-icon>`. */
export type TiIconSize = "s" | "m" | "l";

/** Describes a single `<ti-svg-icon>` rendered inside the button. */
export type TiSvgIcon = {
    /** Icon name, e.g. "star". */
    name: string;
    /** Size token. Defaults to "s". */
    size?: TiIconSize;
    /** Which side of the label to render on. Defaults to "before". */
    position?: "before" | "after";
};

export type TiButtonStyle = "primary" | "secondary" | "link" | "text" | "reversed";


export type TiButtonProps = HTMLAttributes<HTMLElement> & {
    /** Space-separated appearance tokens, e.g. "primary", "compact secondary", "primary icon-only", "reversed". */
    style?: TiButtonStyle;
    compact?: boolean;
    iconOnly?: boolean;
    /** Renders the button in a disabled state. */
    disabled?: boolean;
    /** Maps to the `accessible-name` attribute — required for icon / icon-only buttons. */
    accessibleName?: string;
    /** Icon to render alongside the label. */
    svgicon?: TiSvgIcon;
    children?: ReactNode;
    anchor?: {
        href?: string;
        title?: string;
        accessibleName?: string;
        text?: string;
    };
};

/**
 * Reusable, typed wrapper around the `<ti-button>` web component.
 *
 * Use it from any component instead of writing raw `<ti-button>` markup:
 *
 *   import { TiButton } from "@/components/ui/ti/TiButton/TiButton";
 *
 *   <TiButton appearance="primary" onClick={...}>Save</TiButton>
 *   <TiButton appearance="primary icon-only" accessibleName="Favorite">
 *     <ti-svg-icon size="s">star</ti-svg-icon>
 *   </TiButton>
 *
 * Hyphenated web-component attributes (`accessible-name`) are mapped from
 * camelCase props; every other HTML attribute (`style`, `className`, event
 * handlers, …) is forwarded via `...rest`.
 */

export function TiButton({ style, compact, iconOnly, disabled, accessibleName, svgicon, anchor, children, ...rest }: TiButtonProps) {
    const icon = svgicon ? <ti-svg-icon size={svgicon.size ?? "s"}>{svgicon.name}</ti-svg-icon> : null;
    const position = svgicon?.position ?? "after";

    const content = (
        <>
            {(position === "before" && !iconOnly ? icon : null)}
            {!iconOnly && anchor?.text ? anchor.text : children}
            {(position === "after" || iconOnly) ? icon : null}
        </>
    );
    const body = anchor?.href ? (
        <Link href={anchor.href} title={anchor.title} aria-label={anchor.accessibleName}>
            {content}
        </Link>
    ) : content;

    const appearance = clsx(style, {compact: !!compact, 'icon-only': iconOnly});
    return (
        <ti-button
            appearance={appearance}
            // Emit the boolean attribute only when true so it's absent otherwise.
            disabled={disabled ? "" : undefined}
            accessible-name={accessibleName}
            {...rest}
        >
            {body}
        </ti-button>
    );
}

