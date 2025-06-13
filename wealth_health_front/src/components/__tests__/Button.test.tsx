import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("should display the button text", () => {
    render(<Button>Test Button</Button>);
    expect(
      screen.getByRole("button", { name: "Test Button" })
    ).toBeInTheDocument();
  });

  it("should apply the primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-indigo-600", "text-white");
  });

  it("should apply the secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-100", "text-gray-700");
  });

  it("should apply the danger variant", () => {
    render(<Button variant="danger">Danger Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-600", "text-white");
  });

  it("should be disabled when disabled=true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // Check that the element has the disabled style classes in the general class
    expect(button.className).toContain("disabled:opacity-60");
    expect(button.className).toContain("disabled:cursor-not-allowed");
  });

  it("should display the loading spinner", () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should not call onClick while loading", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} loading>
        Loading Button
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should have type submit when specified", () => {
    render(<Button type="submit">Submit Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should apply custom CSS classes", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
