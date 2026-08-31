"use client";

import { useCanAccess } from "@/lib/utils/secure-link-client-utils";
import { SecurableUrl } from "@/lib/utils/secure-link-utils";
import React from "react";

// Also define children as React does with React.ReactNode
interface Props extends React.PropsWithChildren {
  securableUrl: SecurableUrl | null;
}

/**
 * Secures the content inside.  If there is a secure link and the user
 * doesn't have access to it, the children of this element will not be rendered
 */
export function SecurableElement({ securableUrl, children }: Props) {
  const canAccess = useCanAccess(securableUrl?.updatedUrl);

  if (canAccess || !securableUrl?.isSecure) {
    return children;
  }
  return null;
}
