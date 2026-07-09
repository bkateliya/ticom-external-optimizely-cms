import React from 'react';
import { render, screen } from '@testing-library/react';
import SvgIcon, { IconTypes } from '../SvgIcon';

describe('SvgIcon', () => {
  const testIcons: NonNullable<IconTypes>[] = ['arrow-left', 'chevron-down', 'close', 'menu-close'];

  describe('Icon Rendering', () => {
    test.each(testIcons)('renders %s icon with correct attributes', (icon) => {
      const { container } = render(<SvgIcon icon={icon} />);
      const svg = container.querySelector('svg');

      // Snapshot test
      expect(container).toMatchSnapshot();

      // Functional tests
      expect(svg).toHaveAttribute('data-icon', icon);
      expect(svg).toHaveAttribute('fill', 'currentColor');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  describe('Props and Styling', () => {
    it('applies custom className and size', () => {
      const customClass = 'custom-class';
      const { container } = render(<SvgIcon icon="arrow-left" className={customClass} size="lg" />);
      const svg = container.querySelector('svg');

      // Snapshot test
      expect(container).toMatchSnapshot();

      // Functional tests
      expect(svg).toHaveClass(customClass);
      expect(svg).toHaveClass('lg');
    });

    it('handles title prop correctly', () => {
      const title = 'Test Icon Title';
      const { container } = render(<SvgIcon icon="arrow-left" title={title} />);

      // Snapshot test
      expect(container).toMatchSnapshot();

      // Functional tests
      expect(screen.getByTitle(title)).toBeInTheDocument();

      // Test without title
      const { container: containerWithoutTitle } = render(<SvgIcon icon="arrow-left" />);
      expect(containerWithoutTitle.querySelector('title')).not.toBeInTheDocument();
    });

    it('applies custom fill and viewBox', () => {
      const customViewBox = '0 0 48 48';
      const { container } = render(
        <SvgIcon icon="arrow-left" fill="none" viewBox={customViewBox} />
      );
      const svg = container.querySelector('svg');

      // Snapshot test
      expect(container).toMatchSnapshot();

      // Functional tests
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('viewBox', customViewBox);
    });
  });
});
