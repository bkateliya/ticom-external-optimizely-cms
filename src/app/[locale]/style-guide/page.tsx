/**
 * Living style-guide reference — renders every design token from the Tailwind
 * theme in src/assets/tv-theme/. If it looks wrong here, the token is wrong.
 * Token source: --pl-* Polaris vars (src/assets/themes/root.css), extracted
 * from ticom.global.portals.css.
 */

import { TifButton } from "@ticom/form-components/react";
import {
  ButtonAppearance,
  ButtonColor,
  ComponentSize,
  ComponentTheme,
} from "@/components/ui/ti/enums";
import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";
import { ClientOnly } from "@/components/utilities/ClientOnly";
import { withAppContext } from "@optimizely/cms-sdk/react/server";

type Swatch = { label: string; cls: string };

const COLOR_GROUPS: { name: string; note?: string; swatches: Swatch[] }[] = [
  {
    name: "Text",
    swatches: [
      { label: "text-color-primary", cls: "bg-pl-text-color-primary" },
      { label: "text-color-primary-contrast", cls: "bg-pl-text-color-primary-contrast" },
      { label: "text-color-secondary", cls: "bg-pl-text-color-secondary" },
      { label: "text-color-secondary-contrast", cls: "bg-pl-text-color-secondary-contrast" },
      { label: "text-color-accent", cls: "bg-pl-text-color-accent" },
      { label: "text-color-accent-contrast", cls: "bg-pl-text-color-accent-contrast" },
      { label: "text-color-disabled", cls: "bg-pl-text-color-disabled" },
      { label: "text-color-disabled-contrast", cls: "bg-pl-text-color-disabled-contrast" },
    ],
  },
  {
    name: "Links",
    swatches: [
      { label: "link-color-primary", cls: "bg-pl-link-color-primary" },
      { label: "link-color-primary-contrast", cls: "bg-pl-link-color-primary-contrast" },
      { label: "link-color-secondary", cls: "bg-pl-link-color-secondary" },
      { label: "link-color-secondary-contrast", cls: "bg-pl-link-color-secondary-contrast" },
      { label: "link-color-tertiary", cls: "bg-pl-link-color-tertiary" },
      { label: "link-color-accent", cls: "bg-pl-link-color-accent" },
      { label: "link-color-accent-contrast", cls: "bg-pl-link-color-accent-contrast" },
    ],
  },
  {
    name: "Element",
    swatches: [
      { label: "element-color-primary-lighter", cls: "bg-pl-element-color-primary-lighter" },
      { label: "element-color-primary", cls: "bg-pl-element-color-primary" },
      { label: "element-color-primary-darker", cls: "bg-pl-element-color-primary-darker" },
      { label: "element-color-secondary-lighter", cls: "bg-pl-element-color-secondary-lighter" },
      { label: "element-color-secondary", cls: "bg-pl-element-color-secondary" },
      { label: "element-color-secondary-darker", cls: "bg-pl-element-color-secondary-darker" },
      { label: "element-color-tertiary-lighter", cls: "bg-pl-element-color-tertiary-lighter" },
      { label: "element-color-tertiary", cls: "bg-pl-element-color-tertiary" },
      { label: "element-color-tertiary-darker", cls: "bg-pl-element-color-tertiary-darker" },
      { label: "element-color-disabled", cls: "bg-pl-element-color-disabled" },
      { label: "element-color-disabled-variant", cls: "bg-pl-element-color-disabled-variant" },
      { label: "element-color-contrast", cls: "bg-pl-element-color-contrast" },
      { label: "element-color-contrast-variant", cls: "bg-pl-element-color-contrast-variant" },
      { label: "element-color-contrast-disabled", cls: "bg-pl-element-color-contrast-disabled" },
      { label: "element-color-contrast-disabled-variant", cls: "bg-pl-element-color-contrast-disabled-variant" },
    ],
  },
  {
    name: "Buttons",
    swatches: [
      { label: "button-primary-color", cls: "bg-pl-button-primary-color" },
      { label: "button-primary-color-hover", cls: "bg-pl-button-primary-color-hover" },
      { label: "button-primary-color-active", cls: "bg-pl-button-primary-color-active" },
      { label: "button-primary-text-color", cls: "bg-pl-button-primary-text-color" },
      { label: "button-secondary-color", cls: "bg-pl-button-secondary-color" },
      { label: "button-secondary-color-hover", cls: "bg-pl-button-secondary-color-hover" },
      { label: "button-secondary-color-active", cls: "bg-pl-button-secondary-color-active" },
      { label: "button-secondary-text-color", cls: "bg-pl-button-secondary-text-color" },
      { label: "button-tertiary-text-color", cls: "bg-pl-button-tertiary-text-color" },
      { label: "button-tertiary-text-color-hover", cls: "bg-pl-button-tertiary-text-color-hover" },
      { label: "button-tertiary-text-color-active", cls: "bg-pl-button-tertiary-text-color-active" },
      { label: "button-reversed-color", cls: "bg-pl-button-reversed-color" },
      { label: "button-reversed-color-active", cls: "bg-pl-button-reversed-color-active" },
      { label: "button-reversed-text-color-hover", cls: "bg-pl-button-reversed-text-color-hover" },
      { label: "button-disabled-color", cls: "bg-pl-button-disabled-color" },
      { label: "button-disabled-color-reverse", cls: "bg-pl-button-disabled-color-reverse" },
    ],
  },
  {
    name: "Inputs",
    swatches: [
      { label: "input-element-color", cls: "bg-pl-input-element-color" },
      { label: "input-element-color-disabled", cls: "bg-pl-input-element-color-disabled" },
      { label: "input-text-color", cls: "bg-pl-input-text-color" },
      { label: "input-text-color-disabled", cls: "bg-pl-input-text-color-disabled" },
      { label: "input-border-color", cls: "bg-pl-input-border-color" },
      { label: "input-border-color-focus", cls: "bg-pl-input-border-color-focus" },
      { label: "input-background-color", cls: "bg-pl-input-background-color" },
      { label: "input-background-color-hover", cls: "bg-pl-input-background-color-hover" },
      { label: "input-background-color-disabled", cls: "bg-pl-input-background-color-disabled" },
      { label: "input-placeholder-color", cls: "bg-pl-input-placeholder-color" },
    ],
  },
  {
    name: "Borders & dividers",
    swatches: [
      { label: "border-color-primary", cls: "bg-pl-border-color-primary" },
      { label: "border-color-secondary", cls: "bg-pl-border-color-secondary" },
      { label: "border-color-tertiary", cls: "bg-pl-border-color-tertiary" },
      { label: "border-color-accent", cls: "bg-pl-border-color-accent" },
      { label: "divider-color-primary", cls: "bg-pl-divider-color-primary" },
      { label: "divider-color-primary-contrast", cls: "bg-pl-divider-color-primary-contrast" },
      { label: "divider-color-secondary", cls: "bg-pl-divider-color-secondary" },
      { label: "divider-color-secondary-contrast", cls: "bg-pl-divider-color-secondary-contrast" },
    ],
  },
  {
    name: "Page & container backgrounds",
    swatches: [
      { label: "page-background-color-primary", cls: "bg-pl-page-background-color-primary" },
      { label: "page-background-color-secondary", cls: "bg-pl-page-background-color-secondary" },
      { label: "container-background-color-primary", cls: "bg-pl-container-background-color-primary" },
      { label: "container-background-color-primary-variant", cls: "bg-pl-container-background-color-primary-variant" },
      { label: "container-background-color-secondary", cls: "bg-pl-container-background-color-secondary" },
      { label: "container-background-color-secondary-variant", cls: "bg-pl-container-background-color-secondary-variant" },
      { label: "container-background-color-tertiary", cls: "bg-pl-container-background-color-tertiary" },
      { label: "container-background-color-tertiary-variant", cls: "bg-pl-container-background-color-tertiary-variant" },
    ],
  },
  {
    name: "Feedback",
    swatches: [
      { label: "error-color", cls: "bg-pl-error-color" },
      { label: "success-color", cls: "bg-pl-success-color" },
      { label: "warning-color", cls: "bg-pl-warning-color" },
    ],
  },
];

