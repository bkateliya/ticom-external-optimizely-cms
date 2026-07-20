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
import { TiImageMap } from "@/components/ui/ti/TiImages/TiImageMap/TiImageMap";
import { TiCard } from "@/components/ui/ti/TiCard/TiCard";
import { TiCarousel } from "@/components/ui/ti/TiCarousel/TiCarousel";
import { TiViewMore } from "@/components/ui/ti/TiViewMore/TiViewMore";
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

function ImageMapHelperDemo() {
  return (
    <Example title="Image map with pin (start → end image, animated)">
      <TiImageMap
        startImageAngle={-158}
        startImageOffset={200}
        startImageSrc="//www.ti.com/diagrams/tida-01414_tida01414_soundbaramplifier-image.jpg"
        endImageSrc="//www.ti.com/diagrams/tida-00738_tida-00738_blockdiagram_large.jpg"
        pins={[
          {
            linePath: "up right",
            positionHorizontal: "30%",
            positionVertical: "36%",
            href: "https://www.ti.com/",
            label: <>HEV/EV inverter &amp; motor control</>,
          },
        ]}
      />
    </Example>
  );
}

function CardCell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h6 className="mb-3 text-body-sm text-pl-text-color-secondary">{title}</h6>
      {children}
    </div>
  );
}

const CARD_DESCRIPTION = "This is the description / content to present to the user.";

function CardHelperDemo() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <CardCell title="Primary — title link + action">
        <TiCard>
          <a slot="title" href="//www.ti.com">
            This is the title
          </a>
          <div>{CARD_DESCRIPTION}</div>
          <a slot="action" href="//www.ti.com">
            Learn more
          </a>
        </TiCard>
      </CardCell>

      <CardCell title="Secondary — heading title + two actions">
        <TiCard appearance="secondary">
          <h3 slot="title">This is the title</h3>
          <div>{CARD_DESCRIPTION}</div>
          <a slot="action" href="//www.ti.com">
            Learn more
          </a>
          <a slot="action" href="//www.ti.com">
            Buy now
          </a>
        </TiCard>
      </CardCell>

      <CardCell title="Plain dark — heading title + action">
        <TiCard appearance="plain-dark">
          <h3 slot="title">This is the title</h3>
          <div>{CARD_DESCRIPTION}</div>
          <a slot="action" href="//www.ti.com">
            Learn more
          </a>
        </TiCard>
      </CardCell>

      <CardCell title="Callout — title link + button action">
        <TiCard appearance="callout">
          <a slot="title" href="//www.ti.com">
            This is the title
          </a>
          <div>{CARD_DESCRIPTION}</div>
          <ti-button slot="action" appearance="primary">
            <a href="#">Buy now</a>
          </ti-button>
        </TiCard>
      </CardCell>

      <CardCell title="Outlined — title link + button action">
        <TiCard appearance="outlined">
          <a slot="title" href="//www.ti.com">
            This is the title
          </a>
          <div>{CARD_DESCRIPTION}</div>
          <ti-button slot="action" appearance="primary">
            <a href="#">Buy now</a>
          </ti-button>
        </TiCard>
      </CardCell>

      <CardCell title="Outlined white — title link + button action">
        <TiCard appearance="outlined-white">
          <a slot="title" href="//www.ti.com">
            This is the title
          </a>
          <div>{CARD_DESCRIPTION}</div>
          <ti-button slot="action" appearance="primary">
            <a href="#">Buy now</a>
          </ti-button>
        </TiCard>
      </CardCell>

      <CardCell title="Primary — no title or actions">
        <TiCard>
          <div>{CARD_DESCRIPTION}</div>
        </TiCard>
      </CardCell>

      <CardCell title="Wide — no title or actions">
        <TiCard wide>
          <div>{CARD_DESCRIPTION}</div>
        </TiCard>
      </CardCell>

      <CardCell title="Top-alert card">
        <TiCard>
          <span slot="top-alert">Alert</span>
          <div>{CARD_DESCRIPTION}</div>
        </TiCard>
      </CardCell>

      <CardCell title="Plain white — clickable card (card-link)">
        <TiCard appearance="plain-white">
          <a href="http://www.ti.com/" slot="card-link">
            Card action link
          </a>
          <div>
            This is the <a href="#">description</a> / content to present to the user.
          </div>
          <ti-button slot="action" appearance="primary">
            <a href="#">Buy now</a>
          </ti-button>
        </TiCard>
      </CardCell>

      <CardCell title="Action bar — label, title, actionbar icons">
        <TiCard appearance="outlined-white">
          <span slot="label">Label (optional)</span>
          <h5 slot="title">Card with action bar</h5>
          <div>{CARD_DESCRIPTION}</div>
          <ti-button appearance="text icon-only compact" slot="actionbar">
            <ti-svg-icon aria-label="Edit">edit</ti-svg-icon>
          </ti-button>
          <ti-button appearance="text icon-only compact" slot="actionbar">
            <ti-svg-icon aria-label="Delete">delete</ti-svg-icon>
          </ti-button>
        </TiCard>
      </CardCell>

      <CardCell title="Related content">
        <TiCard appearance="outlined-white">
          <h5 slot="title">Card with related content</h5>
          <div>{CARD_DESCRIPTION}</div>
          <div slot="related">Related content</div>
        </TiCard>
      </CardCell>
    </div>
  );
}

