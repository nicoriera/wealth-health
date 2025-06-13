import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    onPrevious: vi.fn(),
    onNext: vi.fn(),
    disabled: false,
  };

  it("should render desktop pagination with page info", () => {
    render(<Pagination {...defaultProps} isMobile={false} />);
    expect(screen.getByText(/Page 2 \/ 5/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /précédent/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /suivant/i })
    ).toBeInTheDocument();
    // Les boutons ne sont pas full width
    expect(screen.getByRole("button", { name: /précédent/i })).not.toHaveClass(
      "w-full"
    );
  });

  it("should render mobile pagination with full width buttons", () => {
    render(<Pagination {...defaultProps} isMobile={true} />);
    // Les boutons sont w-full
    expect(screen.getByRole("button", { name: /précédent/i })).toHaveClass(
      "w-full"
    );
    expect(screen.getByRole("button", { name: /suivant/i })).toHaveClass(
      "w-full"
    );
    // Il n'y a pas de texte "Page X / Y" (ou il est masqué)
    expect(screen.queryByText(/Page 2 \/ 5/)).not.toBeInTheDocument();
  });

  it("should disable previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} isMobile={true} />);
    expect(screen.getByRole("button", { name: /précédent/i })).toBeDisabled();
  });

  it("should disable next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} isMobile={true} />);
    expect(screen.getByRole("button", { name: /suivant/i })).toBeDisabled();
  });

  it("should call onPrevious and onNext when clicked", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        isMobile={false}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );
    screen.getByRole("button", { name: /précédent/i }).click();
    screen.getByRole("button", { name: /suivant/i }).click();
    expect(onPrevious).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });
});