/* Section gradients are backgrounds, not colors — bg-pl-section-* utilities
   set background-color, which can't hold a gradient, so render the raw var. */
const GRADIENTS = [
  "section-background-color-primary",
  "section-background-color-secondary",
  "section-background-color-tertiary",
  "section-background-color-accent",
];

const TYPE_SCALE: { label: string; cls: string; spec: string }[] = [
  { label: "text-hero", cls: "text-hero", spec: "48/60 (phone 28/36)" },
  { label: "text-h1", cls: "text-h1", spec: "34/40 (phone 28/36)" },
  { label: "text-h2", cls: "text-h2", spec: "28/36 (phone 24/32)" },
  { label: "text-h3", cls: "text-h3", spec: "24/32 (phone 20/28)" },
  { label: "text-h4", cls: "text-h4", spec: "20/28 (phone 18/28)" },
  { label: "text-h5", cls: "text-h5", spec: "16/24" },
  { label: "text-h6", cls: "text-h6", spec: "14/20 (phone 14/28)" },
  { label: "text-body-xl", cls: "text-body-xl", spec: "18/28" },
  { label: "text-body-lg", cls: "text-body-lg", spec: "16/24" },
  { label: "text-body-md", cls: "text-body-md", spec: "14/20 (phone 14/24)" },
  { label: "text-body-sm", cls: "text-body-sm", spec: "12/20 (phone 12/24)" },
];

