import React, { JSX, useEffect, useState } from 'react';
// Local
import svgStyles from '@/components/ui/Atoms/SvgIcon/SvgIcons.module.scss';
import clsx from 'clsx';
import { ReplacementToken, tokenReplace } from '@/lib/utils/string-utils';

export interface EnhancedRichTextOptionalProps {
  maxLines?: 1 | 2 | 3 | 4 | 5 | 6;
  maxCharacters?: number;
  listColumns?: 2 | 3 | 4;
}

interface EnhancedRichTextProps extends React.HTMLAttributes<HTMLElement> {
  value: string;
  tokens?: ReplacementToken[];
  parentElementType?: keyof JSX.IntrinsicElements;
  options?: EnhancedRichTextOptionalProps;
}

const EnhancedRichText = (props: EnhancedRichTextProps): JSX.Element => {
  const { value, tokens, className, parentElementType = 'div', options, ...otherProps } = props;

  // Cast to React.ElementType to avoid exhaustive JSX intrinsic element checking
  const Tag = parentElementType as React.ElementType;

  const updatedValue = useEnhancedRichText({ value, tokens, options });
  if (!updatedValue) return <></>;
  return (
    <Tag
      {...otherProps}
      className={getRteClassNames(className, options)}
      data-component="helpers/atoms/richtext"
      style={{ ...otherProps.style }}
      dangerouslySetInnerHTML={{ __html: updatedValue }}
    />
  );
};

export function getRteClassNames(
  className: string | undefined,
  options: EnhancedRichTextOptionalProps | undefined
) {
  const { maxLines, listColumns } = options || {};
  return clsx(
    'rte',
    className,
    listColumns ? `list-columns-${listColumns}` : undefined,
    maxLines ? `line-clamp-${maxLines}` : undefined
  );
}
const NEW_TAB_ICON_STRING = `<span class="${svgStyles.svgIcon} ${svgStyles.svgIconLeftMargin} ${svgStyles.em}" style="text-decoration:none;display:inline-block">
  <svg aria-hidden="true" class="inline ml-2 -mt-1 h-em w-em" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2222 18.2222H5.77778V5.77778H12V4H5.77778C4.79111 4 4 4.8 4 5.77778V18.2222C4 19.2 4.79111 20 5.77778 20H18.2222C19.2 20 20 19.2 20 18.2222V12H18.2222V18.2222ZM13.6556 4V5.81269H16.9094L8 14.7221L9.27795 16L18.1873 7.09063V10.3444H20V4H13.6556Z" fill="currentColor"/>
  </svg>
</span>`;
const DOWNLOAD_ICON_STRING = `<span class="${svgStyles.svgIcon} ${svgStyles.svgIconLeftMargin} ${svgStyles.em}" style="text-decoration:none;display:inline-block">
  <svg aria-hidden="true" class="inline ml-2 -mt-1 h-em w-em" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM11 6C11.5523 6 12 6.44772 12 7V12.5859L14.293 10.293C14.6835 9.90244 15.3165 9.90244 15.707 10.293C16.0976 10.6835 16.0976 11.3165 15.707 11.707L11.707 15.707C11.6592 15.7548 11.6065 15.7976 11.5498 15.835C11.5121 15.8599 11.4727 15.8811 11.4326 15.9004C11.3874 15.9222 11.3407 15.9412 11.292 15.9561C11.2717 15.9622 11.251 15.9668 11.2305 15.9717C11.2191 15.9744 11.2078 15.9772 11.1963 15.9795C11.1859 15.9816 11.1754 15.9826 11.165 15.9844C11.1112 15.9933 11.0563 16 11 16C10.9433 16 10.8881 15.9934 10.834 15.9844C10.8236 15.9826 10.8131 15.9816 10.8027 15.9795C10.7912 15.9772 10.7799 15.9744 10.7686 15.9717C10.748 15.9668 10.7273 15.9623 10.707 15.9561C10.6584 15.9412 10.6116 15.9222 10.5664 15.9004C10.5266 15.8812 10.4877 15.8597 10.4502 15.835C10.3935 15.7976 10.3408 15.7548 10.293 15.707L6.29297 11.707C5.90244 11.3165 5.90244 10.6835 6.29297 10.293C6.68349 9.90244 7.31651 9.90244 7.70703 10.293L10 12.5859V7C10 6.44772 10.4477 6 11 6Z" />
  </svg>
</span>`;
const NON_NAV_PROTOCOLS = new Set(['mailto:', 'tel:', 'data:', 'about:']);
function isExternalLink(href: string): boolean {
  try {
    const trimmed = (href || '').trim();
    if (!trimmed || trimmed === '#' || /^javascript:/i.test(trimmed)) return false;
    if (typeof window === 'undefined') return false;
    const base = window.location;
    const url = new URL(trimmed, base.origin);
    if (NON_NAV_PROTOCOLS.has(url.protocol)) return false;
    return url.hostname !== base.hostname;
  } catch {
    return false;
  }
}
function mergeRel(existingRel: string | null | undefined, additions: string[]): string {
  const set = new Set<string>((existingRel || '').split(/\s+/).filter(Boolean));
  additions.forEach((a) => set.add(a));
  return Array.from(set).join(' ');
}
function appendOnce(el: Element, selector: string, html: string) {
  if (!el.querySelector(selector)) el.insertAdjacentHTML('beforeend', html);
}

