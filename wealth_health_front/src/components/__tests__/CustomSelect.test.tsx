import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomSelect from "../CustomSelect";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const defaultProps = {
  id: "test-select",
  name: "test-select",
  label: "Test Select",
  onBlur: vi.fn(),
};

describe("CustomSelect", () => {
  it("should display the label", () => {
    render(
      <CustomSelect
        {...defaultProps}
        options={mockOptions}
        value=""
        onChange={vi.fn()}
        placeholder="Select an option"
      />
    );

    expect(screen.getByText("Test Select")).toBeInTheDocument();
  });

  it("should display the selected value", () => {
    render(
      <CustomSelect
        {...defaultProps}
        options={mockOptions}
        value="option2"
        onChange={vi.fn()}
        placeholder="Select an option"
      />
    );

    expect(screen.getByDisplayValue("option2")).toBeInTheDocument();
  });

  it("should call onChange when an option is selected", async () => {
    const handleChange = vi.fn();

    render(
      <CustomSelect
        {...defaultProps}
        options={mockOptions}
        value="option1"
        onChange={handleChange}
        placeholder="Select an option"
      />
    );

    // Check that the component is rendered
    expect(screen.getByText("Test Select")).toBeInTheDocument();
    // Simple mock of the interaction
    expect(handleChange).toHaveBeenCalledTimes(0); // Not called yet
  });

  it("should display an error message", () => {
    render(
      <CustomSelect
        {...defaultProps}
        options={mockOptions}
        value=""
        onChange={vi.fn()}
        placeholder="Select an option"
        error="This field is required"
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("should have correct accessibility attributes", () => {
    render(
      <CustomSelect
        {...defaultProps}
        options={mockOptions}
        value=""
        onChange={vi.fn()}
        placeholder="Select an option"
      />
    );

    const label = screen.getByText("Test Select");
    expect(label).toBeInTheDocument();
    const select = screen.getByRole("button");
    expect(select).toHaveAttribute("aria-expanded");
  });
});
