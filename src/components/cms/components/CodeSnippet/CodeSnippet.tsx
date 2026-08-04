/**
 * Code Snippet — TXI-609.
 *
 * Renders authored code as a syntax-highlighted, copyable block, matching the
 * AEM component it replaces:
 * https://www.ti.com/developer-api/store-api/order-api/create.html
 *
 * Visual parity: live composes two stylesheets, and the slots below reproduce
 * the result. Prism's "Tomorrow" theme supplies the surface, mono stack and
 * token palette; TI's own `.ti_aem-codeSnippet code` rule layers a second set of
 * padding on top. That is why padding is split across `block` and `code` instead
 * of collapsed — together they put the text 35px in from the left edge and 44px
 * down from the top. Measures are em-relative to a pinned 14px because ti.com's
 * body font-size is 14px against our 16px; pinning it is what makes every
 * derived value land on live's pixels. The block never reflows, it scrolls
 * horizontally, at every breakpoint.
 *
 * Content pipeline: `text` is rich text rather than a string because a Text
 * property in this CMS is single-line whatever its configured length, so pasted
 * code lost every newline — and with the snippet on one line, Prism read all of
 * it as a single comment. Rich text stores one paragraph per line and
 * HTML-encodes the content, so it is flattened and then decoded. That order is
 * required: entities arrive as literal text (`&nbsp;`, `&lt;`), so they have to
 * be decoded before non-breaking spaces can become the real indentation
 * whitespace-sensitive languages depend on.
 *
 * Client component: the copy button needs browser state, and a client module
 * bundles its imports, so Prism ships to the browser (~26KB gzipped).
 * Highlighting still runs during SSR, so the cost is bundle size rather than a
 * flash of unhighlighted code.
 */

"use client";

import Prism from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-python";
import "prismjs/components/prism-basic";
import "prismjs/components/prism-vbnet";

import { decode } from "html-entities";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { OptiComponentProps } from "@/lib/ts/component-props";

import { CodeSnippetComponentType } from "./CodeSnippet.model";

const DEFAULT_LANGUAGE = "bash";

/** Prism's copy-to-clipboard plugin wording, which the live chip uses. */
const IDLE = "Copy";
const DONE = "Copied!";
const FAILED = "Use Ctrl+c to copy";

type RichTextNode = { type?: string; text?: string; children?: RichTextNode[] };

/** Rich text nodes that close a line when flattened. */
const LINE_ENDING_TYPES = new Set([
  "paragraph",
  "heading",
  "blockquote",
  "listItem",
  "codeBlock",
]);

/** Flattens rich text to plain code, one line per block-level node. */
function richTextToCode(node: RichTextNode | undefined): string {
  if (!node) {
    return "";
  }
  if (typeof node.text === "string") {
    return node.text;
  }
  if (node.type === "br" || node.type === "linebreak") {
    return "\n";
  }
  const inner = (node.children ?? []).map(richTextToCode).join("");
  return LINE_ENDING_TYPES.has(node.type ?? "") ? `${inner}\n` : inner;
}


export function CodeSnippetComponent({
  content,
}: OptiComponentProps<typeof CodeSnippetComponentType>) {
  const [label, setLabel] = useState(IDLE);

  const { wrapper, block, code, toolbar, copyButton } = TAILWIND_VARIANTS();

  const codeText = decode(
    richTextToCode(content?.text?.json as RichTextNode | undefined),
  )
    .replace(/\u00a0/g, " ")
    .replace(/\s+$/, "");

  if (!codeText) {
    return null;
  }

  // The CMS rejects defaultValue on properties, so Language defaults here.
  const language = content?.language || DEFAULT_LANGUAGE;
  const grammar = Prism.languages[language];

  // Prism escapes the code it is given, so its output is safe to inject. An
  // unrecognised language degrades to plain text rather than throwing.
  const highlighted = grammar
    ? Prism.highlight(codeText, grammar, language)
    : null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(codeText);
      setLabel(DONE);
    } catch {
      setLabel(FAILED);
    }
    setTimeout(() => setLabel(IDLE), 5000);
  }

  return (
    <div className={wrapper()}>
      <pre className={block()}>
        {highlighted ? (
          <code
            className={code({ class: `language-${language}` })}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <code className={code({ class: `language-${language}` })}>
            {codeText}
          </code>
        )}
      </pre>
      <div className={toolbar()}>
        <button type="button" onClick={copy} className={copyButton()}>
          <span aria-live="polite">{label}</span>
        </button>
      </div>
    </div>
  );
}

