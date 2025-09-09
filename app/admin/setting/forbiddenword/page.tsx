'use client';
import { AdmInputTextArea } from '@/app/components/form/Input';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useEffect, useState } from 'react';
import AdmButton from '../../components/design/AdmButton';
import AdmListBox from '../../components/design/AdmListBox';
import AdmPageTop from '../../components/design/AdmPageTop';
import AdmWrapper from '../../components/design/AdmWrapper';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import useLoadingScreenStore from '../../store/loadingScreenStore';
import { useToastStore } from '../../store/useToastStore';
import CustomPageExplnationMultiLines from '../term/component/CustomPageExplnationMultiLines';



const forbiddenwordPage = () => {

    const { addToast } = useToastStore();
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const { showPopup } = useConfirmPopupStore()

    const [wordList, setWordList] = useState<string>('');

    const APIgetForbiddenWord = async () => {
        const result: any = await callAPI(HTTPMETHOD.GET, {}, '/api/admin/prohibited-words', getAccessToken());
        setWordList(result.data.words);
    }
    const APIputForbiddenWord = async () => {
        showLoading();
        const param = {
            words: wordList
        }
        try {
            const result: any = await callAPI(HTTPMETHOD.PUT, param, '/api/admin/prohibited-words', getAccessToken());
            if (result) {
                addToast('수정이 완료됐습니다.')
            }
        }
        catch (error) {
            addToast('수정에 실패했습니다.', 3000, 'error')
        }
        finally {
            hideLoading();
        }
    }
    useEffect(() => {
        APIgetForbiddenWord();
    }, []);

    const confirmSave = async () => {
        showPopup({
            title: <p>수정하시겠습니까?</p>,
            desc: <p></p>,
            onConfirm: () => {
                APIputForbiddenWord();
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    }

    return (
        <AdmWrapper>
            <AdmPageTop title={`금지어 관리`} />
            <AdmListBox>
                <>
                    <CustomPageExplnationMultiLines
                        titleBlack={'금지어로 등록된 단어는 사용자 콘텐츠에서 자동 필터링되며, 서비스 이용 제한의 기준이 될 수 있습니다. 민감하거나 일반적인 단어는 신중히 등록해 주세요.<br/>금지어는 한 줄에 하나씩 입력되며 엔터(Enter)로 단어를 구분합니다.'}
                    />
                    <AdmInputTextArea
                        size='large'
                        id='wordList'
                        name='wordList'
                        value={wordList}
                        onChange={(e) => setWordList(e)}
                    />

                    <AdmButton
                        style={{ marginLeft: 'auto', marginTop: '24px' }}
                        size='large'
                        onClick={confirmSave}>저장</AdmButton>
                </>
            </AdmListBox>
        </AdmWrapper>
    );
};

export default forbiddenwordPage;