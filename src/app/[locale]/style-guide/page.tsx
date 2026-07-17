/**
 * Living style-guide reference — renders every design token from the real
 * Tailwind theme (src/assets/tw-theme.css). If it looks wrong here, the token
 * is wrong. Specs: docs/style-guide.md.
 */

const RAMPS: { name: string; swatches: { label: string; cls: string; hex: string }[] }[] = [
  {
    name: "Red (brand)",
    swatches: [
      { label: "red-1", cls: "bg-red-1", hex: "#fff5f5" },
      { label: "red-2", cls: "bg-red-2", hex: "#fee9e9" },
      { label: "red-3", cls: "bg-red-3", hex: "#fbaeae" },
      { label: "red-4", cls: "bg-red-4", hex: "#ee0000" },
      { label: "red-5", cls: "bg-red-5", hex: "#cc0000" },
      { label: "red-6", cls: "bg-red-6", hex: "#a40000" },
    ],
  },
  {
    name: "Teal (interactive)",
    swatches: [
      { label: "teal-1", cls: "bg-teal-1", hex: "#f2feff" },
      { label: "teal-2", cls: "bg-teal-2", hex: "#e5f7fa" },
      { label: "teal-3", cls: "bg-teal-3", hex: "#bee7ec" },
      { label: "teal-4", cls: "bg-teal-4", hex: "#9bd7df" },
      { label: "teal-5", cls: "bg-teal-5", hex: "#007c8c" },
      { label: "teal-6", cls: "bg-teal-6", hex: "#00525d" },
      { label: "teal-light", cls: "bg-teal-light", hex: "#3fa8b5" },
    ],
  },
  {
    name: "Grey",
    swatches: [
      { label: "grey-1", cls: "bg-grey-1", hex: "#f7f7f7" },
      { label: "grey-2", cls: "bg-grey-2", hex: "#e8e8e8" },
      { label: "grey-3", cls: "bg-grey-3", hex: "#cccccc" },
      { label: "grey-4", cls: "bg-grey-4", hex: "#b9b9b9" },
      { label: "grey-5", cls: "bg-grey-5", hex: "#aaaaaa" },
      { label: "grey-6", cls: "bg-grey-6", hex: "#949494" },
      { label: "grey-7", cls: "bg-grey-7", hex: "#555555" },
      { label: "grey-8", cls: "bg-grey-8", hex: "#333333" },
    ],
  },
  {
    name: "Blue",
    swatches: [
      { label: "blue-1", cls: "bg-blue-1", hex: "#f5f9ff" },
      { label: "blue-2", cls: "bg-blue-2", hex: "#e9f1fb" },
      { label: "blue-3", cls: "bg-blue-3", hex: "#ccddf2" },
      { label: "blue-4", cls: "bg-blue-4", hex: "#b1cae9" },
      { label: "blue-5", cls: "bg-blue-5", hex: "#6694cd" },
      { label: "blue-6", cls: "bg-blue-6", hex: "#2a66b0" },
      { label: "blue-7", cls: "bg-blue-7", hex: "#1e518f" },
      { label: "blue-8", cls: "bg-blue-8", hex: "#143d6f" },
      { label: "blue-9", cls: "bg-blue-9", hex: "#07274e" },
    ],
  },
  {
    name: "Yellow / Green",
    swatches: [
      { label: "yellow-1", cls: "bg-yellow-1", hex: "#fffcf5" },
      { label: "yellow-2", cls: "bg-yellow-2", hex: "#fff8e9" },
      { label: "yellow-3", cls: "bg-yellow-3", hex: "#ffc758" },
      { label: "yellow-4", cls: "bg-yellow-4", hex: "#ffa358" },
      { label: "green", cls: "bg-green", hex: "#37a145" },
    ],
  },
];

