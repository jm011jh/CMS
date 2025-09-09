'use client';
import { AdmInputTextArea } from '@/app/components/form/Input';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import React, { useEffect, useState } from 'react';
import AdmButton from '../../components/design/AdmButton';
import AdmListBox from '../../components/design/AdmListBox';
import AdmPageTop from '../../components/design/AdmPageTop';
import AdmWrapper from '../../components/design/AdmWrapper';
import CustomPageExplnationMultiLines from '../../setting/term/component/CustomPageExplnationMultiLines';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import useLoadingScreenStore from '../../store/loadingScreenStore';


const AdminSubsDescPage = () => {

    const styles: { [key: string]: React.CSSProperties } = {
        btnContainer: {
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderBottom: '1px solid var(--Gray-300, #D1D5DB)',
            marginBottom: '24px',
        },
        btnWrap: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            height: '48px',
            fontSize: '16px',
            color: 'var(--Gray-400, #9CA3AF)',
            cursor: 'pointer',
        },
        btnSelected: {
            borderBottom: '2px solid var(--Primary-Primary, #ADAAC7)',
            background: 'var(--Primary-Lighten-100, #F4F4F8)',
            color: 'var(--Primary-Darken-100, #817CA9)',
            fontWeight: '600'
        },
        textAreaContainer: {
            width: '100%',

            borderRadius: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '16px',
            flexDirection: 'column'
        }
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const { showPopup } = useConfirmPopupStore()


    const [type, setType] = useState<'usageGuide' | 'paymentNotice' | 'cancelRefundGuide'>('usageGuide'); // 현재 선택된 버튼 타입 
    const [typeTextKR, setTypeTextKR] = useState<string | null | undefined>();
    const [typeTextEN, setTypeTextEN] = useState<string | null | undefined>();

    const [descriptionOrigin, setDescriptionOrigin] = useState<{
        usageGuideKo: string | null | undefined;
        usageGuideEn: string | null | undefined;
        paymentNoticeKo: string | null | undefined;
        paymentNoticeEn: string | null | undefined;
        cancelRefundGuideKo: string | null | undefined;
        cancelRefundGuideEn: string | null | undefined;
    }>({
        usageGuideKo: "",
        usageGuideEn: "",
        paymentNoticeKo: "",
        paymentNoticeEn: "",
        cancelRefundGuideKo: "",
        cancelRefundGuideEn: ""
    });
    const [description, setDescription] = useState<{
        usageGuideKo: string | null | undefined;
        usageGuideEn: string | null | undefined;
        paymentNoticeKo: string | null | undefined;
        paymentNoticeEn: string | null | undefined;
        cancelRefundGuideKo: string | null | undefined;
        cancelRefundGuideEn: string | null | undefined;
    }>({
        usageGuideKo: "",
        usageGuideEn: "",
        paymentNoticeKo: "",
        paymentNoticeEn: "",
        cancelRefundGuideKo: "",
        cancelRefundGuideEn: ""
    });
    const APIgetDescription = async () => {
        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, '/api/subscriptions/guide-text', getAccessToken());
            setDescription(result.data);
            setDescriptionOrigin(result.data);
            setTypeTextKR(result.data.usageGuideKo);
            setTypeTextEN(result.data.usageGuideEn);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const APIputDescription = async () => {
        showLoading();
        try {
            let param = descriptionOrigin;
            switch (type) {
                case 'usageGuide':
                    param.usageGuideKo = typeTextKR;
                    param.usageGuideEn = typeTextEN;
                    break;
                case 'paymentNotice':
                    param.paymentNoticeKo = typeTextKR;
                    param.paymentNoticeEn = typeTextEN;
                    break;
                case 'cancelRefundGuide':
                    param.cancelRefundGuideKo = typeTextKR;
                    param.cancelRefundGuideEn = typeTextEN;
            }
            const result: any = await callAPI(HTTPMETHOD.PUT, param, '/api/admin/subscription/guide-text', getAccessToken());
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            hideLoading();
        }
    }
    const actionSwitchType = (type: 'usageGuide' | 'paymentNotice' | 'cancelRefundGuide') => {
        setType(type);
        switch (type) {
            case 'usageGuide':
                setTypeTextKR(description.usageGuideKo);
                setTypeTextEN(description.usageGuideEn);
                break;
            case 'paymentNotice':
                setTypeTextKR(description.paymentNoticeKo);
                setTypeTextEN(description.paymentNoticeEn);
                break;
            case 'cancelRefundGuide':
                setTypeTextKR(description.cancelRefundGuideKo);
                setTypeTextEN(description.cancelRefundGuideEn);
                break;
            default:
                setTypeTextKR(description.usageGuideKo);
                setTypeTextEN(description.usageGuideEn);
        }
    }
    const confirmSave = async () => {
        showPopup({
            title: <p>수정하시겠습니까?</p>,
            desc: <p></p>,
            onConfirm: () => {
                APIputDescription()
                    .then((result) => {
                        if (result) {
                            alert('저장되었습니다.');
                            // APIgetDescription();
                        }
                    })
                    .catch((error) => {
                        alert('저장에 실패했습니다.');
                    });
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    }
    useEffect(() => {
        APIgetDescription();
    }, []);

    return (
        <AdmWrapper>
            <AdmPageTop title={`구독 안내문구 관리`} />
            <AdmListBox>
                <>
                    <CustomPageExplnationMultiLines
                        titleBlack={'구독하기 내 안내 문구를 설정할 수 있습니다.'}
                    />
                    <div style={{ ...styles.btnContainer }}>
                        <div style={{ ...styles.btnWrap, ...(type === 'usageGuide' && styles.btnSelected) }} onClick={() => actionSwitchType('usageGuide')}>이용안내</div>
                        <div style={{ ...styles.btnWrap, ...(type === 'paymentNotice' && styles.btnSelected) }} onClick={() => actionSwitchType('paymentNotice')}>결제 유의사항</div>
                        <div style={{ ...styles.btnWrap, ...(type === 'cancelRefundGuide' && styles.btnSelected) }} onClick={() => actionSwitchType('cancelRefundGuide')}>해지 ・ 환불 안내</div>
                    </div>


                    <div className="adm--box-scrollWrap">
                        <div className="adm--box-scrollCont" style={{ ...styles.textAreaContainer }}>
                            <div style={{ fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', height: '40px', width: '100%' }}>안내문구 국문</div>
                            <AdmInputTextArea
                                value={typeTextKR}
                                size={'large'}
                                id={'sudbsDescTextKR'}
                                name={'sudbsDescTextKR'}
                                placeholder={'문구를 입력해주세요.'}
                                onChange={(textValue: string) =>
                                    setTypeTextKR(textValue)
                                }
                                desc={''}
                                height='310px'
                            // maxLength={value.requireOptions?.maxLength}
                            />
                            <div style={{ fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', height: '40px', width: '100%' }}>안내문구 영문</div>
                            <AdmInputTextArea
                                value={typeTextEN}
                                size={'large'}
                                id={'sudbsDescTextEN'}
                                name={'sudbsDescTextEN'}
                                placeholder={'enter text.'}
                                onChange={(textValue: string) =>
                                    setTypeTextEN(textValue)
                                }
                                desc={''}
                                height='310px'
                            // maxLength={value.requireOptions?.maxLength}
                            />
                        </div>
                    </div>

                    <AdmButton
                        style={{ marginLeft: 'auto', marginTop: '24px' }}
                        size='large'
                        onClick={confirmSave}>저장</AdmButton>
                </>
            </AdmListBox>
        </AdmWrapper>
    );
};

export default AdminSubsDescPage;