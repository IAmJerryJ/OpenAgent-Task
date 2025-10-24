import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContactsGridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isSmallScreen: boolean;
}

function ContactsGridPagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  isSmallScreen,
}: ContactsGridPaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = isSmallScreen ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= Math.min(maxVisiblePages, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > maxVisiblePages + 1) {
          pages.push("...");
        }
      } else if (currentPage >= totalPages - 2) {
        if (totalPages > maxVisiblePages + 1) {
          pages.push("...");
        }
        for (
          let i = Math.max(2, totalPages - maxVisiblePages + 1);
          i <= totalPages - 1;
          i++
        ) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        pages.push(currentPage);
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="btn btn-sm btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous page"
      >
        {isSmallScreen ? <ChevronLeft className="w-4 h-4" /> : "Previous"}
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="btn btn-sm btn-disabled">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="btn btn-sm btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next page"
      >
        {isSmallScreen ? <ChevronRight className="w-4 h-4" /> : "Next"}
      </button>
    </div>
  );
}

export default ContactsGridPagination;
