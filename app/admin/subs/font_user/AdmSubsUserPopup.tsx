import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmDataErrorTable from "@/app/admin/components/design/AdmDataErrorTable";
import { AdmListTableCellProps } from "@/app/admin/components/design/AdmListTableHeadRow";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdmSubsUserPopupProps = {
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
}

const AdmSubsUserPopup: React.FC<AdmSubsUserPopupProps> = ({ data, status, close, statusChange }) => {
    const router = useRouter();
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: 1003,
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
            padding: '4px 8px',
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderLeft: `1px solid ${basicThemeColors.gray300}`,
            backgroundColor: basicThemeColors.white,
        }
    }

    const tableStructureData: AdmListTableCellProps[] = [
        { id: '', value: '사용자 ID', size: '240px', cellKey: 'name' },
        { id: '', value: '플랫폼', size: '120px', cellKey: 'email' },
        { id: '', value: '구독 상품명', size: '100%', cellKey: 'currentStatus' },
        { id: '', value: '주문 ID', size: '310px', cellKey: 'originalTransactionId' },
        { id: '', value: '구독시작일', size: '240px', cellKey: 'storeType' },
        // { id: '', value: '최근결제일', size: '240px', cellKey: 'productName' },
        { id: '', value: '만료일', size: '240px', cellKey: 'productName' },
        // { id: '', value: '결제상태', size: '100px', cellKey: 'productName' },
        // { id: '', value: '구독취소', size: '100px', cellKey: 'productName' }
    ];


    const [detailData, setDetailData] = useState<any>(null);
    useEffect(() => {
        if (data && data.user.id) {
            if (statusChange) {

                statusChange('success');
                setDetailData(data)

                console.log(data);
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

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                status === 'success' && detailData &&
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
                            <div style={styles.bodyBoxHead}>
                                <div style={styles.bodyBoxHeadTitle}>회원정보</div>
                                {
                                    showMoreBtnSwitch &&
                                    <div style={styles.bodyBoxHeadRight}>
                                        <button onClick={() => window.open('/admin/user/info/view?id=' + data.user.id, '_blank')} style={styles.bodyBoxHeadGoToUserDetailButton}>회원정보 더보기</button>
                                    </div>
                                }
                            </div>
                            {
                                detailData &&
                                <div style={styles.bodyBoxInfoTable}>
                                    <div style={styles.width50}>
                                        <div style={styles.bodyBoxInfoTableLabel}>닉네임</div>
                                        <div style={styles.bodyBoxInfoTableValue}>{detailData.user.name}</div>
                                    </div>
                                    <div style={styles.width50}>
                                        <div style={styles.bodyBoxInfoTableLabel}>이메일</div>
                                        <div style={styles.bodyBoxInfoTableValue}>{detailData.user.email}</div>
                                    </div>
                                    <div style={styles.width50}>
                                        <div style={styles.width50}>
                                            <div style={styles.bodyBoxInfoTableLabel}>상태</div>
                                            <div style={styles.bodyBoxInfoTableValue}>
                                                {detailData.status === 'ACTIVE'
                                                    ? '구독중'
                                                    : detailData.status === 'EXPIRED'
                                                        ? '만료됨'
                                                        : detailData.status === 'CANCELLED'
                                                            ? '갱신취소'
                                                            : detailData.status === 'REFUNDED'
                                                                ? '환불'
                                                                : '알수없음'}
                                            </div>
                                        </div>
                                        <div style={styles.width50}>
                                            <div style={styles.bodyBoxInfoTableLabel}>누적구독횟수</div>
                                            <div style={styles.bodyBoxInfoTableValue}>{detailData.subscriptionDurationMonths}개월 ({detailData.purchaseCount}번)</div>
                                        </div>
                                    </div>
                                    <div style={styles.width50}>
                                        <div style={styles.bodyBoxInfoTableLabel}>만료일</div>
                                        <div style={styles.bodyBoxInfoTableValue}>{dayjs(detailData.endDate).format('YYYY.MM.DD HH:mm')}</div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div style={styles.bodyBox}>
                            <div style={styles.bodyBoxHead}>
                                <div style={styles.bodyBoxHeadTitle}>구독 내역</div>
                                <div style={styles.bodyBoxHeadRight}>
                                    <button style={styles.bodyBoxHeadGoogleButton} onClick={() => window.open('https://play.google.com/console/u/0/developers', '_blank')}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect width="16" height="16" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.7194 8.1602C14.7194 7.66388 14.6748 7.18665 14.5921 6.72852H8V9.43599H11.7669C11.6047 10.3109 11.1115 11.0522 10.3702 11.5485V13.3047H12.6323C13.9558 12.0862 14.7194 10.2918 14.7194 8.1602Z" fill="#4285F4" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99901 14.9976C9.88884 14.9976 11.4732 14.3708 12.6313 13.3018L10.3692 11.5456C9.74249 11.9656 8.94074 12.2138 7.99901 12.2138C6.176 12.2138 4.63296 10.9825 4.08256 9.32812H1.74414V11.1416C2.89585 13.4291 5.2629 14.9976 7.99901 14.9976Z" fill="#34A853" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.08485 9.32967C3.94486 8.9097 3.86532 8.46111 3.86532 7.99979C3.86532 7.53847 3.94486 7.08987 4.08485 6.66991V4.85645H1.74643C1.27238 5.80136 1.00195 6.87035 1.00195 7.99979C1.00195 9.12923 1.27238 10.1982 1.74643 11.1431L4.08485 9.32967Z" fill="#FBBC05" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99901 3.78481C9.02665 3.78481 9.94929 4.13796 10.6747 4.83153L12.6822 2.82399C11.4701 1.69455 9.88566 1.00098 7.99901 1.00098C5.2629 1.00098 2.89585 2.56947 1.74414 4.85698L4.08256 6.67045C4.63296 5.01606 6.176 3.78481 7.99901 3.78481Z" fill="#EA4335" />
                                        </svg>
                                        <p>Google 구독 관리</p>
                                    </button>
                                    <button style={styles.bodyBoxHeadAppleButton} onClick={() => window.open('https://appstoreconnect.apple.com/apps', '_blank')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.7485 11.9103C13.5331 12.3994 13.278 12.8496 12.9826 13.2635C12.5798 13.8278 12.25 14.2185 11.9959 14.4354C11.6019 14.7914 11.1798 14.9737 10.7278 14.9841C10.4033 14.9841 10.012 14.8934 9.5565 14.7093C9.09949 14.5261 8.6795 14.4354 8.29547 14.4354C7.89272 14.4354 7.46077 14.5261 6.99874 14.7093C6.53601 14.8934 6.16324 14.9893 5.87824 14.9988C5.44479 15.0169 5.01275 14.8294 4.5815 14.4354C4.30626 14.1994 3.96198 13.795 3.54955 13.2221C3.10705 12.6102 2.74325 11.9007 2.45824 11.0919C2.15301 10.2182 2 9.37218 2 8.55312C2 7.61489 2.2063 6.80568 2.61952 6.12756C2.94428 5.58288 3.37632 5.15321 3.91705 4.83779C4.45778 4.52236 5.04203 4.36163 5.67123 4.35134C6.01551 4.35134 6.46698 4.456 7.02802 4.66167C7.58748 4.86803 7.94671 4.97268 8.10421 4.97268C8.22196 4.97268 8.62102 4.85032 9.29752 4.60636C9.93727 4.38012 10.4772 4.28645 10.9195 4.32335C12.1181 4.4184 13.0186 4.88272 13.6175 5.71924C12.5455 6.35752 12.0152 7.2515 12.0258 8.39834C12.0355 9.29164 12.3652 10.035 13.0133 10.6252C13.3071 10.8992 13.6351 11.1109 14 11.2613C13.9209 11.4868 13.8373 11.7028 13.7485 11.9103ZM10.9996 1.28008C10.9996 1.98024 10.7393 2.63398 10.2204 3.23907C9.59431 3.95841 8.83699 4.37407 8.01574 4.30848C8.00528 4.22448 7.99921 4.13608 7.99921 4.04318C7.99921 3.37103 8.29697 2.65169 8.82574 2.06354C9.08973 1.76574 9.42547 1.51813 9.83263 1.32061C10.2389 1.12603 10.6232 1.01843 10.9846 1C10.9952 1.0936 10.9996 1.18721 10.9996 1.28007V1.28008Z" fill="white" />
                                        </svg>
                                        <p>Apple 구독 관리</p>
                                    </button>
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
                                    detailData && detailData.subscriptions && detailData.subscriptions.map((period: any, index: number) => (
                                        <div key={index} style={{
                                            ...styles.bodyboxScrollTableRow,
                                            // borderBottom: index === detailData.subscriptionPeriods.length - 1 ? 'none' : `1px solid ${basicThemeColors.gray300}`,
                                            // borderTop: index === 0 ? 'none' : `1px solid ${basicThemeColors.gray300}`,
                                        }}>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '240px', minWidth: '240px', borderLeft: '1px solid #E5E7EB' }}>{detailData.user.name}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '120px', minWidth: '120px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{period.storeType === 'PLAY_STORE' ? 'GOOGLE' : 'Apple'}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '100%', minWidth: '240px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{period.plan?.name}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '310px', minWidth: '310px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{period.originalTransactionId}</div>
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '240px', minWidth: '240px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{dayjs(period.startDate).format('YYYY.MM.DD HH:mm')}</div>
                                            {/* <div style={{ ...styles.bodyBoxScrollTableValue, width: '240px', minWidth: '240px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{dayjs(period.startDate).format('YYYY.MM.DD HH:mm')}</div> */}
                                            <div style={{ ...styles.bodyBoxScrollTableValue, width: '240px', minWidth: '240px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{dayjs(period.endDate).format('YYYY.MM.DD HH:mm')}</div>
                                            {/* <div style={{ ...styles.bodyBoxScrollTableValue, width: '100px', minWidth: '100px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{detailData.isActive ? '승인' : '환불'}</div> */}
                                            {/* <div style={{ ...styles.bodyBoxScrollTableValue, width: '100px', minWidth: '100px', borderLeft: `1px solid ${basicThemeColors.gray300}` }}>{period.status === 'ACTIVE' ? '활성' : '해지'}</div> */}
                                        </div>
                                    ))
                                }
                                {
                                    !detailData &&
                                    <div style={{ ...styles.bodyBoxScrollTableValue, border: '0px', width: '100%', textAlign: 'center' }}>상세 구독 내역이 없습니다.</div>
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
            {
                status === 'nodata' &&
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
                    <AdmDataErrorTable text1="구독 내역이 없습니다." text2="" />
                </div>
            }
        </div >
    )
}

export default AdmSubsUserPopup;