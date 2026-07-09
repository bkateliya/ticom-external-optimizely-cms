import { render, screen, fireEvent } from "@testing-library/react";
import CtaButton, { CtaButtonProps } from "../CtaButton";
import defaultData from "./CtaButton.mock-data";

describe("GmiButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Snapshots", () => {
    it("matches snapshot with default props", () => {
      const { container } = render(<CtaButton {...defaultData} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with inverse variant", () => {
      const data: CtaButtonProps = {
        ...defaultData,
        ctaVariant: "fill",
        ctaSurface: "onBg",
      };
      const { container } = render(<CtaButton {...data} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with outline style", () => {
      const data: CtaButtonProps = {
        ...defaultData,
        ctaVariant: "outline",
        ctaSurface: "onBg",
      };
      const { container } = render(<CtaButton {...data} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with disabled state", () => {
      const data: CtaButtonProps = { ...defaultData, disabled: true };
      const { container } = render(<CtaButton {...data} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with custom className", () => {
      const data: CtaButtonProps = {
        ...defaultData,
        className: "custom-class",
      };
      const { container } = render(<CtaButton {...data} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with children", () => {
      const data: CtaButtonProps = { ...defaultData, text: undefined };
      const { container } = render(
        <CtaButton {...data}>
          <span>Child Content</span>
        </CtaButton>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it("renders with default props", () => {
    const data: CtaButtonProps = { ...defaultData };
    render(<CtaButton {...data} />);
    const button = screen.getByText("Button Text");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("cta", "brand", "filled", "base");
  });

  it("renders with different variants", () => {
    const data: CtaButtonProps = {
      ...defaultData,
      ctaVariant: "fill",
      ctaSurface: "onBg",
    };
    const { rerender } = render(<CtaButton {...data} />);
    expect(screen.getByText("Button Text")).toHaveClass("inverse");

    rerender(<CtaButton {...data} ctaVariant="outline" />);
    expect(screen.getByText("Button Text")).toHaveClass("brand");
  });

  it("renders with different styles", () => {
    const data: CtaButtonProps = {
      ...defaultData,
      ctaVariant: "outline",
      ctaSurface: "onBg",
    };
    const { rerender } = render(<CtaButton {...data} />);
    expect(screen.getByText("Button Text")).toHaveClass("outline");

    rerender(<CtaButton {...data} ctaVariant="fill" />);
    expect(screen.getByText("Button Text")).toHaveClass("filled");
  });

  it("handles disabled state", () => {
    render(<CtaButton {...defaultData} disabled />);
    const button = screen.getByText("Button Text");
    expect(button).toBeDisabled();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<CtaButton {...defaultData} onClick={handleClick} />);
    fireEvent.click(screen.getByText("Button Text"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with custom className", () => {
    render(<CtaButton {...defaultData} className="custom-class" />);
    expect(screen.getByText("Button Text")).toHaveClass("custom-class");
  });

  it("renders with children instead of text", () => {
    render(
      <CtaButton {...defaultData} text={undefined}>
        <span>Child Content</span>
      </CtaButton>,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("returns null when no content is provided", () => {
    const { container } = render(
      <CtaButton {...defaultData} text={undefined} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
