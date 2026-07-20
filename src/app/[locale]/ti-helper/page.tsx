/**
 * ti-* helper harness — static test bed for every ti-* wrapper component.
 * No CMS wiring. Each helper lives in its own tab.
 *
 * To add a future helper:
 *   1. Write a `<XxxHelperDemo />` component below with static examples.
 *   2. Append `{ id, label, content: <XxxHelperDemo /> }` to HELPERS.
 * Nothing in HelperTabs needs to change.
 */

import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { HelperTabs, HelperTab } from "./HelperTabs";

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h6 className="mb-3">{title}</h6>
      <div className="max-w-[480px]">{children}</div>
    </section>
  );
}

function ImageHelperDemo() {
  return (
    <>
      <Example title="Basic image — only src + alt">
        <TiImage
          src="//www.ti.com/diagrams/tida-01414_tida01414_soundbaramplifier-image.jpg"
          alt="Alt Tag"
        />
      </Example>

      <Example title="With link + slotted caption">
        <TiImage
          src="//www.ti.com/graphics/folders/partimages/OPA333.jpg"
          href="//www.ti.com"
          target="_blank"
          alt="Alt Tag"
          caption={
            <>
              Image caption <a href="//www.ti.com">with link</a>. Lorem, ipsum dolor.
            </>
          }
        />
      </Example>

      <Example title="Constrained ratio, square + zoom">
        <TiImage
          src="//www.ti.com/diagrams/tida-01414_tida01414_soundbaramplifier-image.jpg"
          ratio="square"
          alt="Alt Tag"
          zoom
        />
      </Example>

      <Example title="Hover microanimation (center) + zoom">
        <TiImage
          src="//www.ti.com/diagrams/tida-01414_tida01414_soundbaramplifier-image.jpg"
          ratio="square"
          alt="Alt Tag"
          zoom
          hoverAnimation="center"
        />
      </Example>

      <Example title="Rectangle + alternate large source + zoom">
        <TiImage
          src="//www.ti.com/diagrams/med_tida-00738_tida-00738_blockdiagram_large.jpg"
          srcLg="//www.ti.com/diagrams/tida-00738_tida-00738_blockdiagram_large.jpg"
          ratio="rectangle"
          alt="Alt Tag"
          zoom
        />
      </Example>

      <Example title="Zoom + caption title + download button">
        <TiImage
          src="//www.ti.com/diagrams/med_tida-00738_tida-00738_blockdiagram_large.jpg"
          srcLg="//www.ti.com/diagrams/tida-00738_tida-00738_blockdiagram_large.jpg"
          ratio="square"
          alt="Alt Tag"
          zoom
          zoomCaption
          zoomDownload
          downloadLabel="Download"
        />
      </Example>

      <Example title="Default fallback source (broken src)">
        <TiImage
          src="//www.ti.com/graphics/folders/partimages/BQ2060A.jpg"
          href="//www.ti.com/product/BQ2060A"
          target="_blank"
          srcDefault="//www.ti.com/content/dam/ticom/images/icons/illustrative-icons/products/processor-chip-icon.png"
          alt=""
        />
      </Example>
    </>
  );
}

const HELPERS: HelperTab[] = [
  { id: "image", label: "Image", content: <ImageHelperDemo /> },
  // Add future helpers here, e.g.
  // { id: "video", label: "Video", content: <VideoHelperDemo /> },
];

export default function TiHelperPage() {
  return (
    <main className="mx-auto w-full max-w-[1240px] px-4 md:px-6 py-16 text-pl-text-color-primary">
      <h1 className="mb-2">TI helper harness</h1>
      <p className="text-body-sm text-pl-text-color-secondary mb-8">
        Static test bed for ti-* helper wrappers. Add a helper by appending an entry to HELPERS.
      </p>
      <HelperTabs tabs={HELPERS} />
    </main>
  );
}