const SPACING: { label: string; cls: string; px: string }[] = [
  { label: "1", cls: "w-1", px: "4px" },
  { label: "2", cls: "w-2", px: "8px" },
  { label: "3", cls: "w-3", px: "12px" },
  { label: "4", cls: "w-4", px: "16px" },
  { label: "5", cls: "w-5", px: "20px" },
  { label: "6", cls: "w-6", px: "24px" },
  { label: "8", cls: "w-8", px: "32px" },
  { label: "12", cls: "w-12", px: "48px" },
  { label: "16", cls: "w-16", px: "64px" },
  { label: "24", cls: "w-24", px: "96px" },
];

const BUTTON_APPEARANCES: ButtonAppearance[] = [
  ButtonAppearance.solid,
  ButtonAppearance.outline,
  ButtonAppearance.ghost,
  ButtonAppearance.link,
];

// CTAs expose only primary and secondary — success/warning aren't offered.
const BUTTON_COLORS: ButtonColor[] = [
  ButtonColor.primary,
  ButtonColor.secondary,
];

const BUTTON_SIZES: ComponentSize[] = [
  ComponentSize.small,
  ComponentSize.medium,
  ComponentSize.large,
];

/* Mock CMS content so the real CtaList renders here exactly as it does on a
   page — CtaList → CTAElement → TiButton (theme comes from ThemeProvider). */
const CTA_LIST_DEMO = {
  ctas: [
    {
      _id: "demo-cta-order",
      __typename: "TI_CTA_Element",
      link: { url: { base: "", default: "/products" }, text: "Order now" },
      Variant: ButtonAppearance.solid,
      ButtonColor: ButtonColor.primary,
      Icon: null,
    },
    {
      _id: "demo-cta-support",
      __typename: "TI_CTA_Element",
      link: { url: { base: "", default: "/support" }, text: "Contact support" },
      Variant: ButtonAppearance.outline,
      ButtonColor: ButtonColor.primary,
      Icon: null,
    },
  ],
} as unknown as React.ComponentProps<typeof CtaList>["content"];

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const SECTIONS = [
  "Colors",
  "Typography",
  "Spacing",
  "Radius",
  "Elevation",
  "Buttons",
  "Breakpoints",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section id={slugify(title)} className="mb-16 scroll-mt-24">
      <h2 className="mb-6 border-b border-pl-border-color-tertiary pb-2">{title}</h2>
      {children}
    </section>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-body-sm text-pl-input-placeholder-color mb-1">{children}</p>
  );
}

