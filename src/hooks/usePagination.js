import { useMemo } from 'react';

const DOTS = '...';

const range = (start, end) => {
	let length = end - start + 1;

	return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = (totalPages, currentPage) => {
	const siblingCount = 2;
	const totalPageCount = 5; //the total number of page numbers visible on the screen

	const paginationRange = useMemo(() => {
		if (totalPageCount >= totalPages) {
			return range(1, totalPages);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPages;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPages];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(totalPages - rightItemCount + 1, totalPages);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalPages, currentPage]);

	return paginationRange;
};

export { DOTS, usePagination };
