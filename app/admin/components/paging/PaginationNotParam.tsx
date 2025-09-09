//직접 만든 pagination

import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

interface Props {
    totalItems: number;
    itemCountPerPage: number;
    currentPage: number;
    pageHide?: boolean;
    onClick?: (num: number) => void;
}

export default function PaginationNotParam({ totalItems, itemCountPerPage, currentPage, pageHide = false, onClick }: Props) {
    const pageMax = 10;
    const totalPages = Math.ceil(totalItems / itemCountPerPage);
    const [start, setStart] = useState(1);
    const noPrev = start === 1;
    const noNext = start + pageMax - 1 >= totalPages;

    const pageHandlerDefault = (num: number) => {
        if (num <= 0) {
            num = 1;
        }
        // const newSearchParams = new URLSearchParams(window.location.search);
        // const thisUrl = new URL(window.location.href);
        // const thisOriginPath = thisUrl.origin + thisUrl.pathname;
        // newSearchParams.set('page', num.toString());
        // router.push(`${thisOriginPath}?${newSearchParams.toString()}`);
        onClick && onClick(num);
    };

    useEffect(() => {
        // if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
        // if (currentPage < start) setStart((prev) => prev - pageCount);

        setStart(Math.floor((currentPage - 1) / pageMax) * pageMax + 1);

    }, [currentPage]);

    return (
        <div className={styles.wrapper}>
            <ul>
                {
                    !pageHide ?
                        <>
                            <li key={'first'} className={`${styles.move} ${noPrev && styles.invisible}`}>
                                {
                                    noPrev ?
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_first.png" alt="" />
                                        :
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_first.png" alt="" onClick={e => pageHandlerDefault(1)} />
                                }
                            </li>
                            <li key={'before'} className={`${styles.move} ${noPrev && styles.invisible}`}>
                                {
                                    noPrev ?
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_back.png" alt="" />
                                        :
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_back.png" alt="" onClick={e => pageHandlerDefault(start - 1)} />
                                }
                            </li>
                        </>
                        :
                        <></>
                }
                {[...Array(pageMax)].map((a, i) => {
                    if (start + i <= totalPages) {
                        return (
                            <li key={start + i}>
                                <div className={`${styles.page} ${currentPage === start + i && styles.active}`}
                                    onClick={e => pageHandlerDefault(start + i)}>
                                    {start + i}
                                </div>
                            </li>
                        );
                    } else {
                        return false;
                    }
                })}
                {
                    !pageHide ?
                        <>
                            <li key={'after'} className={`${styles.move} ${noNext && styles.invisible}`}>
                                {
                                    noNext ?
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_next.png" alt="" />
                                        :
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_next.png" alt="" onClick={e => pageHandlerDefault(start + pageMax)} />
                                }
                            </li>
                            <li key={'end'} className={`${styles.move} ${noNext && styles.invisible}`}>
                                {
                                    noNext ?
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_end.png" alt="" />
                                        :
                                        <img className={styles.arrow} src="/image/icon_paging_arrow_end.png" alt="" onClick={e => pageHandlerDefault(totalPages)} />
                                }
                            </li>
                        </>
                        :
                        <></>
                }
            </ul>
        </div >
    );
}