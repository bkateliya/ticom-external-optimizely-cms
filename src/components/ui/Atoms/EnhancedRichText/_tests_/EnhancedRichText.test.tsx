// EnhancedRichText.test.tsx
import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import EnhancedRichText from '../EnhancedRichText';
import {
  htmlExternal,
  htmlInternal,
  htmlImageWrapped,
  htmlTable,
} from './EnhancedRichText.mock';

// Mock CSS module classes for icons (stable class names for queries)
jest.mock('../../SvgIcon/SvgIcons.module.scss', () => ({
  svgIcon: 'svgIcon',
  em: 'em',
}));

// Ensure a consistent site origin for isExternalLink logic in the helper
beforeEach(() => {
  // Hostname must be consistent; port is not important for hostname comparison
  window.history.pushState({}, '', 'http://localhost/');
});

describe('EnhancedRichText', () => {
  test('external link: adds target _blank, rel, and new-tab icon + SR text', async () => {
    const { container } = render(<EnhancedRichText value={htmlExternal} />);

    await waitFor(
      () => {
        const link = container.querySelector(
          'a[href="https://external.example.com/page"]'
        ) as HTMLAnchorElement;

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('target', '_blank');

        const rel = link.getAttribute('rel') || '';
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');

        const sr = container.querySelector('span.screenReaderText');
        expect(sr).toBeTruthy();
        expect(sr?.textContent).toContain('(Opens in a new tab)');

        const iconSpan = container.querySelector('span.svgIcon.em');
        expect(iconSpan).toBeTruthy();
        expect(iconSpan?.querySelector('svg')).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  test('internal link: does not get external SR text or icon (regardless of target attribute)', async () => {
    const { container } = render(<EnhancedRichText value={htmlInternal} />);

    await waitFor(
      () => {
        const link = container.querySelector('a[href="/about"]') as HTMLAnchorElement;

        expect(link).toBeInTheDocument();

        // The new logic does not infer "external" from target, so we do NOT assert target=null.
        // We only assert that external affordances are not added.
        const sr = container.querySelector('span.screenReaderText');
        const icon = container.querySelector('span.svgIcon.em');

        expect(sr).toBeNull();
        expect(icon).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  test('image-wrapped link: not modified', async () => {
    const { container } = render(<EnhancedRichText value={htmlImageWrapped} />);

    await waitFor(
      () => {
        const link = container.querySelector('a[href="https://example.com"]') as HTMLAnchorElement;
        expect(link).toBeInTheDocument();

        const img = link.querySelector('img[alt="Image Link"]') as HTMLImageElement;
        expect(img).toBeInTheDocument();

        expect(container.querySelector('span.screenReaderText')).toBeNull();
        expect(container.querySelector('span.svgIcon.em')).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  test('table accessibility: th scope and data-column on cells', async () => {
    const { container } = render(<EnhancedRichText value={htmlTable} />);

    await waitFor(
      () => {
        const theadThs = container.querySelectorAll('thead th');
        theadThs.forEach((th) => expect(th).toHaveAttribute('scope', 'col'));

        const tbodyThs = container.querySelectorAll('tbody th');
        tbodyThs.forEach((th) => expect(th).toHaveAttribute('scope', 'row'));

        const headers = Array.from(theadThs).map((th) => th.textContent?.trim());
        const cells = container.querySelectorAll('tbody td, tbody th');
        cells.forEach((cell, index) => {
          const colIndex = index % (headers.length || 1);
          expect(cell.getAttribute('data-column')).toBe(headers[colIndex] || '');
        });
      },
      { timeout: 3000 }
    );
  });
});
