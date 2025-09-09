//직접 만든 pagination

import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

interface Props {
    totalItems: number;
    itemCountPerPage: number;
    currentPage: number;
    pageHide?: boolean;
}

const PaginationArrow = ({ href, src, deactive }: { href: string, src: string, deactive: boolean }) => {
    if (deactive) {
        return (
            <li className={`${styles.move} ${styles.invisible}`}>
                <img className={`${styles.arrow} ${styles.invisible}`} src={src} alt="" />
            </li>
        );
    }
    return (
        <li className={styles.move}>
            <Link className={styles.moveLink} href={href}>
                <img className={styles.arrow} src={src} alt="" />
            </Link>
        </li>
    );
};
const PaginationPage = ({ href, pageNum, currentPage }: { href: string, pageNum: number, currentPage: number }) => {
    return (
        <li key={pageNum}>
            <Link href={href} className={`${styles.page} ${currentPage === pageNum ? styles.active : ''}`}>
                {pageNum}
            </Link>
        </li>
    );
};

export default function Pagination({ totalItems, itemCountPerPage = 10, currentPage = 1, pageHide = false }: Props) {
    const pageMax = 10;
    const totalPages = Math.ceil(totalItems / itemCountPerPage);
    const [start, setStart] = useState(1);
    const noPrev = start === 1;
    const noNext = start + pageMax - 1 >= totalPages;

    const searchParams = useSearchParams();

    const createPageURL = (page: number) => {
        if (page <= 0) page = 1;
        if (page > totalPages) page = totalPages;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        return `?${newSearchParams.toString()}`;
    };

    useEffect(() => {
        setStart(Math.floor((currentPage - 1) / pageMax) * pageMax + 1);
    }, [currentPage]);

    return (
        <div className={styles.wrapper}>
            <ul>
                {!pageHide && (
                    <>
                        <PaginationArrow href={createPageURL(1)} src="/image/icon_paging_arrow_first.png" deactive={noPrev} />
                        <PaginationArrow href={createPageURL(start - 1)} src="/image/icon_paging_arrow_back.png" deactive={noPrev} />
                    </>
                )}
                {[...Array(pageMax)].map((_, i) => {
                    const pageNum = start + i;
                    if (pageNum <= totalPages) {
                        return (
                            <PaginationPage key={pageNum} href={createPageURL(pageNum)} pageNum={pageNum} currentPage={currentPage} />
                        );
                    }
                    return null;
                })}
                {!pageHide && (
                    <>
                        <PaginationArrow href={createPageURL(start + pageMax)} src="/image/icon_paging_arrow_next.png" deactive={noNext} />
                        <PaginationArrow href={createPageURL(totalPages)} src="/image/icon_paging_arrow_end.png" deactive={noNext} />
                    </>
                )}
            </ul>
        </div>
    );
}