import ArrowLeft from "./icons/icon--arrow-left";
import ArrowRight from "./icons/icon--arrow-right";
import ArrowDashLeft from "./icons/icon--arrow-dash-left";
import ArrowDown from "./icons/icon--arrow-down";
import CarouselArrowLeft from "./icons/icon--carousel-arrow-left";
import CarouselArrowRight from "./icons/icon--carousel-arrow-right";
import CarouselPause from "./icons/icon--carousel-pause";
import CarouselPlay from "./icons/icon--carousel-play";
import CarouselPagedot from "./icons/icon--carousel-pagedot";
import CarouselActivePagedot from "./icons/icon--carousel-active-pagedot";
import TagClose from "./icons/icon--tag-close";
import ChevronDown from "./icons/icon--chevron-down";
import ChevronUp from "./icons/icon--chevron-up";
import Close from "./icons/icon--close";
import MenuClose from "./icons/icon--menu-close";
import Download from "./icons/icon--download";
import Facebook from "./icons/icon--facebook";
import FileDownload from "./icons/icon--file-download";
import FilterLines from "./icons/icon--filter-lines";
import HamburgerMenu from "./icons/icon--hamburger-menu";
import Instagram from "./icons/icon--instagram";
import Loading from "./icons/icon--loading";
import Magnifier from "./icons/icon--magnifier";
import NewTab from "./icons/icon--new-tab";
import NewWindow from "./icons/icon--new-window";
import NoImage from "./icons/icon--no-image";
import OutlineSearch from "./icons/icon--outline-search";
import Pause from "./icons/icon--pause";
import Pinterest from "./icons/icon--pinterest";
import Play from "./icons/icon--play";
import PlayControl from "./icons/icon--play-control";
import VideoPlay from "./icons/icon--video-play";
import Plus from "./icons/icon--plus";
import Refine from "./icons/icon--refine";
import Sorting from "./icons/icon--sorting";
import Tiktok from "./icons/icon--tiktok";
import Youtube from "./icons/icon--youtube";
import Share from "./icons/icon--share";
import ShareClose from "./icons/icon--share-close";
import ChevronRight from "./icons/icon--chevron-right";
import Checkmark from "./icons/icon--checkmark";
import ArrowDashRight from "./icons/icon--arrow-dash-right";
import AlertNeutral from "./icons/icon--alert-neutral";
import AlertPriority from "./icons/icon--alert-priority";
import AccordionPlus from "./icons/icon--accordion-plus";
import AccordionMinus from "./icons/icon--accordion-minus";
import IconAccordionPlus from "./icons/icon--accordion-plus";
import IconAccordionMinus from "./icons/icon--accordion-minus";
import IconHide from "./icons/icon--hide";
import IconShow from "./icons/icon--show";
import IconCalendar from "./icons/icon--calendar";

export const SocialIconMapping = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Tiktok,
  pinterest: Pinterest,
};

export type SocialIconTypes = keyof typeof SocialIconMapping;

export const IconMapping = {
  ...SocialIconMapping,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-down": ArrowDown,
  "arrow-dash-left": ArrowDashLeft,
  "carousel-arrow-left": CarouselArrowLeft,
  "carousel-arrow-right": CarouselArrowRight,
  "carousel-pause": CarouselPause,
  "carousel-play": CarouselPlay,
  "carousel-pagedot": CarouselPagedot,
  "carousel-active-pagedot": CarouselActivePagedot,
  "tag-close": TagClose,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  close: Close,
  "menu-close": MenuClose,
  download: Download,
  "file-download": FileDownload,
  "hamburger-menu": HamburgerMenu,
  loading: Loading,
  "filter-lines": FilterLines,
  magnifier: Magnifier,
  "new-tab": NewTab,
  "new-window": NewWindow,
  "no-image": NoImage,
  "outline-search": OutlineSearch,
  pause: Pause,
  play: Play,
  "play-control": PlayControl,
  "video-play": VideoPlay,
  plus: Plus,
  refine: Refine,
  sorting: Sorting,
  share: Share,
  "share-close": ShareClose,
  "chevron-right": ChevronRight,
  checkmark: Checkmark,
  "arrow-dash-right": ArrowDashRight,
  "alert-neutral": AlertNeutral,
  "alert-priority": AlertPriority,
  "accordion-plus": AccordionPlus,
  "accordion-minus": AccordionMinus,
  iconAccordionPlus: IconAccordionPlus,
  iconAccordionMinus: IconAccordionMinus,
  hide: IconHide,
  show: IconShow,
  calendar: IconCalendar,
} as const;

export type IconTypes = keyof typeof IconMapping;
