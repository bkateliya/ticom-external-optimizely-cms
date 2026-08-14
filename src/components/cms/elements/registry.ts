import { ComponentRegistry } from "@/lib/ts/component-props";
import { CTAButtonElement } from "./CTAButton";
import { CtaButtonElementType } from "./CTAButton/CTAButton.model";
import { CTALinkElement } from "./CTALink";
import { CtaLinkElementType } from "./CTALink/CTALink.model";
import { RichTextAreaElementType } from "./RichTextArea/RichTextArea.model";
import { RichTextAreaElement } from "./RichTextArea";
import { LinkElement } from "./Link";
import { LinkElementType } from "./Link/Link.model";
import { ImageElement } from "./Image";
import { ImageElementType } from "./Image/Image.model";

export const elementRegistry: ComponentRegistry = {
  [CtaButtonElementType.key]: CTAButtonElement,
  [CtaLinkElementType.key]: CTALinkElement,
  [LinkElementType.key]: LinkElement,
  [RichTextAreaElementType.key]: RichTextAreaElement,
  [ImageElementType.key]: ImageElement,
};
