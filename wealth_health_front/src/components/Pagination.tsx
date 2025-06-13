import React from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number; // 1-based
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  disabled?: boolean;
  isMobile?: boolean;
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
  isMobile = false,
}) => {
  const { t } = useTranslation();
  if (isMobile) {
    return (
      <nav
        className={`flex flex-row w-full items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200 ${className}`}
        aria-label="Pagination navigation">
        <div className="flex flex-row gap-2 w-full">
          <Button
            variant="secondary"
            onClick={onPrevious}
            disabled={disabled || currentPage <= 1}
            aria-label="Page précédente"
            className="w-full">
            {t("employeeList.pagination.previousPage")}
          </Button>
          <Button
            variant="secondary"
            onClick={onNext}
            disabled={disabled || currentPage >= totalPages}
            aria-label="Page suivante"
            className="w-full">
            {t("employeeList.pagination.nextPage")}
          </Button>
        </div>
      </nav>
    );
  }
  return (
    <nav
      className={`flex w-full items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 ${className} gap-2`}
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
          {t("employeeList.pagination.previousPage")}
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          disabled={disabled || currentPage >= totalPages}
          aria-label="Page suivante">
          {t("employeeList.pagination.nextPage")}
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
