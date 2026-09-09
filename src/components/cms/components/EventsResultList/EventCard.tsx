import NextLink from "next/link";
import { tv } from "tailwind-variants";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import type { UiIcon } from "@/components/ui/ti/TiSvgIcon/SvgIconMapping";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import {
  type NormalizedEvent,
  isOnDemand,
  formatEventDateRange,
  formatEventTime,
  ATTENDANCE_TYPE_LABELS,
  EVENT_TYPE_LABELS,
  LANGUAGE_LABELS,
  CTA_LABELS,
  ON_DEMAND_LABEL,
} from "./events-result-list.types";

export interface EventCardProps {
  event: NormalizedEvent;
  locale: string;
}

export function EventCard({ event, locale }: EventCardProps) {
  const typeLabel = EVENT_TYPE_LABELS[event.eventType] ?? event.eventType;
  const attendanceLabel = isOnDemand(event)
    ? ON_DEMAND_LABEL
    : (ATTENDANCE_TYPE_LABELS[event.attendanceType] ?? event.attendanceType);
  const ctaLabel = CTA_LABELS[event.ctaTitle] ?? event.ctaTitle;

  const dateRange = formatEventDateRange(event, locale);
  const time = formatEventTime(event, locale);
  // AEM only printed the location row for in-person events.
  const location = event.attendanceType === "in-person" ? event.location : null;
  const languages = event.languages
    .map(
      (lang) => LANGUAGE_LABELS[lang as keyof typeof LANGUAGE_LABELS] ?? lang,
    )
    .join(", ");
  // Authored as absolute www.ti.com urls, so NextLink renders a plain anchor.
  const href = event.ctaURL || null;

  return (
    <article className={card()}>
      {event.imageUrl && (
        <div className={cardImageWrap()}>
          <TiImage
            className={cardImage()}
            src={event.imageUrl}
            alt={event.imageAlt}
            href={href ?? undefined}
            ratio="rectangle"
          />
        </div>
      )}

      <div className={cardBody()}>
        <p className={cardLabel()}>
          {typeLabel}
          <span className={cardLabelSeparator()}>|</span>
          {attendanceLabel}
        </p>

        <DynamicHeading className={cardTitle()}>
          {href ? (
            <NextLink
              href={href}
              className={cardLink()}
              data-lid="eventlisting"
              data-navtitle={event.eventTitle}
            >
              {event.eventTitle}
            </NextLink>
          ) : (
            event.eventTitle
          )}
        </DynamicHeading>

        <div className={cardMeta()}>
          {dateRange && <EventMetaItem icon="calendar" label={dateRange} />}
          {time && <EventMetaItem icon="clock" label={time} />}
          {location && <EventMetaItem icon="location" label={location} />}
          {languages && <EventMetaItem icon="globe" label={languages} />}
        </div>

        {/* CMS rich text, capped at 300 chars by the Event content type. */}
        {event.description && (
          <div
            className={cardDescription()}
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        )}

        {href && (
          <NextLink
            href={href}
            className={cardCta()}
            data-lid={`eventlisting-${event.eventTitle}`}
            data-navtitle={ctaLabel}
          >
            <TiSvgIcon icon="arrow-right" size="s" iconStyle="secondary" />
            <span>{ctaLabel}</span>
          </NextLink>
        )}
      </div>
    </article>
  );
}

function EventMetaItem({ icon, label }: { icon: UiIcon; label: string }) {
  return (
    <div className={cardMetaItem()}>
      <TiSvgIcon
        icon={icon}
        size="s"
        iconStyle="tertiary"
        className={cardMetaIcon()}
      />
      <span>{label}</span>
    </div>
  );
}

/** Divider-separated stack of cards; renders nothing when the list is empty. */
export function EventCardList({
  events,
  locale,
}: {
  events: NormalizedEvent[];
  locale: string;
}) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className={list()}>
      <HeadingLevelContext headingLevel="increment">
        {events.map((event) => (
          <EventCard key={event.key} event={event} locale={locale} />
        ))}
      </HeadingLevelContext>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────

// Values measured on the live `ti_aem-eventComponent` — portals.css isn't
// loaded here, so every rule is ported to Tailwind.
// twMerge is off: it drops `text-label` / `text-body-md`, reading the theme's
// named font sizes as a text colour that the colour class then overrides.
const TAILWIND_VARIANTS = tv(
  {
    slots: {
      list: "flex flex-col",
      card: "flex flex-col gap-4 border-x-0 border-t-0 border-b border-solid border-b-pl-border-color-tertiary py-4 md:flex-row",
      // `ratio="rectangle"` takes the 16:9 crop off the width set here.
      cardImageWrap: "w-full shrink-0 md:w-[250px]",
      cardImage: "block w-full",
      cardBody: "flex min-w-0 flex-1 flex-col",
      cardLabel: "mb-1 text-label uppercase text-pl-text-color-primary",
      cardLabelSeparator: "mx-2",
      // 16px/400 — `u-font-weight-normal` overrides h5's own weight on live.
      cardTitle: "mb-2 text-h6 font-normal",
      cardLink: "text-pl-link-color-primary hover:underline",
      // Wraps with no row gap on live; stacks below the phone breakpoint.
      cardMeta: "mb-2 flex flex-col flex-wrap gap-x-4 md:flex-row",
      cardMetaItem:
        "flex items-center gap-2 text-body-md leading-5 text-pl-text-color-primary",
      cardMetaIcon: "shrink-0",
      cardDescription:
        "mb-4 text-body-md leading-5 text-pl-text-color-primary [&_p]:mb-4 [&>*:last-child]:mb-0",
      cardCta:
        "inline-flex items-center gap-2 self-start text-body-md leading-5 text-pl-link-color-primary hover:underline",
    },
  },
  { twMerge: false },
);
const {
  card,
  cardImageWrap,
  cardImage,
  cardBody,
  cardLabel,
  cardLabelSeparator,
  cardTitle,
  cardLink,
  cardMeta,
  cardDescription,
  cardCta,
  cardMetaItem,
  cardMetaIcon,
  list,
} = TAILWIND_VARIANTS();