function StyleGuidePage() {
  return (
    <main id="top" className="mx-auto w-full max-w-[1240px] px-4 md:px-6 pb-16 text-body-md text-pl-text-color-primary scroll-mt-6">
      <header className="pt-16 pb-8">
        <Spec>Design system</Spec>
        <h1 className="mb-3">TI.com style guide</h1>
        <p className="text-body-lg mb-0 max-w-[68ch]">
          Every sample renders from the live Tailwind tokens in
          src/assets/tv-theme/, mapped from the Polaris --pl-* variables. If it
          looks wrong here, the token is wrong.
        </p>
      </header>

      <nav
        aria-label="Jump to section"
        className="sticky top-0 z-10 -mx-4 mb-16 flex flex-wrap items-center gap-2 border-y border-pl-border-color-tertiary bg-pl-page-background-color-primary px-4 py-3 md:-mx-6 md:px-6"
      >
        <span className="text-body-sm text-pl-input-placeholder-color mb-0 mr-1">
          Jump to
        </span>
        {SECTIONS.map((title) => (
          <TifButton
            key={title}
            href={`#${slugify(title)}`}
            appearance={ButtonAppearance.ghost}
            color={ButtonColor.secondary}
            size={ComponentSize.small}
            theme={ComponentTheme.light}
          >
            {title}
          </TifButton>
        ))}
      </nav>

      <Section title="Colors">
        <Spec>
          Utilities mirror the Polaris names 1:1 — usable as text-pl-*, bg-pl-*,
          border-pl-*, fill-pl-* …
        </Spec>
        {COLOR_GROUPS.map((group) => (
          <div key={group.name} className="mb-8">
            <h6 className="mb-3">{group.name}</h6>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {group.swatches.map((s) => (
                <div
                  key={s.label}
                  className="overflow-hidden rounded border border-pl-border-color-tertiary"
                >
                  <div className={`${s.cls} h-14`} />
                  <p className="text-body-sm mb-0 break-words border-t border-pl-border-color-tertiary bg-pl-container-background-color-secondary-variant px-2 py-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mb-6">
          <h6 className="mb-3">Section gradients</h6>
          <Spec>
            Gradients, not colors — apply via style/background, not bg-pl-* (a
            background-color can&apos;t hold a gradient).
          </Spec>
          <div className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {GRADIENTS.map((g) => (
              <div
                key={g}
                className="overflow-hidden rounded border border-pl-border-color-tertiary"
              >
                <div className="h-14" style={{ background: `var(--pl-${g})` }} />
                <p className="text-body-sm mb-0 break-words border-t border-pl-border-color-tertiary bg-pl-container-background-color-secondary-variant px-2 py-1">
                  {g}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Typography">
        <Spec>
          Roboto. Every text-* utility is responsive by itself — the underlying
          --ti-text-* vars switch at 768px (tv-root.css), so no md: prefix is
          needed. Bare h1–h6 elements get the same scale plus margins (app.css).
        </Spec>
        <div className="mt-6">
          {TYPE_SCALE.map((t) => (
            <div key={t.label} className="mb-6">
              <Spec>
                {t.label} — {t.spec}
              </Spec>
              <div className={`${t.cls} mb-0`}>
                Analog and embedded processing for every design.
              </div>
            </div>
          ))}
          <div className="mb-6">
            <Spec>Inline elements</Spec>
            <p className="mb-0">
              Body copy with a <a href="#" className="text-pl-link-color-primary hover:underline">standard link</a>{" "}
              and <strong className="font-semibold">semibold emphasis</strong>.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Spacing">
        <Spec>
          4px base scale — matches ti.com&apos;s u-padding / u-margin numbers
          1:1 (p-6 = 24px). Generates p-*, m-*, gap-*, size-* …
        </Spec>
        <div className="mt-4">
          {SPACING.map((s) => (
            <div key={s.label} className="flex items-center gap-4 mb-1">
              <span className="text-body-sm mb-0 w-8">{s.label}</span>
              <span className="text-body-sm text-pl-input-placeholder-color mb-0 w-12">{s.px}</span>
              <div className={`${s.cls} h-4 bg-pl-element-color-primary rounded`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <Spec>TI is a square system — rounded (2px) is the default for UI.</Spec>
        <div className="flex flex-wrap gap-6 mt-4">
          <div className="text-center">
            <div className="size-16 bg-pl-container-background-color-secondary-variant border border-pl-border-color-primary rounded-none" />
            <p className="text-body-sm mb-0 mt-1">rounded-none</p>
          </div>
          <div className="text-center">
            <div className="size-16 bg-pl-container-background-color-secondary-variant border border-pl-border-color-primary rounded" />
            <p className="text-body-sm mb-0 mt-1">rounded · 2px</p>
          </div>
          <div className="text-center">
            <div className="h-8 w-24 bg-pl-container-background-color-secondary-variant border border-pl-border-color-primary rounded-tag" />
            <p className="text-body-sm mb-0 mt-1">rounded-tag · pill</p>
          </div>
          <div className="text-center">
            <div className="size-16 bg-pl-container-background-color-secondary-variant border border-pl-border-color-primary rounded-full" />
            <p className="text-body-sm mb-0 mt-1">rounded-full</p>
          </div>
        </div>
      </Section>

      <Section title="Elevation">
        <Spec>Four Polaris levels (ti.com u-boxShadow-1…4).</Spec>
        <div className="flex flex-wrap gap-8 mt-6">
          <div className="shadow-1 bg-pl-page-background-color-primary rounded p-6 w-40">shadow-1</div>
          <div className="shadow-2 bg-pl-page-background-color-primary rounded p-6 w-40">shadow-2</div>
          <div className="shadow-3 bg-pl-page-background-color-primary rounded p-6 w-40">shadow-3</div>
          <div className="shadow-4 bg-pl-page-background-color-primary rounded p-6 w-40">shadow-4</div>
        </div>
      </Section>

      <Section title="Buttons">
        <Spec>
          @ticom/form-components TifButton — used directly in every example
          below. Props are passed statically: appearance (
          {BUTTON_APPEARANCES.join(" · ")}), color ({BUTTON_COLORS.join(" · ")}),
          size ({BUTTON_SIZES.join(" · ")}), and theme (this is a server
          component, so theme is passed explicitly rather than read from
          context).
        </Spec>

        <div className="mb-8">
          <Spec>Single button — usage (renders a &lt;button&gt;)</Spec>
          <div className="flex flex-wrap items-center gap-6">
            <TifButton
              appearance={ButtonAppearance.solid}
              color={ButtonColor.primary}
              theme={ComponentTheme.light}
            >
              Order now
            </TifButton>
            <pre className="text-body-sm overflow-x-auto rounded bg-pl-container-background-color-secondary-variant p-4">
              {`import { TifButton } from "@ticom/form-components/react";
import { ButtonAppearance, ButtonColor, ComponentTheme } from "@/components/ui/ti/enums";

<TifButton
  appearance={ButtonAppearance.solid}
  color={ButtonColor.primary}
  theme={ComponentTheme.light}
>
  Order now
</TifButton>`}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <Spec>Single link — usage (add href, renders an &lt;a&gt;)</Spec>
          <div className="flex flex-wrap items-center gap-6">
            <TifButton
              appearance={ButtonAppearance.solid}
              color={ButtonColor.primary}
              href="/products"
              theme={ComponentTheme.light}
            >
              View products
            </TifButton>
            <pre className="text-body-sm overflow-x-auto rounded bg-pl-container-background-color-secondary-variant p-4">
              {`// Same component — passing href makes it render as an anchor
<TifButton
  href="/products"
  appearance={ButtonAppearance.solid}
  color={ButtonColor.primary}
  theme={ComponentTheme.light}
>
  View products
</TifButton>`}
            </pre>
          </div>
        </div>

        {BUTTON_APPEARANCES.map((appearance) => (
          <div key={appearance} className="mb-6">
            <Spec>appearance=&quot;{appearance}&quot;</Spec>
            <div className="flex flex-wrap items-center gap-3">
              {BUTTON_COLORS.map((color) => (
                <TifButton
                  key={color}
                  appearance={appearance}
                  color={color}
                  theme={ComponentTheme.light}
                >
                  {color}
                </TifButton>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <Spec>Sizes — appearance=&quot;solid&quot; color=&quot;primary&quot;</Spec>
          <div className="flex flex-wrap items-center gap-3">
            {BUTTON_SIZES.map((size) => (
              <TifButton
                key={size}
                appearance={ButtonAppearance.solid}
                color={ButtonColor.primary}
                size={size}
                theme={ComponentTheme.light}
              >
                size {size}
              </TifButton>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Spec>Variations</Spec>
          <div className="flex flex-wrap items-center gap-3">
            <TifButton
              appearance={ButtonAppearance.solid}
              color={ButtonColor.primary}
              iconName="arrow-right"
              theme={ComponentTheme.light}
            >
              With icon
            </TifButton>
            <TifButton
              appearance={ButtonAppearance.outline}
              color={ButtonColor.primary}
              href="#"
              theme={ComponentTheme.light}
            >
              As link
            </TifButton>
            <TifButton
              appearance={ButtonAppearance.solid}
              color={ButtonColor.primary}
              disabled
              theme={ComponentTheme.light}
            >
              Disabled
            </TifButton>
          </div>
        </div>

        <div className="mb-6">
          <Spec>
            Button group — CtaList renders a page&apos;s CTAs. Pass it CMS
            content and it maps each cta into a CTAElement (a themed TiButton)
            inside a TifButtonGroup; theme resolves from context.
          </Spec>
          <div className="flex flex-wrap items-center gap-6">
            <ClientOnly>
              <CtaList content={CTA_LIST_DEMO} />
            </ClientOnly>
            <pre className="text-body-sm overflow-x-auto rounded bg-pl-container-background-color-secondary-variant p-4">
              {`import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";

// content comes from the CMS (a CtaList component / contract)
<CtaList content={content} />

// Internally CtaList maps ctas into CTAElement inside a group:
<TifButtonGroup>
  {ctas.map((cta, index) => (
    <CTAElement key={cta._id || index} content={cta} />
  ))}
</TifButtonGroup>`}
            </pre>
          </div>
        </div>
      </Section>

      <Section title="Breakpoints">
        <div className="mt-4 [&_td]:pr-8 [&_td]:pb-1 [&_th]:pr-8 [&_th]:pb-2 [&_th]:text-left">
          <table className="text-body-sm">
            <thead>
              <tr>
                <th>Prefix</th>
                <th>Min-width</th>
                <th>Polaris range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>(none)</td>
                <td>0</td>
                <td>phone</td>
              </tr>
              <tr>
                <td>sm:</td>
                <td>480px</td>
                <td>large phone</td>
              </tr>
              <tr>
                <td>md:</td>
                <td>768px</td>
                <td>tablet (type scale switches here)</td>
              </tr>
              <tr>
                <td>lg:</td>
                <td>1024px</td>
                <td>small desktop</td>
              </tr>
              <tr>
                <td>xl:</td>
                <td>1240px</td>
                <td>desktop / page max-width</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <div className="mt-4 flex justify-center fixed right-[20px] bottom-[20px]">
        <TifButton
          href="#top"
          appearance={ButtonAppearance.ghost}
          color={ButtonColor.secondary}
          size={ComponentSize.small}
          iconName="arrow-up"
          theme={ComponentTheme.light}
        >
          Back to top
        </TifButton>
      </div>
    </main>
  );
}

export default withAppContext(StyleGuidePage);