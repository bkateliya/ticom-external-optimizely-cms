"use client";

import { TiButton } from "@/components/ui/ti/TiButton/TiButton";
import {
  PaginationChangeEventDetail,
  TiPagination,
} from "@/components/ui/ti/TiPagination/TiPagination";
import {
  TiScrollingStory,
  TiScrollingStorySlide,
} from "@/components/ui/ti/TiScrollingStory/TiScrollingStory";
import {
  SlidePanelChangeEventDetail,
  TiSlidePanel,
} from "@/components/ui/ti/TiSlidePanel/TiSlidePanel";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import {
  SlideshowChangeEventDetail,
  TiSlideShow,
  TiSlideShowElement,
} from "@/components/ui/ti/TiSlideshow/TiSlideShow";
import { useRef, useState } from "react";

// This needs to be in a separate file because event handlers can only be added in client components
export function PaginationTest() {
  const [state, setState] = useState<PaginationChangeEventDetail>();
  return (
    <div>
      <TiPagination
        totalItems={66}
        paginationOptions={[10, 25, 50]}
        onPaginationPageChange={(event) => {
          setState(event.detail);
        }}
      />
      <pre>TiPagination State: {JSON.stringify(state)}</pre>
    </div>
  );
}

export function SlidePanelTest() {
  const [state, setState] = useState<SlidePanelChangeEventDetail>();

  return (
    <div>
      <TiSlidePanel
        tiSlidePanelChange={(e) => setState(e.detail)}
        tiMetricsAction={(e) => console.log("metric", e)}
      >
        <TiSlidePanel.Page headingText="Page 1">
          <p>This is the first page</p>
        </TiSlidePanel.Page>
        <TiSlidePanel.Page
          headingText={
            <>
              Page <strong>2</strong> is <strong>strong</strong>
            </>
          }
        >
          <p>This is the second page</p>
          <ul>
            <li>Hello</li>
            <li>World</li>
          </ul>
        </TiSlidePanel.Page>
      </TiSlidePanel>
      <pre>TiSlidePanel State: {JSON.stringify(state)}</pre>
    </div>
  );
}

export function ScrollingStoryTest() {
  return (
    <div>
      <TiScrollingStory
        subText="Our difference"
        sectionHeadline="Sharper. Brighter. Better."
        slideChanged={(e) =>
          console.log("scrolling story active slide:", e.detail)
        }
      >
        <TiScrollingStorySlide
          highlight="Test 1"
          title="Subtitle tagline 1"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ipsam!"
          imgSrc="https://www.ti.com/content/dam/ticom/images/applications/grid-infrastructure/solar-farm.jpg"
          imgAlt="image 1 alt tag"
        />
        <TiScrollingStorySlide
          highlight="Test 2"
          title="Subtitle tagline 2"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ipsam!"
          imgSrc="https://www.ti.com/content/dam/ticom/images/applications/sensing/autodriving-car-truck.jpg"
          imgAlt="image 2 alt tag"
        />
        <TiScrollingStorySlide
          highlight="Test 3"
          title="Subtitle tagline 3"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ipsam!"
          imgSrc="https://www.ti.com/content/dam/ticom/images/applications/industrial/everyday-industrial-edge-ai.jpg"
          imgAlt="image 3 alt tag"
        />
        <TiScrollingStorySlide
          highlight="Test 4"
          title="Subtitle tagline 4"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam ad quae earum nihil aliquid?"
          imgSrc="https://www.ti.com/content/dam/ticom/images/themes/edge-ai/edge-ai-am6xa-graphic-platform.jpg"
          imgAlt="image 4 alt tag"
        />
      </TiScrollingStory>
    </div>
  );
}

export function SlideshowTest() {
  const [state, setState] = useState<SlideshowChangeEventDetail>();

  const ref = useRef<TiSlideShowElement>(null);
  return (
    <div>
      <TiSlideShow
        isPreview={false}
        ref={ref}
        slideElements={[
          {
            element: (
              <TiSlide
                key={0}
                thumbnailLabel={"aaa"}
                thumbnailSrc="https://www.ti.com/content/dam/ticom/images/themes/edge-ai/edge-ai-am6xa-graphic-platform.jpg"
                backgroundImageSrc="https://www.ti.com/content/dam/ticom/images/themes/edge-ai/edge-ai-am6xa-graphic-platform.jpg"
              >
                Text
              </TiSlide>
            ),
            isHidden: false,
          },
          {
            element: (
              <TiSlide
                key={1}
                thumbnailLabel={"bbb"}
                thumbnailSrc="https://www.ti.com/content/dam/ticom/images/themes/edge-ai/edge-ai-am6xa-graphic-platform.jpg"
                backgroundImageSrc="https://www.ti.com/content/dam/ticom/images/themes/edge-ai/edge-ai-am6xa-graphic-platform.jpg"
              >
                adsadsada
              </TiSlide>
            ),
            isHidden: false,
          },
        ]}
        tiSlideshowChange={(e) => setState(e.detail)}
      ></TiSlideShow>
      <pre>TiSlideShow State: {JSON.stringify(state)}</pre>
      <TiButton onClick={() => ref?.current?.next()}>Next</TiButton>

      <TiButton onClick={() => ref?.current?.goToSlide(0)}>Go to 0</TiButton>

      <TiButton onClick={() => ref?.current?.goToSlide(1)}>Go to 1</TiButton>
    </div>
  );
}