const SEMANTIC: { label: string; cls: string; usage: string }[] = [
  { label: "foreground", cls: "bg-foreground", usage: "default text" },
  { label: "heading", cls: "bg-heading", usage: "headings (white in dark themes)" },
  { label: "muted", cls: "bg-muted", usage: "placeholder / secondary text" },
  { label: "disabled", cls: "bg-disabled", usage: "disabled text" },
  { label: "accent", cls: "bg-accent", usage: "accent text (brand red)" },
  { label: "link", cls: "bg-link", usage: "links" },
  { label: "link-hover", cls: "bg-link-hover", usage: "link hover" },
  { label: "border", cls: "bg-border", usage: "default borders" },
  { label: "border-strong", cls: "bg-border-strong", usage: "strong borders" },
  { label: "border-subtle", cls: "bg-border-subtle", usage: "subtle borders" },
  { label: "page", cls: "bg-page", usage: "page background" },
  { label: "page-alt", cls: "bg-page-alt", usage: "alternate page background" },
  { label: "error", cls: "bg-error", usage: "errors / validation" },
  { label: "success", cls: "bg-success", usage: "success states" },
  { label: "warning", cls: "bg-warning", usage: "warnings" },
];

const SPACING: { label: string; cls: string; px: string }[] = [
  { label: "3xs", cls: "w-3xs", px: "4px" },
  { label: "2xs", cls: "w-2xs", px: "8px" },
  { label: "xs", cls: "w-xs", px: "12px" },
  { label: "sm", cls: "w-sm", px: "16px" },
  { label: "md", cls: "w-md", px: "24px" },
  { label: "lg", cls: "w-lg", px: "32px" },
  { label: "xl", cls: "w-xl", px: "48px" },
  { label: "2xl", cls: "w-2xl", px: "64px" },
  { label: "3xl", cls: "w-3xl", px: "96px" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-2xl">
      <h2 className="border-b border-border-subtle pb-2xs">{title}</h2>
      {children}
    </section>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return <p className="u-paragraph-small text-muted mb-3xs">{children}</p>;
}

export default function StyleGuidePage() {
  return (
    <main className="container py-2xl">
      <p className="u-paragraph-small text-muted mb-3xs">Design system</p>
      <h1>TI.com style guide</h1>
      <p className="u-paragraph-large mb-2xl">
        Every sample on this page renders from the live Tailwind tokens
        (src/assets/tw-theme.css), extracted from ticom.global.portals.css.
      </p>

      <Section title="Color primitives">
        {RAMPS.map((ramp) => (
          <div key={ramp.name} className="mb-md">
            <h6 className="mb-2xs">{ramp.name}</h6>
            <div className="flex flex-wrap gap-2xs">
              {ramp.swatches.map((s) => (
                <div key={s.label} className="w-24">
                  <div className={`${s.cls} h-12 rounded-sm border border-border-subtle`} />
                  <p className="u-paragraph-small mb-0 mt-3xs">{s.label}</p>
                  <p className="u-paragraph-small text-muted mb-0">{s.hex}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Semantic colors">
        <Spec>
          Use these before primitives — they re-resolve inside themed sections.
          Available on every color utility: text-*, bg-*, border-*, fill-* …
        </Spec>
        <div className="flex flex-wrap gap-2xs mt-sm">
          {SEMANTIC.map((s) => (
            <div key={s.label} className="w-40">
              <div className={`${s.cls} h-12 rounded-sm border border-border-subtle`} />
              <p className="u-paragraph-small mb-0 mt-3xs">{s.label}</p>
              <p className="u-paragraph-small text-muted mb-0">{s.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <Spec>
          Roboto · weights 300 / 400 / 600 only. Bare elements are styled
          globally; the same styles are available as u-header-* / u-paragraph-*
          classes and as text-h* / text-body-* utilities (utilities carry no
          margin or responsive pair). Sizes switch at the md breakpoint (767px).
        </Spec>
        <div className="mt-md [&>*]:mb-md">
          <div>
            <Spec>u-header-extraLarge — 48/60 · 300 (phone 28/36)</Spec>
            <div className="u-header-extraLarge mb-0">Display heading</div>
          </div>
          <div>
            <Spec>h1 · u-header-1 · text-h1 — 34/40 · 300 (phone 28/36)</Spec>
            <h1 className="mb-0">Heading level 1</h1>
          </div>
          <div>
            <Spec>h2 · u-header-2 · text-h2 — 28/36 · 300 (phone 24/32)</Spec>
            <h2 className="mb-0">Heading level 2</h2>
          </div>
          <div>
            <Spec>h3 · u-header-3 · text-h3 — 24/32 · 300 (phone 20/28)</Spec>
            <h3 className="mb-0">Heading level 3</h3>
          </div>
          <div>
            <Spec>h4 · u-header-4 · text-h4 — 20/28 · 300 (phone 18/28 · 400)</Spec>
            <h4 className="mb-0">Heading level 4</h4>
          </div>
          <div>
            <Spec>h5 · u-header-5 · text-h5 — 16/24 · 600</Spec>
            <h5 className="mb-0">Heading level 5</h5>
          </div>
          <div>
            <Spec>h6 · u-header-6 · text-h6 — 14/20 · 600</Spec>
            <h6 className="mb-0">Heading level 6</h6>
          </div>
          <div>
            <Spec>u-paragraph-extraLarge · text-body-xl — 18/28</Spec>
            <p className="u-paragraph-extraLarge mb-0">
              Analog and embedded processing products for every design.
            </p>
          </div>
          <div>
            <Spec>u-paragraph-large · text-body-lg — 16/24</Spec>
            <p className="u-paragraph-large mb-0">
              Analog and embedded processing products for every design.
            </p>
          </div>
          <div>
            <Spec>p · u-paragraph-medium · text-body — 14/20 (body default)</Spec>
            <p className="mb-0">
              Analog and embedded processing products for every design. This is
              the default body style with a <a href="#">standard link</a> and{" "}
              <strong>semibold emphasis</strong>.
            </p>
          </div>
          <div>
            <Spec>u-paragraph-small · text-body-sm — 12/20</Spec>
            <p className="u-paragraph-small mb-0">
              Analog and embedded processing products for every design.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Spacing">
        <Spec>
          Named scale (p-sm, gap-md, mt-xl …). The numeric scale also works and
          matches ti.com&apos;s u-margin/u-padding numbers 1:1 (p-6 = 24px).
        </Spec>
        <div className="mt-sm">
          {SPACING.map((s) => (
            <div key={s.label} className="flex items-center gap-sm mb-3xs">
              <span className="u-paragraph-small mb-0 w-2xl">{s.label}</span>
              <span className="u-paragraph-small text-muted mb-0 w-2xl">{s.px}</span>
              <div className={`${s.cls} h-4 bg-red-5 rounded-sm`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <Spec>TI is a square system — rounded-sm (2px) is the default for UI.</Spec>
        <div className="flex gap-md mt-sm">
          <div className="text-center">
            <div className="size-16 bg-grey-2 border border-border rounded-sm" />
            <p className="u-paragraph-small mb-0 mt-3xs">rounded-sm · 2px</p>
          </div>
          <div className="text-center">
            <div className="size-16 bg-grey-2 border border-border rounded-md" />
            <p className="u-paragraph-small mb-0 mt-3xs">rounded-md · 6px</p>
          </div>
          <div className="text-center">
            <div className="size-16 bg-grey-2 border border-border rounded-full" />
            <p className="u-paragraph-small mb-0 mt-3xs">rounded-full</p>
          </div>
        </div>
      </Section>

      <Section title="Elevation">
        <Spec>Four levels (ti.com u-boxShadow-1…4) plus the focus ring.</Spec>
        <div className="flex flex-wrap gap-lg mt-md">
          <div className="shadow-1 bg-page rounded-sm p-md w-40">shadow-1</div>
          <div className="shadow-2 bg-page rounded-sm p-md w-40">shadow-2</div>
          <div className="shadow-3 bg-page rounded-sm p-md w-40">shadow-3</div>
          <div className="shadow-4 bg-page rounded-sm p-md w-40">shadow-4</div>
          <div className="shadow-focus bg-page rounded-sm p-md w-40">shadow-focus</div>
        </div>
      </Section>

      <Section title="Breakpoints & container">
        <div className="mt-sm [&_td]:pr-lg [&_td]:pb-3xs [&_th]:pr-lg [&_th]:pb-2xs [&_th]:text-left">
          <table className="u-paragraph-small">
            <thead>
              <tr>
                <th>Name</th>
                <th>Range</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>(default)</td>
                <td>≤ 766px — phone</td>
                <td>mobile-first base styles, max-md: for phone-only</td>
              </tr>
              <tr>
                <td>md</td>
                <td>≥ 767px — tablet</td>
                <td>md:*</td>
              </tr>
              <tr>
                <td>lg</td>
                <td>≥ 1240px — desktop</td>
                <td>lg:*</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-sm mb-0">
          This page sits in <code>.container</code>: centered, max-width 1240px,
          16px gutter on phone / 28px from tablet up (1184px content width).
        </p>
      </Section>
    </main>
  );
}
