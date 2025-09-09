"use client"

import AdminBox from "@/app/admin/components/card/AdminBox";
import AdminPgTop from "@/app/admin/components/card/AdminPgTop";
import Pagination from "@/app/admin/components/paging/Pagination";
import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10; // Define the number of items per page

export default function AdminMainShopList() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [bdList, setBdList] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    const delItem = async (id: string) => {

        if (!confirm("삭제하시겠습니까?")) {
            return;
        }

        const token = getAccessToken();
        if (token === "") {
            alert("로그인 해주세요.");
            return;
        }

        try {
            const result = await callAPI(HTTPMETHOD.DELETE, {}, `/api/admin/mgmt/${id}`, token);

            alert("삭제되었습니다.");

            callListBySearch();

        } catch (e: any) {
            alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
        }
    }
    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === "") {
            alert("로그인 해주세요.");
            return;
        }

        //query에서 list에서 필요한 값 가져옴
        const newUrl = new URL(window.location.href);
        const l_page = parseInt(newUrl.searchParams.get("page") ?? "1");
        setPage(l_page);

        const query_page = l_page;
        const query = `?order=DESC&take=${ITEMS_PER_PAGE}&page=${query_page}`;
        // const url = `/api/board/news${query}`;
        const url = `/api/admin/mgmt/shop${query}`;

        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            setBdList(result.data.mgmt);
            setTotalItems(result.data.meta.total);

        } catch (e: any) {
            alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
        }

    }

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get("page") ?? "1");

        setPage(page);
        callListBySearch();

    }, [searchParams])


    return (
        <div className="adm--wrap">
            <AdminPgTop tit="SHOP 관리" />
            <AdminBox><>
                <div className="adm--box-scrollWrap">
                    <div className="adm--box-scrollCont">


                        <div className="adm--pg-act">
                            <div className="adm--pg-act-btn">
                                <button className="btn purple medium radius" onClick={(e) => router.push("/admin/pages/main/shoplist/view")}>SHOP 등록</button>
                            </div>
                        </div>

                        <div className="admin--cl">
                            <div className="admin--cl-table newslist">
                                <div className="admin--cl-th">
                                    <div className="admin--cl-td"><p>No.</p></div>
                                    <div className="admin--cl-td img"><p>로고</p></div>
                                    <div className="admin--cl-td date"><p>타이틀(KR)</p></div>
                                    <div className="admin--cl-td date"><p>타이틀(EN)</p></div>
                                    <div className="admin--cl-td date"><p>타이틀(CN)</p></div>
                                    <div className="admin--cl-td date"><p>타이틀(CN_TW)</p></div>
                                    <div className="admin--cl-td title"><p>링크</p></div>
                                    <div className="admin--cl-td action"><p>관리</p></div>
                                </div>
                                {
                                    bdList && bdList.length > 0 &&
                                    bdList.map((item: any) =>
                                        <div className="admin--cl-tr" key={item.index}>
                                            <div className="admin--cl-td"><p>{item.index}</p></div>
                                            <div className="admin--cl-td img"><p>
                                                {
                                                    item.files && item.files.length > 0 &&
                                                    <img src={item.files[0].file_path} alt="로고" />
                                                }
                                            </p></div>
                                            <div className="admin--cl-td date"><p className="line-clamp-1">{item.title}</p></div>
                                            <div className="admin--cl-td date"><p>{item.title_en}</p></div>
                                            <div className="admin--cl-td date"><p>{item.title_cn}</p></div>
                                            <div className="admin--cl-td date"><p>{item.title_cn_tw}</p></div>
                                            <div className="admin--cl-td title"><p>{item.link}</p></div>
                                            <div className="admin--cl-td action">
                                                <div onClick={() => router.push(`/admin/pages/main/shoplist/view?id=${item.index}`)} className="btn primary xsmall radius">수정</div>
                                                <div className="btn grayBg xsmall radius" onClick={e => delItem(item.index)}>삭제</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <Pagination
                            totalItems={totalItems}
                            currentPage={page}
                            itemCountPerPage={ITEMS_PER_PAGE}
                        />

                    </div>
                </div>
            </></AdminBox>
        </div>
    )
}