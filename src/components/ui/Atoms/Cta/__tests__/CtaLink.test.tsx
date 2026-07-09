import React from "react";
import { render, screen } from "@testing-library/react";

import { URLS, TARGETS, makeUrl } from "./CtaLink.mock-data";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: unknown;
    children: React.ReactNode;
  }) => {
    const resolvedHref =
      typeof href === "string"
        ? href
        : (href as { href?: string; toString?: () => string })?.href ||
          (href as { toString?: () => string })?.toString?.() ||
          "";

    return (
      <a href={resolvedHref} {...(props as Record<string, unknown>)}>
        {children}
      </a>
    );
  },
}));

jest.mock("../../SvgIcon", () => ({
  __esModule: true,
  SvgIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`svgicon-${icon}`} />
  ),
}));

import CtaLink from "../CtaLink";

type CtaLinkProps = React.ComponentProps<typeof CtaLink>;

/**
 * Replace 'link' with the correct literal/enum if needed.
 * Keeping the cast prevents TS failures when ctaStyle is a strict union.
 */
const DEFAULT_CTA_VARIANT = "link" as unknown as CtaLinkProps["ctaVariant"];
const DEFAULT_CTA_SURFACE = "onBg" as unknown as CtaLinkProps["ctaSurface"];

const renderCtaLink = (
  props: Partial<CtaLinkProps> & Pick<CtaLinkProps, "href" | "text">,
) =>
  render(
    <CtaLink
      {...({
        ctaVariant: DEFAULT_CTA_VARIANT,
        ctaSurface: DEFAULT_CTA_SURFACE,
        ...props,
      } as CtaLinkProps)}
    />,
  );

/**
 *  Helper to set SITE_DOMAIN for external detection.
 */
const setPublicUrl = (origin: string) => {
  process.env.SITE_DOMAIN = origin;
};

const originalEnv = process.env;

afterEach(() => {
  process.env = { ...originalEnv }; // Restore original environment
});

describe("CtaLink – review tests (SR text + suppression + icon override)", () => {
  it('shows SR "(Opens in a new tab)" text when target is _blank', () => {
    renderCtaLink({
      href: URLS.external,
      text: "External",
      target: TARGETS.newTab,
    });

    expect(screen.getByText(/\(Opens in a new tab\)/i)).toBeInTheDocument();
  });

  it('does not show SR "(Opens in a new tab)" text when target is not _blank', () => {
    renderCtaLink({
      href: URLS.external,
      text: "External",
      target: TARGETS.self,
    });

    expect(
      screen.queryByText(/\(Opens in a new tab\)/i),
    ).not.toBeInTheDocument();
  });

  it("does not show new-tab icon when suppressNewTabIcon is true", () => {
    renderCtaLink({
      href: URLS.external,
      text: "External",
      target: TARGETS.newTab,
      suppressNewTabIcon: true,
    });

    expect(screen.queryByTestId("svgicon-new-tab")).not.toBeInTheDocument();
  });

  it("shows explicit ctaIcon even if suppressNewTabIcon is true (icon override)", () => {
    renderCtaLink({
      href: URLS.externalFile,
      text: "Download",
      target: TARGETS.newTab,
      suppressNewTabIcon: true,
      ctaIconAfter: "download",
    });

    expect(screen.getByTestId("svgicon-download")).toBeInTheDocument();
  });
});

describe("CtaLink – 4 acceptance scenarios (external icon display)", () => {
  it("1) External domain + new tab -> external icon shows", () => {
    renderCtaLink({
      href: URLS.external,
      text: "External",
      target: TARGETS.newTab,
    });

    expect(screen.getByTestId("svgicon-new-tab")).toBeInTheDocument();
  });

  it("2) External domain + same tab (Active browser: no target) -> no external icon", () => {
    renderCtaLink({ href: URLS.external, text: "External" });

    expect(screen.queryByTestId("svgicon-new-tab")).not.toBeInTheDocument();
  });

  it("2) External domain + same tab (Custom named window target) -> no external icon", () => {
    renderCtaLink({
      href: URLS.external,
      text: "External",
      target: TARGETS.customNamed,
    });

    expect(screen.queryByTestId("svgicon-new-tab")).not.toBeInTheDocument();
  });

  it("3) Same domain + new tab -> no external icon", () => {
    const internalUrl = makeUrl(URLS.internal);

    // Ensure window.location matches internalUrl host/origin
    setPublicUrl(internalUrl.origin);

    renderCtaLink({
      href: URLS.internal,
      text: "Internal",
      target: TARGETS.newTab,
    });

    expect(screen.queryByTestId("svgicon-new-tab")).not.toBeInTheDocument();
  });

  it("4) Same domain + same tab (Active browser: no target) -> no external icon", () => {
    const internalUrl = makeUrl(URLS.internal);

    setPublicUrl(internalUrl.origin);

    renderCtaLink({ href: URLS.internal, text: "Internal" });

    expect(screen.queryByTestId("svgicon-new-tab")).not.toBeInTheDocument();
  });

  it("4) Same domain + same tab (Custom named window target) -> no external icon", () => {
    const internalUrl = makeUrl(URLS.internal);

    setPublicUrl(internalUrl.origin);

    renderCtaLink({
      href: URLS.internal,
      text: "Internal",
      target: TARGETS.customNamed,
    });

    expect(screen.queryByTestId("svgicon-new-tab")).not.toBeInTheDocument();
  });
});