function carouselCardSlides() {
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    content: (
      <TiCard appearance="plain-white">
        <p>Content {n}</p>
      </TiCard>
    ),
  }));
}

function CarouselHelperDemo() {
  return (
    <div className="flex flex-col gap-12">
      <CardCell title="Inline navigation (default)">
        <TiCarousel slides={carouselCardSlides()} />
      </CardCell>

      <CardCell title="Doubled gap between items">
        <TiCarousel gap="large" slides={carouselCardSlides()} />
      </CardCell>

      <CardCell title="Progress bar navigation (below)">
        <TiCarousel navigation="below" slides={carouselCardSlides()} />
      </CardCell>

      <CardCell title="Chip navigation, one slide per view">
        <TiCarousel
          navigation="chips"
          slidesPerViewDesktop={1}
          slidesPerViewTablet={1}
          slidesPerViewMobile={1}
          peekDesktop
          slides={[
            {
              title: "Slide one title",
              content: (
                <TiCard appearance="plain-white">
                  <h3 slot="title">Slide title 1</h3>
                  <div>{CARD_DESCRIPTION}</div>
                </TiCard>
              ),
            },
            {
              title: "Slide 2 title",
              content: (
                <TiCard appearance="plain-white">
                  <h3 slot="title">Slide title 2</h3>
                  <div>{CARD_DESCRIPTION}</div>
                </TiCard>
              ),
            },
            {
              title: "Third slide",
              content: (
                <TiCard appearance="plain-white">
                  <p>Content 3</p>
                </TiCard>
              ),
            },
          ]}
        />
      </CardCell>
    </div>
  );
}

function ViewMoreHelperDemo() {
  const longContent = (
    <p style={{ minHeight: "500px", backgroundColor: "#efefef" }}>
      This is some content that is long and could use hiding.
    </p>
  );
  return (
    <div className="flex flex-col gap-12">
      <CardCell title="Default collapsed">
        <TiViewMore>
          <h2>This is the content title</h2>
          {longContent}
        </TiViewMore>
      </CardCell>

      <CardCell title="Default expanded">
        <TiViewMore isExpanded>
          <h2>This is the content title</h2>
          {longContent}
        </TiViewMore>
      </CardCell>

      <CardCell title="Localized labels (replaces deprecated locale prop)">
        <TiViewMore expandActionLabel="查看更多" collapseActionLabel="收起">
          <h2>This is the content title</h2>
          {longContent}
        </TiViewMore>
      </CardCell>

      <CardCell title="With button control">
        <TiViewMore useButton>
          <h2>This is the content title</h2>
          {longContent}
        </TiViewMore>
      </CardCell>

      <CardCell title="Item mode (collapsedHeight 0) — show/hide items below a fixed list">
        <div>
          <h2>This is the content title</h2>
          <div>lorem ipsum testing</div>
          <div>lorem ipsum testing</div>
          <div>lorem ipsum testing</div>
          <div>lorem ipsum testing</div>
          <div>5th item</div>
          <TiViewMore collapsedHeight={0}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i}>hidden item {i + 6}</div>
            ))}
          </TiViewMore>
        </div>
      </CardCell>
    </div>
  );
}

const HELPERS: HelperTab[] = [
  { id: "image", label: "Image", content: <ImageHelperDemo /> },
  { id: "image-map", label: "Image Map", content: <ImageMapHelperDemo /> },
  { id: "card", label: "Card", content: <CardHelperDemo /> },
  { id: "carousel", label: "Carousel", content: <CarouselHelperDemo /> },
  { id: "view-more", label: "View More", content: <ViewMoreHelperDemo /> },
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