type UseEnhancedRichTextArgs = Pick<EnhancedRichTextProps, 'value' | 'tokens'> & {
  options?: EnhancedRichTextOptionalProps;
};

function truncateHtmlContentByTextLength(root: ParentNode, maxCharacters: number): boolean {
  const effectiveLimit = Math.min(260, Math.max(0, Math.floor(Number(maxCharacters) || 0)));

  let remaining = effectiveLimit;
  let didTruncate = false;

  const truncateNode = (node: Node) => {
    if (remaining <= 0) {
      node.parentNode?.removeChild(node);
      didTruncate = true;
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (text.length <= remaining) {
        remaining -= text.length;
        return;
      }

      node.textContent = text.slice(0, remaining);
      remaining = 0;
      didTruncate = true;
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      if (element.tagName.toLowerCase() === 'img') {
        return;
      }

      const children = Array.from(node.childNodes);
      for (const child of children) {
        truncateNode(child);
      }

      if (!node.hasChildNodes()) {
        node.parentNode?.removeChild(node);
      }
    }
  };

  const children = Array.from(root.childNodes);
  for (const child of children) {
    truncateNode(child);
  }

  if (!didTruncate) {
    return false;
  }

  return true;
}

export function useEnhancedRichText({ value, tokens, options }: UseEnhancedRichTextArgs) {
  const richTextContent = tokens ? tokenReplace(value, tokens) : value;
  const [content, setContent] = useState(richTextContent);
  const updatedField = content || '';
  useEffect(() => {
    const template = document.createElement('template');
    template.innerHTML = richTextContent || '';

    if (options?.maxCharacters) {
      truncateHtmlContentByTextLength(template.content, options.maxCharacters);
    }

    const links = Array.from(template.content.querySelectorAll('a'));
    links.forEach((a) => {
      if (a.querySelector('img')) return;
      const href = a.getAttribute('href') || '';
      const title = a.getAttribute('title')?.trim() ?? '';
      const linkText = (a.textContent ?? '').replace(/\s+/g, ' ').trim();
      if (title && linkText && title === linkText) {
        a.removeAttribute('title'); //Removing title attribute if it is the same as link text to avoid redundancy for screen readers
      }
      const external = isExternalLink(href);
      if (external && !(a.getAttribute('target') || '').trim()) {
        a.setAttribute('target', '_blank');
      }
      const opensInNewTab = (a.getAttribute('target') || '').trim() === '_blank';
      if (!opensInNewTab) return; // ensures target=_self never shows SR text
      a.setAttribute('rel', mergeRel(a.getAttribute('rel'), ['noopener', 'noreferrer']));
      appendOnce(
        a,
        'span.screenReaderText',
        `<span class="screenReaderText"> (Opens in a new tab)</span>`
      );
      if (external) {
        appendOnce(
          a,
          `span.${svgStyles.svgIcon}.${svgStyles.svgIconLeftMargin}.${svgStyles.em}`,
          NEW_TAB_ICON_STRING
        );
      }
    });
    // Table accessibility enhancements
    const tables = template.content.querySelectorAll('table');
    tables.forEach((table) => {
      table.querySelectorAll('thead th').forEach((th) => th.setAttribute('scope', 'col'));
      table.querySelectorAll('tbody th').forEach((th) => th.setAttribute('scope', 'row'));
      const headerElements = table.querySelectorAll('thead th');
      if (headerElements.length > 0) {
        const headers = Array.from(headerElements).map((th) => th.textContent?.trim() || '');
        table.querySelectorAll('tbody td, tbody th').forEach((cell, index) => {
          cell.setAttribute('data-column', headers[index % headers.length]);
        });
      }
    });
    setTimeout(() => {
      setContent(template.innerHTML);
    }, 0);
  }, [options?.maxCharacters, richTextContent]);
  return updatedField;
}
export default EnhancedRichText;
