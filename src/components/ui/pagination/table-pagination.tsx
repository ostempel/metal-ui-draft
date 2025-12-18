import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
export function DataTablePagination({ table }: { table: any }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();

  const canPrev = table.getCanPreviousPage();
  const canNext = table.getCanNextPage();

  // max 5 visible page buttons
  const getPages = () => {
    const maxVisible = 5;
    if (pageCount <= maxVisible)
      return Array.from({ length: pageCount }, (_, i) => i);

    const start = Math.max(0, Math.min(pageIndex - 2, pageCount - maxVisible));
    return Array.from({ length: maxVisible }, (_, i) => start + i);
  };

  const pages = getPages();
  const showLeftEllipsis = pages[0] > 0;
  const showRightEllipsis = pages[pages.length - 1] < pageCount - 1;

  return (
    <Pagination className="flex justify-end items-center space-x-2 py-2">
      <Label htmlFor="rows-per-page" className="text-sm font-medium">
        Rows per page
      </Label>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger id="rows-per-page" size="sm" className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <PaginationContent>
        <PaginationItem>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={!canPrev}
            onClick={() => table.previousPage()}
            aria-label="Previous page"
          >
            <IconChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {showLeftEllipsis && (
          <>
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.setPageIndex(0)}
                aria-label="Go to page 1"
              >
                1
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {pages.map((p) => {
          const active = p === pageIndex;
          return (
            <PaginationItem key={p}>
              <Button
                type="button"
                variant={active ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => table.setPageIndex(p)}
                aria-current={active ? "page" : undefined}
                aria-label={`Go to page ${p + 1}`}
              >
                {p + 1}
              </Button>
            </PaginationItem>
          );
        })}

        {showRightEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.setPageIndex(pageCount - 1)}
                aria-label={`Go to page ${pageCount}`}
              >
                {pageCount}
              </Button>
            </PaginationItem>
          </>
        )}

        {/* Next (always shown) */}
        <PaginationItem>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={!canNext}
            onClick={() => table.nextPage()}
            aria-label="Next page"
          >
            <IconChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
