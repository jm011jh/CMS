import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import AdmDataErrorTable from "@/app/admin/components/design/AdmDataErrorTable";
import { AdmListTableCellProps } from "@/app/admin/components/design/AdmListTableHeadRow";
import { useConfirmPopupStore } from "@/app/admin/store/confirmPopupStore";
import useLoadingScreenStore from "@/app/admin/store/loadingScreenStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ApiDeleteWaitingPush, ApiGetWaitingPushList } from "../api";

enum PUSH_TYPE {
    OFFICIAL = 'OFFICIAL',
    SUB_OFFICIAL = 'SUB_OFFICIAL',
    SYSTEM = 'SYSTEM',
    MESSENGER = 'MESSENGER',
    POST = 'POST',
    LETTER = 'LETTER',
    LIVE = 'LIVE',
    SUB_LIVE = 'SUB_LIVE',
}

type AdmPushReservationPopProps = {
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
}

const AdmPushReservationPop: React.FC<AdmPushReservationPopProps> = ({ data, status, close, statusChange }) => {
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
            minHeight: '147px',
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
            padding: '4px 16px',
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: `1px solid ${basicThemeColors.gray300}`,
            backgroundColor: basicThemeColors.white,
        }
    }

    const tableStructureData: AdmListTableCellProps[] = [
        { id: '', value: '발송그룹', size: '120px', cellKey: 'title' },
        { id: '', value: '제목', size: '100%', cellKey: 'content' },
        { id: '', value: '내용', size: '100%', cellKey: 'sendDate' },
        { id: '', value: '푸시 예약 발송 시간', size: '200px', cellKey: 'sendTime' },
        { id: '', value: '링크', size: '200px', cellKey: 'link' },
        { id: '', value: '관리', size: '100px', cellKey: 'ctrlCustom' },
        // { id: '', value: '최근결제일', size: '240px', cellKey: 'productName' },
        // { id: '', value: '결제상태', size: '100px', cellKey: 'productName' },
        // { id: '', value: '구독취소', size: '100px', cellKey: 'productName' }
    ];


    const [detailData, setDetailData] = useState<any>(null);
    useEffect(() => {
        if (data && data.length > 0) {
            if (statusChange) {

                statusChange('success');
                setDetailData(data);
            }
        }

    }, [data])


    const [showMoreBtnSwitch, setShowMoreBtnSwitch] = useState<boolean>(true);
    useEffect(() => {
        const url = window.location.href.split('?')[0];
        if (url.includes('/admin/user/info/view')) {
            setShowMoreBtnSwitch(false)
        }
        return () => {
            setDetailData(null)
        }
    }, [])

    // #region delete waiting push
    const { showLoading, hideLoading } = useLoadingScreenStore();

    const { showPopup } = useConfirmPopupStore()
    const deleteWaitingPush = (id: string) => {

        showPopup({
            title: <p>삭제 전 확인해주세요</p>,
            desc: <p>삭제된 예약 발송은 복구할 수 없습니다.<br />정말 삭제하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                ApiDeleteWaitingPush(id)
                    .then(() => {
                        ApiGetWaitingPushList(new URLSearchParams()).then((res) => {
                            alert('삭제가 완료됐습니다.');
                            setDetailData(res.data.data);
                        })
                    }).catch(() => {
                        alert('삭제에 실패했습니다.');
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
    }
    // #endregion delete waiting push

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                status === 'success' &&
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
                    <div style={styles.body}>
                        <div style={styles.bodyBox}>
                            <div style={styles.bodyboxScrollTable}>
                                <div style={{ ...styles.bodyboxScrollTableRow, borderTop: 'none' }}>
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
                                    detailData &&
                                    (
                                        detailData.length > 0 ?
                                            detailData.map((item: any, index: number) => (
                                                <div key={index} style={{ ...styles.bodyboxScrollTableRow, borderTop: 'none' }}>
                                                    <div style={{ ...styles.bodyBoxScrollTableValue, width: '120px', minWidth: '120px', borderLeft: '1px solid #E5E7EB' }}>{
                                                        item.topicType === PUSH_TYPE.OFFICIAL ? '전체회원'
                                                            : item.topicType === PUSH_TYPE.SUB_OFFICIAL ? '구독회원'
                                                                : item.topicType === PUSH_TYPE.SYSTEM ? '전체회원(시스템)'
                                                                    : item.topicType === PUSH_TYPE.MESSENGER ? '메신저'
                                                                        : item.topicType === PUSH_TYPE.POST ? '포스트'
                                                                            : item.topicType === PUSH_TYPE.LETTER ? '레터'
                                                                                : item.topicType === PUSH_TYPE.LIVE ? '라이브'
                                                                                    : item.topicType === PUSH_TYPE.SUB_LIVE ? '구독 라이브'
                                                                                        : '-'
                                                    }</div>
                                                    <div style={{ ...styles.bodyBoxScrollTableValue, width: '50%', borderLeft: '1px solid #E5E7EB' }}>{item.title}</div>
                                                    <div style={{ ...styles.bodyBoxScrollTableValue, width: '50%', borderLeft: '1px solid #E5E7EB' }}>{item.content}</div>
                                                    <div style={{ ...styles.bodyBoxScrollTableValue, width: '200px', minWidth: '200px', borderLeft: '1px solid #E5E7EB' }}>{dayjs(item.sendAt).format('YYYY.MM.DD HH:mm')}</div>
                                                    <div style={{ ...styles.bodyBoxScrollTableValue, width: '200px', minWidth: '200px', borderLeft: '1px solid #E5E7EB' }}>{item.link || '-'}</div>
                                                    <div style={{ ...styles.bodyBoxScrollTableValue, width: '100px', minWidth: '100px', borderLeft: '1px solid #E5E7EB' }}>
                                                        <AdmButton size="small" color="tertiaryFill" onClick={() => deleteWaitingPush(item.id)} >삭제</AdmButton>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <div style={{ ...styles.bodyBoxScrollTableValue, border: '0px', width: '100%', textAlign: 'center' }}>푸시 예약 내역이 없습니다.</div>
                                    )

                                }
                                {
                                    !detailData &&
                                    <div style={{ ...styles.bodyBoxScrollTableValue, border: '0px', width: '100%', textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>푸시 예약 내역이 없습니다.</div>
                                }
                                <div style={{ height: '4px' }}></div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            {
                status === 'error' &&
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'푸시 예약 내역'}</p>
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

export default AdmPushReservationPop;