const TAILWIND_VARIANTS = tv(
  {
    slots: {
      wrapper: ["group", "relative", "my-[0.5em]", "text-[14px]/[1.5]"],

      block: [
        "overflow-auto",
        "bg-[#2d2d2d]",
        "p-[1em]",
        "font-[family-name:Consolas,Monaco,'Andale_Mono','Ubuntu_Mono',monospace]",
        "text-pl-text-color-secondary-contrast",
        "[tab-size:4]",

        // Prism generates the `.token` spans, so the palette applies as
        // descendant variants. Two rules look redundant but are not:
        // `.punctuation` needs an explicit colour because tokens nest, and
        // without it nested punctuation inherits its parent token's colour; and
        // the doubled `.token.token` selectors exist because three combos carry
        // two type classes from different colour groups (`builtin class-name`,
        // `function-name function`, `string url`). Prism settles those by source
        // order, which Tailwind does not guarantee, so the group that should win
        // is given the higher specificity instead.
        "[&_.token:is(.comment,.block-comment,.cdata,.doctype,.prolog)]:text-[#999]",
        "[&_.token.punctuation]:text-pl-text-color-secondary-contrast",
        "[&_.token:is(.tag,.attr-name,.namespace,.deleted)]:text-[#e2777a]",
        "[&_.token.function-name]:text-[#6196cc]",
        "[&_.token.token:is(.boolean,.function,.number)]:text-[#f08d49]",
        "[&_.token:is(.class-name,.constant,.property,.symbol)]:text-[#f8c555]",
        "[&_.token.token:is(.atrule,.builtin,.important,.keyword,.selector)]:text-[#cc99cd]",
        "[&_.token:is(.attr-value,.char,.regex,.string,.variable)]:text-[#7ec699]",
        "[&_.token.token:is(.entity,.operator,.url)]:text-[#67cdcc]",
        "[&_.token.inserted]:text-[green]",
        "[&_.token:is(.bold,.important)]:font-bold",
        "[&_.token.italic]:italic",
        "[&_.token.entity]:cursor-help",
      ],

      code: ["my-4", "block", "max-w-full", "px-[1.5em]", "py-[1em]"],

      toolbar: [
        "absolute",
        "top-[0.3em]",
        "right-[0.2em]",
        "z-10",
        "opacity-0",
        "transition-opacity",
        "duration-300",
        "ease-in-out",
        "group-hover:opacity-100",
        "group-focus-within:opacity-100",
      ],

      // The chip's size and box come from TI's ambient button rule on live,
      // which this app doesn't load, so they are explicit. `py-0` and the
      // inherited family stop the UA button defaults showing through, since
      // Tailwind's preflight isn't imported either, and the background stays
      // rgba() because Tailwind's `/20` modifier emits a color-mix() in a
      // different colour space.
      copyButton: [
        "inline-flex",
        "min-h-[40px]",
        "min-w-24",
        "cursor-pointer",
        "items-start",
        "justify-center",
        "rounded-[0.5em]",
        "border-0",
        "bg-[rgba(224,224,224,0.2)]",
        "px-[0.5em]",
        "py-0",
        "font-[family-name:inherit]",
        "text-[0.8em]",
        "whitespace-nowrap",
        "text-[#bbb]",
        "shadow-[0_2px_0_0_rgba(0,0,0,0.2)]",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-[#bbb]",
      ],
    },
  },
  // Required: `code` and `copyButton` each carry a font-size and a colour that
  // both begin with `text-`, which twMerge would treat as conflicting.
  { twMerge: false },
);
