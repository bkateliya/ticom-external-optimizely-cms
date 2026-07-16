"use client";
import { TifButton } from '@ticom/form-components/react'
import React from "react";
import { useTheme } from '../../context/BrandAndTheme/BrandAndThemeContext';

export type TifButtonProps = Omit<React.ComponentPropsWithRef<typeof TifButton>, 'theme'>;

/** We need this wrapper component because getting the mode requires "use client" 
 * but the main component needs to be a server component so this adds a layer in between
 */
export function TiButton(props: TifButtonProps) {

    const { mode } = useTheme();

    return (
        <TifButton
            {...props}
            theme={mode}
        >
        </TifButton>
    );
}

