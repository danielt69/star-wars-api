import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'


const Pagination = ({ count = 0, onPageChange, nextLink, prevLink, page = 0 }) => {
    if (!nextLink && !prevLink) return null;
    return (<>
        <nav
            className="bg-white flex items-center justify-between border-t border-gray-200 px-4 py-6"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{1 + (page * 10)}</span> to <span className="font-medium">{10 + (page * 10)}</span> of{' '}
                    <span className="font-medium">{count}</span> results
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                {prevLink && <button
                    onClick={() => onPageChange(prevLink)}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg transition transition-all"
                >
                    <ChevronLeftIcon className="w-5" />
                    Previous
                </button>}
                {nextLink && <button
                    onClick={() => onPageChange(nextLink)}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg transition transition-all"
                >
                    Next
                    <ChevronRightIcon className="w-5" />
                </button>}
            </div>
        </nav>
    </>);
}

export default Pagination;