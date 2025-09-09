//https://www.npmjs.com/package/react-paginate

import { useState } from "react";
// import ReactPaginate from "react-paginate";
import "./PaginatedItems.css";

type Props = {
    itemsMax: number,
    itemsPerPage: number,
    pageHandler: any
}

function PaginatedItems({ itemsMax, itemsPerPage, pageHandler }: Props) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;

    const pageCount = Math.ceil(itemsMax / itemsPerPage);

    return (
        <>
            {/* <ReactPaginate
                className="react-paginate"
                breakLabel="..."
                nextLabel="다음 >"
                onPageChange={(e) => pageHandler(e.selected)}
                pageRangeDisplayed={10}
                pageCount={pageCount}
                previousLabel="< 이전"
                renderOnZeroPageCount={null}
            /> */}
        </>
    );
}

export default PaginatedItems;