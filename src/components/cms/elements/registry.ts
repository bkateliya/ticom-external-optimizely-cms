import { ComponentRegistry } from "@/lib/ts/component-props";
import { CTAElement } from "./CTA";
import { CTAElementType } from "./CTA/CTA.model";
import { RichTextAreaElementType } from "./RichTextArea/RichTextArea.model";
import { RichTextAreaElement } from "./RichTextArea";
import { LinkElement } from "./Link";
import { LinkElementType } from "./Link/Link.model";
import { ImageElement } from "./Image";
import { ImageElementType } from "./Image/Image.model";
import { PromoContentElementType } from "./PromoContent/PromoContent.model";
import { PromoContentElement } from "./PromoContent";

export const elementRegistry: ComponentRegistry = {
  [CTAElementType.key]: CTAElement,
  [LinkElementType.key]: LinkElement,
  [RichTextAreaElementType.key]: RichTextAreaElement,
  [ImageElementType.key]: ImageElement,
  [PromoContentElementType.key]: PromoContentElement,
};
