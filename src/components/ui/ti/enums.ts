// This file re-exports TI enums because the correct version is currently on available from the "dist" folder
// This causes issues when syncing via CLI
// Once exports are fixed, we can just update this one file instead of the whole code-base. 



// export { ButtonAppearance, ButtonColor, ButtonType } from "@ticom/form-components/dist/types/components/tif-button/tif-button.interface";

export enum ButtonAppearance {
    ghost = "ghost",
    link = "link",
    outline = "outline",
    solid = "solid"
}
export enum ButtonColor {
    primary = "primary",
    secondary = "secondary",
    success = "success",
    warning = "warning"
}
export enum ButtonType {
    button = "button",
    menu = "menu",
    reset = "reset",
    submit = "submit"
}


// export { ComponentTheme } from "@ticom/form-components/dist/types/global/utils/enums";


/**
 * Shared component theme enum.
 * Controls `color-scheme` resolution via the `tif-color-scheme()` SCSS mixin,
 * enabling `light-dark()` CSS values to resolve correctly.
 */
export enum ComponentTheme {
    light = "light",
    dark = "dark",
    auto = "auto"
}
/**
 * Shared component size enum
 */
export enum ComponentSize {
    small = "sm",
    medium = "md",
    large = "lg"
}
/**
 * Shared icon sizes enum (for usage on ti-svg-icon components)
 */
export enum ComponentIconSize {
    small = "sm",
    medium = "md",
    large = "lg"
}
