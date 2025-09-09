import { postPresignedURL } from "@/app/admin/lib/viewDataFilesUpload";
import CustomPageExplnationMultiLines from "@/app/admin/setting/term/component/CustomPageExplnationMultiLines";
import { useConfirmPopupStore } from "@/app/admin/store/confirmPopupStore";
import { useToast } from "@/app/admin/store/useToastStore";
import { AdmInputText } from "@/app/components/form/Input";
import { HTTPMETHOD } from "@/lib/util/callApi";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { basicThemeColors } from "../../../assets/theme";
import AdmButton from "../../../components/design/AdmButton";

type AdmReplyUpdatePopupProps = {
    handleSave: (data: any) => void;
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
}

const AdmReplyUpdatePopup: React.FC<AdmReplyUpdatePopupProps> = ({ data, status, close, handleSave }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: 1002,
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
            maxWidth: '814px',
            minHeight: '300px',
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
            borderBottom: `1px solid ${basicThemeColors.gray100}`,
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
            justifyContent: 'center',
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
            gap: '8px',
            alignSelf: 'stretch',
        },
        bodyBoxTitle: {
            fontSize: '16px',
            fontWeight: '400',
            color: '#000',
            lineHeight: '20px',
            marginTop: '8px',
        },
        bodyBoxInput: {
            height: '40px',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--Gray-300, #D1D5DB)',
            background: 'var(--Gray-200, #E5E7EB)',
        },
        bodyBoxStar: {
            color: 'var(--Primary-Primary, #ADAAC7)',
        },
        bodyBoxDesc: {
            fontSize: '12px',
            color: '#9CA3AF',
            lineHeight: '16px',
        },
        toggleBtnRoot: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: basicThemeColors.gray100,
            color: basicThemeColors.gray400,
            padding: '4px',
            fontSize: '16px',
            fontWeight: '400',
        },
        toggleBtnOn: {
            width: '50%',
            height: '100%',
            backgroundColor: basicThemeColors.primary.darken100,
            color: '#fff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },
        toggleBtnOff: {
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },
        bodyEmpty: {
            height: '100%',
        },
        bodyBottom: {
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        },
        uploadingBox: {
            display: 'flex',
            padding: '24px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            alignSelf: 'stretch',
            borderRadius: '12px',
            border: '1px solid var(--Gray-300, #D1D5DB)',
            background: 'var(--Primary-Lighten-100, #F4F4F8)',
        },

        uploadingTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
            gap: '8px',
        }
    };

    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData({ ...data, isVideo: "Y", isUploading: 'N' });
    }, [data]);

    const attachVideo = () => {
        const inputFile = document.getElementById('input_file') as HTMLInputElement;
        if (inputFile) {
            inputFile.click();
            inputFile.onchange = async () => {
                const file = inputFile.files?.[0];
                if (file) {
                    // 여기에 파일 업로드 로직을 추가해야 합니다.
                    // const result: any = await viewDataVideoFileOneUploadToS3(file, 'notice/video'); // 예시로 'notice/video' 경로에 업로드한다고 가정
                    // console.log('Video upload result:', result);
                    setLocalData((prev: any) => ({
                        ...prev,
                        file: file,
                        fileName: file.name,
                    }));
                }
            }
        }
    }

    const { showPopup } = useConfirmPopupStore();


    const handleCancel = () => {
        if (localData?.isUploading == 'Y') {
            showPopup({
                title: '파일 업로드를 취소하시겠습니까?',
                desc: <p>파일이 업로드 진행 중입니다.<br />지금 취소하시면 파일이 업로드되지 않습니다.</p>,
                onConfirm: () => {
                    setLocalData((prev: any) => ({ ...prev, isUploading: 'N', fileName: '', videoUrl: '' }));

                    controller.current.abort(); // 업로드 중인 요청을 취소
                    if (close) close();
                },
                onCancel: () => {
                    // 취소 시 아무 작업도 하지 않음
                }
            });
        } else {

            controller.current.abort(); // 업로드 중인 요청을 취소
            if (close) close();
        }
    }

    const { addToast } = useToast();

    const [fileUploadProgress, setFileUploadProgress] = useState(0);

    const controller = useRef(new AbortController());

    const startUploadFile = async () => {
        if (localData?.isVideo === 'Y') {
            if (!localData?.file) {
                return;
            }

            // file size 3gb 이상인 경우
            if (localData.file.size > 3 * 1024 * 1024 * 1024) {
                addToast('3GB 이상의 파일은 업로드할 수 없습니다.', 3000, 'error');
                return;
            }

            setLocalData((prev: any) => ({ ...prev, isUploading: 'Y', fileName: localData.file.name }));
            // 여기에 파일 업로드 로직을 추가해야 합니다.
            // 파일 업로드 로직
            // 1. presigned URL를 받음
            const makeUrl = await postPresignedURL(localData.file.type, 'vod/video');

            // 2. presigned URL를 통해 파일을 S3에 업로드
            if (makeUrl) {
                try {
                    const config = {
                        method: HTTPMETHOD.PUT,
                        url: makeUrl.data.data.presignedUrl,
                        data: localData.file,
                        headers: {
                            'Content-Type': localData.file.type,
                        },
                    };
                    axios.put(makeUrl.data.data.presignedUrl, localData.file, {
                        headers: {
                            'Content-Type': localData.file.type,
                        },
                        signal: controller.current.signal, // AbortController를 사용하여 요청을 취소할 수 있도록 설정
                        onUploadProgress: function (progressEvent) {

                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                            );
                            setFileUploadProgress(percentCompleted);

                        },
                    }).then((response) => {
                        console.log('S3 파일 업로드 성공:', response);
                        // 업로드 성공 시 처리
                        // - 파일 포맷은 H264 인코딩 ->  원본파일명_H264.확장자
                        // https://cdn.blissoolmt.com/blissoo/qa/2025-08-12/vod/video/5a713a11-1d55-45b4-a834-881cd9c8aacc.mp4
                        const cdnUrl = makeUrl.data.data.cdnUrl;
                        const lastDotIndex = cdnUrl.lastIndexOf('.');

                        // SJM 파일확장자는 전부 mp4로 변경되어 옴
                        const fileExtension = cdnUrl.substring(lastDotIndex); // 확장자 추출
                        // 파일 이름에서 확장자를 제외한 부분을 추출
                        const fileNameWithoutExtension = cdnUrl.substring(0, lastDotIndex);
                        // 파일 이름에 '_H264'를 추가
                        const newFileName = `${fileNameWithoutExtension}_H264.mp4`; // SJM 파일확장자는 전부 mp4로 변경되어 옴

                        console.log('test123 New File Name:', newFileName);

                        handleSave({ videoUrl: cdnUrl, newVideoUrl: newFileName });
                    });
                } catch (error) {
                    console.error('S3 파일 업로드 실패:', error);
                }
            }

        } else if (localData?.isVideo === 'N') {
            if (!localData?.videoUrl) {
                return;
            }

            handleSave({ videoUrl: localData.videoUrl });
        }
    }

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={handleCancel}></div>
            <div style={styles.wrapper}>
                <div style={styles.head}>
                    <p style={styles.title}>{'동영상 업로드'}</p>
                    <button onClick={handleCancel} style={styles.closeButton}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div style={styles.body}>
                    <div style={styles.bodyBox}>

                        <CustomPageExplnationMultiLines
                            titleBlack={'파일 크기에 따라 업로드에 시간이 소요될 수 있습니다. 업로드가 완료될 때까지 잠시만 기다려주세요.'}
                        />

                        {
                            localData?.isUploading == 'Y' &&
                            <>
                                <div style={styles.bodyBoxTitle}>업로드 진행 중입니다.</div>
                                <div style={styles.uploadingBox}>
                                    <div style={styles.uploadingTitle}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.11328 24.2207V6.44336C6.11328 5.58877 6.45301 4.769 7.05729 4.16471C7.66158 3.56043 8.48135 3.2207 9.33594 3.2207H19.3359L19.5312 3.24023C19.7235 3.27863 19.9023 3.37297 20.043 3.51367L25.5977 9.06966C25.7852 9.2572 25.8906 9.51148 25.8906 9.77669V24.2207C25.8906 25.0752 25.5521 25.8951 24.9479 26.4993C24.3437 27.1035 23.5237 27.4432 22.6693 27.4434H9.33594C8.48145 27.4434 7.66155 27.1035 7.05729 26.4993C6.45301 25.8951 6.11328 25.0753 6.11328 24.2207ZM8.11328 24.2207C8.11328 24.5449 8.24214 24.8561 8.47135 25.0853C8.70054 25.3144 9.01189 25.4434 9.33594 25.4434H22.6693C22.9931 25.4432 23.3035 25.3141 23.5326 25.0853C23.7618 24.8561 23.8906 24.5449 23.8906 24.2207V10.1895L18.9219 5.2207H9.33594C9.01178 5.2207 8.70057 5.34957 8.47135 5.57878C8.24214 5.80799 8.11328 6.11921 8.11328 6.44336V24.2207Z" fill="#ADAAC7" />
                                            <path d="M17.2188 8.66471V4.2207C17.2188 3.66842 17.6665 3.2207 18.2188 3.2207C18.771 3.2207 19.2188 3.66842 19.2188 4.2207V8.66471C19.2188 8.98887 19.3476 9.30009 19.5768 9.5293C19.806 9.75851 20.1173 9.88737 20.4414 9.88737H24.8854C25.4377 9.88737 25.8854 10.3351 25.8854 10.8874C25.8854 11.4397 25.4377 11.8874 24.8854 11.8874H20.4414C19.5868 11.8874 18.767 11.5476 18.1628 10.9434C17.5585 10.3391 17.2188 9.5193 17.2188 8.66471Z" fill="#ADAAC7" />
                                            <path d="M13.2891 13.3508C13.6024 13.1735 13.9868 13.1774 14.2956 13.3625L19.8516 16.6959C20.1528 16.8766 20.3372 17.2027 20.3372 17.5539C20.3372 17.9052 20.1528 18.2313 19.8516 18.412L14.2956 21.7453C13.9868 21.9304 13.6024 21.9344 13.2891 21.7571C12.9756 21.5796 12.7812 21.2475 12.7812 20.8873V14.2206C12.7812 13.8603 12.9756 13.5283 13.2891 13.3508ZM14.7812 19.1203L17.3919 17.5539L14.7812 15.9862V19.1203Z" fill="#ADAAC7" />
                                        </svg>
                                        <span style={{ color: '#000' }}>{localData?.fileName}</span>
                                        <div style={{ width: '100%' }}></div>
                                        <div style={{ cursor: 'pointer' }} onClick={handleCancel}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.4697 4.46967C18.7626 4.17678 19.2373 4.17678 19.5302 4.46967C19.8231 4.76256 19.8231 5.23732 19.5302 5.53022L5.53022 19.5302C5.23732 19.8231 4.76256 19.8231 4.46967 19.5302C4.17678 19.2373 4.17678 18.7626 4.46967 18.4697L18.4697 4.46967Z" fill="#ADAAC7" />
                                                <path d="M4.46967 4.46967C4.76256 4.17678 5.23732 4.17678 5.53022 4.46967L19.5302 18.4697L19.582 18.5263C19.8223 18.8209 19.8048 19.2556 19.5302 19.5302C19.2556 19.8048 18.8209 19.8223 18.5263 19.582L18.4697 19.5302L4.46967 5.53022C4.17678 5.23732 4.17678 4.76256 4.46967 4.46967Z" fill="#ADAAC7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${fileUploadProgress}%`, height: '100%', backgroundColor: '#ADAAC7' }}></div>
                                    </div>
                                    <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '400', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span>{Math.floor(localData?.file?.size / 1024).toLocaleString()} KB</span>
                                        <span>{fileUploadProgress}%</span>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            localData?.isUploading == 'N' &&
                            <div style={styles.toggleBtnRoot}>
                                <div style={localData?.isVideo == 'Y' ? styles.toggleBtnOn : styles.toggleBtnOff} onClick={() => setLocalData((prev: any) => ({ ...prev, isVideo: 'Y' }))}>동영상 파일 업로드</div>
                                <div style={localData?.isVideo == 'N' ? styles.toggleBtnOn : styles.toggleBtnOff} onClick={() => setLocalData((prev: any) => ({ ...prev, isVideo: 'N' }))}>URL 업로드</div>
                            </div>
                        }
                        {
                            localData?.isUploading == 'N' && localData?.isVideo === 'Y' &&
                            <>
                                <div style={styles.bodyBoxTitle}>동영상 파일 업로드</div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                                    <AdmInputText
                                        id={'fileName'}
                                        name={'fileName'}
                                        value={localData?.fileName || ''}
                                        placeholder={'파일을 첨부해주세요.'}
                                        size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                        desc="3GB 이하의 비디오 파일만 업로드할 수 있습니다." // AdmInputText는 desc prop이 필수일 수 있음
                                        isDisabled={true}
                                        inputStyle={{ color: '#9CA3AF' }}
                                    />
                                    <AdmButton
                                        size={'large'}
                                        onClick={attachVideo}
                                        style={{ maxWidth: '120px' }}
                                    >
                                        파일첨부
                                    </AdmButton>
                                </div>
                            </>
                        }
                        {
                            localData?.isUploading == 'N' && localData?.isVideo === 'N' &&
                            <>
                                <div style={styles.bodyBoxTitle}>동영상 URL 업로드</div>
                                <AdmInputText
                                    id={'videoUrl'}
                                    name={'videoUrl'}
                                    value={localData?.videoUrl || ''}
                                    placeholder={'동영상 링크를 입력해주세요.'}
                                    size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                    desc="" // AdmInputText는 desc prop이 필수일 수 있음
                                    onChange={(val) => setLocalData((prev: any) => ({ ...prev, videoUrl: val }))}
                                />
                            </>
                        }

                    </div>
                    {
                        localData?.isUploading == 'N' &&
                        <div style={styles.bodyBottom}>
                            <AdmButton
                                size={'large'}
                                color={'primaryBorder'}
                                onClick={handleCancel}
                                style={{ maxWidth: '120px' }}
                            >
                                취소
                            </AdmButton>
                            <AdmButton
                                size={'large'}
                                onClick={startUploadFile}
                                style={{ maxWidth: '120px' }}
                            >
                                등록하기
                            </AdmButton>
                        </div>
                    }
                </div>
            </div >
            <input id="input_file" style={{ display: 'none' }} type="file" accept="video/*" />
        </div >
    )
}

export default AdmReplyUpdatePopup;