'use client'
import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import AdmDataErrorTable from "@/app/admin/components/design/AdmDataErrorTable";
import { AdmListTableCellProps } from "@/app/admin/components/design/AdmListTableHeadRow";
import PaginationNotParam from "@/app/admin/components/paging/PaginationNotParam";
import { useConfirmPopupStore } from "@/app/admin/store/confirmPopupStore";
import useLoadingScreenStore from "@/app/admin/store/loadingScreenStore";
import { useToast } from "@/app/admin/store/useToastStore";
import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { convertToISO8601 } from "@/lib/util/commonUtil";
import { getAccessToken } from "@/lib/util/tokenClass";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10; // Define the number of items per page

interface ReplyListPopupProps {
    router?: any;
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
}

const ReplyListPopup: React.FC<ReplyListPopupProps> = ({ router, data, status, close, statusChange }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: 1001,
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        background: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
        },
        wrapper: {
            borderRadius: '6px',
            boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)',
            width: 'calc(100% - 40px)',
            maxWidth: '1600px',
            backgroundColor: '#fff',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
        },
        head: {
            width: '100%',
            height: '56px',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: ` 1px solid ${basicThemeColors.gray100}`,
        },
        title: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            margin: 0,
        },
        closeButton: {
            cursor: 'pointer',
            position: 'relative',
            width: '24px',
            height: '24px',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        body: {
            padding: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignSelf: 'stretch',
        },
        bodyBox: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignSelf: 'stretch',
        },
        bodyBoxHead: {
            width: '100%',
            height: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        bodyBoxHeadTitle: {
            fontSize: '18px',
            fontWeight: '600',
        },
        bodyBoxHeadRight: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        },
        bodyBoxHeadGoToUserDetailButton: {
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 12px',
            border: `1px solid ${basicThemeColors.gray300}`,
            backgroundColor: 'transparent',
            height: '24px',
            cursor: 'pointer'
        },
        bodyBoxInfoTable: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            border: `solid ${basicThemeColors.gray300}`,
            borderWidth: '0 1px 1px 0',
        },
        width50: {
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
        },
        bodyBoxInfoTableLabel: {
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '130px',
            padding: '0 24px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: basicThemeColors.gray100,
            border: `solid ${basicThemeColors.gray300}`,
            borderWidth: '1px 1px 0 1px',
        },
        bodyBoxInfoTableValue: {
            border: `solid ${basicThemeColors.gray300}`,
            borderWidth: '1px 0 0 0',
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
            fontSize: '16px',
        },
        bodyBoxHeadAppleButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 8px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '4px',
            border: `1px solid ${basicThemeColors.black}`,
            cursor: 'pointer',
            fontWeight: '600',
        },
        bodyBoxHeadGoogleButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 8px',
            backgroundColor: '#fff',
            color: basicThemeColors.gray500,
            border: `1px solid ${basicThemeColors.gray500}`,
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
        },
        bodyboxScrollTable: {
            borderTop: `1px solid ${basicThemeColors.gray300}`,
            borderBottom: `1px solid ${basicThemeColors.gray300}`,
            borderRight: `1px solid ${basicThemeColors.gray300}`,
            borderLeft: `1px solid ${basicThemeColors.gray300}`,
            maxHeight: '288px',
            minHeight: '288px',
            height: 'auto',
            overflow: 'auto',
        },
        bodyboxScrollTableRow: {
            display: 'flex',
            borderBottom: `1px solid ${basicThemeColors.gray300}`,
            // borderTop: `1px solid ${basicThemeColors.gray300}`,
            fontSize: '16px',
            width: '100%',
            minWidth: '1300px',
        },
        bodyBoxScrollTableLabel: {
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: `1px solid ${basicThemeColors.gray300}`,
            backgroundColor: basicThemeColors.gray100,
        },
        bodyBoxScrollTableValue: {
            padding: '0 16px',
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: `1px solid ${basicThemeColors.gray300}`,
            backgroundColor: basicThemeColors.white,
        }
    }

    const tableStructureData: AdmListTableCellProps[] = [
        { id: '', value: '채팅일시', size: '200px', cellKey: 'date' },
        { id: '', value: '사용자 닉네임', size: '220px', cellKey: 'name' },
        { id: '', value: '메시지 내용', size: '100%', cellKey: 'content' },
        { id: '', value: '신고횟수', size: '120px', cellKey: 'reportCount' },
        { id: '', value: '상태', size: '120px', cellKey: 'status' },
        { id: '', value: '관리', size: '150px', cellKey: 'status' },
        // { id: '', value: '결제상태', size: '100px', cellKey: 'productName' },
        // { id: '', value: '구독취소', size: '100px', cellKey: 'productName' }
    ];

    const [detailData, setDetailData] = useState<any>(null);
    useEffect(() => {
        if (data) {
            if (statusChange) {
                // console.log(data)
                // ApiGetDetailPopupData(data.data[0].chatId)
                setDetailData(data);
                setTotalItems(data.meta.total)
                if (statusChange) {
                    statusChange('success');
                }
            }
        }

    }, [data])

    // #region 페이지네이션 ====================================================
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const pagenationOnclick = (page: number) => {
        setPage(page);
        ApiGetDetailPopupData(detailData?.data?.[0].chatId, page)
    }
    // #endregion 페이지네이션 =================================================

    // #region 댓글 강제 삭제 ==================================================
    const { addToast } = useToast();
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const { showPopup } = useConfirmPopupStore()
    // 삭제 버튼 클릭 이벤트
    const deleteItem = (id: string) => {
        showPopup({
            title: <p>삭제 전 확인해주세요</p>,
            desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                APIdeleteComment(id)
                    .then(() => {
                        ApiGetDetailPopupData(detailData.data[0].chatId)
                        addToast('해당 내역을 삭제했습니다.')
                    })
                    .catch((e: any) => {
                        alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.')
                    })
                    .finally(() => {
                        hideLoading();
                    })
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    };
    // 신고하기 버튼 클릭 이벤트
    const reportItem = (id: string, reportedUserId: string) => {
        showPopup({
            title: <p>신고 전 확인해주세요</p>,
            desc: <p>신고한 댓글은 신고철회가 불가능합니다.<br />정말 신고처리 하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                APIreportComment(id, reportedUserId)
                    .then((res) => {
                        ApiGetDetailPopupData(detailData.data[0].chatId)
                        console.log(res.response.data.code)
                        if (res.response.data.code !== 2021) {
                            addToast('해당 사용자를 신고처리 했습니다.')
                        } else {
                            addToast('이미 신고처리 된 사용자입니다.', 3000, 'error')
                        }
                    })
                    .finally(() => {
                        hideLoading();
                    })
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    };
    // 댓글 신고 처리 API
    const APIreportComment = async (id: string, reportedUserId: string) => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }

        const url = `/api/admin/chat-comments/${id}/report`
        const param = {
            reportedUserId: reportedUserId,
            files: [],
            message: '관리자가 직접 신고처리한 댓글입니다.',//신고 메시지 내용
            eventTime: convertToISO8601(dayjs().toString()),
            reasonType: 'OTHER',
        }
        try {
            const res = await callAPI(HTTPMETHOD.PATCH, param, url, token)
            if (res) {
                return res;
            }
        } catch (e: any) {
            return e;
        }
    }
    // 댓글 강제 삭제 API
    const APIdeleteComment = async (id: string) => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }

        const url = `/api/admin/chat-comments/${id}`
        const param = {}
        try {
            const res = await callAPI(HTTPMETHOD.DELETE, param, url, token)
            if (res) {
                return true;
            }
        } catch (e: any) {
            return e;
        }
    }
    // 리스트 다시 불러오기 API
    const ApiGetDetailPopupData = async (id: string, pageProp: number = 1) => {
        try {
            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }
            const url = `/api/admin/chat-comments?chatId=${id}&page=${pageProp}&limit=${ITEMS_PER_PAGE}`;
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
            setDetailData(result.data);
            setTotalItems(result.data.meta.total)
            if (statusChange) {
                statusChange('success');
            }
        } catch (e) {
            if (e === null) return;
            if (statusChange) {
                statusChange('error');
            }
        }
    }
    // #endregion 댓글 강제 삭제 ===============================================

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                status === 'success' && detailData &&
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'회원 발송 내역'}</p>
                        <button onClick={close} style={styles.closeButton}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div style={styles.body}>
                        <div style={styles.bodyBox}>
                            <div style={styles.bodyBoxHead}>
                                <div style={styles.bodyBoxHeadTitle}>아티스트 채팅</div>
                            </div>
                            {
                                detailData &&
                                <div style={styles.bodyBoxInfoTable}>
                                    <div style={styles.width50}>
                                        <div style={styles.bodyBoxInfoTableLabel}>메시지 내용</div>
                                        <div style={styles.bodyBoxInfoTableValue}>{detailData.data[0].chatContent}</div>
                                    </div>
                                    <div style={styles.width50}>
                                        <div style={styles.bodyBoxInfoTableLabel}>채팅일시</div>
                                        <div style={styles.bodyBoxInfoTableValue}>{dayjs(detailData.regDate).format('YYYY.MM.DD HH:mm')}</div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div style={styles.bodyBox}>
                            <div style={styles.bodyBoxHead}>
                                <div style={styles.bodyBoxHeadTitle}>회원 발송 내역</div>
                                <div style={styles.bodyBoxHeadRight}>
                                    {/* 엑셀 다운로드 버튼 will be here */}
                                </div>
                            </div>
                            <div style={styles.bodyboxScrollTable}>
                                <div style={{
                                    ...styles.bodyboxScrollTableRow,
                                    borderTop: 'none',
                                }}>
                                    {
                                        tableStructureData.map((item: any, index: number) => (
                                            <div key={index} style={{
                                                ...styles.bodyBoxScrollTableLabel,
                                                width: item.size,
                                                minWidth: item.size !== '100%' ? item.size : '140px',
                                                borderLeft: index === 0 ? 'none' : `1px solid ${basicThemeColors.gray300}`,
                                            }}>
                                                {item.value}
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    detailData && detailData.data.map((comment: any, index: number) => (
                                        <div key={index} style={{
                                            ...styles.bodyboxScrollTableRow,
                                            // borderBottom: index === detailData.subscriptionPeriods.length - 1 ? 'none' : `1px solid ${basicThemeColors.gray300}`,
                                            // borderTop: index === 0 ? 'none' : `1px solid ${basicThemeColors.gray300}`,
                                        }}>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '200px', minWidth: '200px', borderLeft: '1px solid #E5E7EB' }}>{dayjs(comment.regDate).format('YYYY.MM.DD HH:mm') || ''}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '220px', minWidth: '220px', borderLeft: `1px solid ${basicThemeColors.gray300}`, textAlign: 'left', justifyContent: 'flex-start' }}>{comment.regUser.name ? <div onClick={() => window.open('/admin/user/info/view?id=' + comment.regUser.id, '_blank')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{comment.regUser.name}</div> : ''}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '100%', minWidth: '300px', borderLeft: `1px solid ${basicThemeColors.gray300}`, textAlign: 'left', justifyContent: 'flex-start' }}>{comment.content}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '120px', minWidth: '120px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{comment.reportCount || '0'}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '120px', minWidth: '120px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{comment.isRemoved ? '삭제됨' : '정상'}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '150px', minWidth: '150px', borderLeft: `1px solid ${basicThemeColors.gray300}`, gap: '10px' }}>
                                                {
                                                    <AdmButton onClick={() => reportItem(comment.id, comment.regUser.id)} size={'medium'} color={'danger'} style={{ maxWidth: '66px', minWidth: '66px' }}>신고하기</AdmButton>
                                                }
                                                {
                                                    comment.isRemoved
                                                        ? <AdmButton size={'medium'} style={{ backgroundColor: basicThemeColors.gray300, color: '#ffffff', maxWidth: '45px', minWidth: '45px', cursor: 'default' }}>삭제됨</AdmButton>
                                                        : <AdmButton onClick={() => deleteItem(comment.id)} size={'medium'} style={{ backgroundColor: '#6B7280', color: '#ffffff', maxWidth: '45px', minWidth: '45px' }}>삭제</AdmButton>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    !detailData &&
                                    <div style={{ ...styles.bodyBoxScrollTableValue, border: '0px', width: '100%', textAlign: 'center' }}>상세 구독 내역이 없습니다.</div>
                                }
                                <div style={{ height: '4px' }}></div>
                            </div>
                            {
                                detailData &&
                                <PaginationNotParam
                                    totalItems={totalItems}
                                    currentPage={page}
                                    itemCountPerPage={ITEMS_PER_PAGE}
                                    onClick={(page: number) => {
                                        pagenationOnclick(page);
                                    }}
                                />
                            }

                        </div>
                    </div>
                </div>
            }
            {
                status === 'error' &&
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'구독상세보기(주문리스트)'}</p>
                        <button onClick={close} style={styles.closeButton}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <AdmDataErrorTable />
                </div>
            }
        </div >
    )
}

export default ReplyListPopup;