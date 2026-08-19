// Type stub for @ticom/form-components/react.
// Loosely typed so existing usages (ComponentPropsWithRef, Omit<..., 'theme'>) compile.
import * as React from "react";

export interface TifButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  appearance?: string;
  color?: string;
  size?: string;
  theme?: string;
  href?: string;
  iconName?: string;
  iconPosition?: string;
}

export declare const TifButton: React.ForwardRefExoticComponent<
  TifButtonProps & React.RefAttributes<HTMLElement>
>;

export interface TifButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  appearance?: string;
  color?: string;
  size?: string;
  theme?: string;
  orientation?: string;
}

export declare const TifButtonGroup: React.ForwardRefExoticComponent<
  TifButtonGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface TifFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  appearance?: string;
  size?: string;
  theme?: string;
}

export declare const TifForm: React.ForwardRefExoticComponent<
  TifFormProps & React.RefAttributes<HTMLFormElement>
>;

export interface TifFieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  appearance?: string;
  size?: string;
  theme?: string;
}

export declare const TifFieldset: React.ForwardRefExoticComponent<
  TifFieldsetProps & React.RefAttributes<HTMLFieldSetElement>
>;

export interface TifSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  appearance?: string;
  size?: string;
  theme?: string;
  placeholder?: string;
}

export declare const TifSelect: React.ForwardRefExoticComponent<
  TifSelectProps & React.RefAttributes<HTMLSelectElement>
>;
