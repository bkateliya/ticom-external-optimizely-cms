import "react";
declare module "react" {
  namespace JSX {
    export interface IntrinsicElements {
      [key: `ti-${string}`]: React.DetailedHTMLProps<React.HTMLElement>;
    }
  }
}
