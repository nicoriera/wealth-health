import React from "react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number; // 1-based
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Generic Pagination component for HRnet.
 * Displays previous/next buttons and current page info.
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = "",
  disabled = false,
}) => {
  return (
    <nav
      className={`flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 ${className}`}
      aria-label="Pagination navigation">
      <span className="text-sm text-gray-600">
        Page {currentPage} / {totalPages}
      </span>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={disabled || currentPage <= 1}
          aria-label="Page précédente">
          Précédent
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          disabled={disabled || currentPage >= totalPages}
          aria-label="Page suivante">
          Suivant
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
