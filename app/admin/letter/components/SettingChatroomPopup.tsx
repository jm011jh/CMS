import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import viewDataImageFileOneUploadToS3 from "@/app/admin/lib/viewDataFilesUpload";
import useLoadingScreenStore from "@/app/admin/store/loadingScreenStore";
import { useToast } from "@/app/admin/store/useToastStore";
import { AdmInputTextArea } from "@/app/components/form/Input";
import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { useEffect, useState } from "react";

interface SettingChatroomPopupProps {
    close?: () => void;
}

const SettingChatroomPopup: React.FC<SettingChatroomPopupProps> = ({ close }) => {
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
            maxWidth: '600px',
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
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '16px',
            flexDirection: 'column',
        },
        screen: {
            width: '100%',
        },
        screenWrap: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
        },
        screenPreview: {
            width: '160px',
            height: '284px',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            pointerEvents: 'none',
        },
        screenPreviewImg: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: basicThemeColors.gray500,
        },
        screenPreviewImgFile: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        screenPreviewBasic: {
            backgroundColor: basicThemeColors.gray500,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        buttonsWrap: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
        },
        buttonsItem: {
            // minWidth: '138px',
            whiteSpace: 'nowrap',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: '16px',
            border: `1px solid ${basicThemeColors.gray100}`,
            backgroundColor: basicThemeColors.gray100,
            color: basicThemeColors.gray500,
            fontWeight: '600',
            cursor: 'pointer',
            padding: '0 12px',
            fontSize: '12px',
        },
        buttonsItemIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
        },
        desc: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexDirection: 'column',
            fontSize: '12px',
            lineHeight: '1.3',
        },
        desc01: {
            color: basicThemeColors.gray500,
        },
        desc02: {
            color: basicThemeColors.error500,
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            padding: '16px',
        },
        formTitle: {
            fontSize: '16px',
            lineHeight: '20px',
        },
        confirm: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '16px',
            padding: '0 16px 16px',
        },
    }
    // #region API =================================================
    const [isLoadingGreeting, setIsLoadingGreeting] = useState<boolean>(false);
    const [isLoadingScreenImage, setIsLoadingScreenImage] = useState<boolean>(false);
    const [screenImageUrl, setScreenImageUrl] = useState<string>('');
    const APIgetGreeting = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        const url = `/api/admin/chats/artist/setting`
        try {
            const res: any = await callAPI(HTTPMETHOD.GET, {}, url, token)
            if (res) {
                setChatGreeting(res.data.greetingMessage);
                setScreenImageUrl(res.data.backgroundImage.fileUrl)
            }
        } catch (e: any) {
            return e;
        }
    }
    useEffect(() => {
        APIgetGreeting();
        // APIgetScreenImage();
    }, []);

    const APIPatchGreeting = async () => {
        setIsLoadingGreeting(true);
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        const url = '/api/admin/chats/artist/setting/greeting-message'
        const param = {
            greetingMessage: chatGreeting,
        }
        try {
            const res: any = await callAPI(HTTPMETHOD.PATCH, param, url, token)
            console.log(res)
        } catch (e: any) {
            return e;
        } finally {
            setIsLoadingGreeting(false);
        }
    }
    const APIPatchScreenImage = async () => {
        setIsLoadingScreenImage(true);
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        if (screenFile) {
            let backgroundImageResult = null;
            const res: any = await viewDataImageFileOneUploadToS3(screenFile, 'chat/img');
            // console.log('File upload result:', result);
            if (!res) {
                throw new Error('배경 이미지 업로드에 실패했습니다.');
            }

            backgroundImageResult = res;
            const param = {
                fileName: backgroundImageResult.fileName,
                fileUrl: backgroundImageResult.fileUrl,
                fileType: backgroundImageResult.fileType,
                dimString: '',
            }
            try {
                const url = '/api/admin/chats/artist/setting/background-image'
                const res: any = await callAPI(HTTPMETHOD.PATCH, param, url, token)
                console.log(res)
            } catch (e: any) {
                return e;
            } finally {
                setIsLoadingScreenImage(false);
            }
        }
    }
    const APIDeleteScreenImage = async () => {
        setIsLoadingScreenImage(true);
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        try {
            const url = '/api/admin/chats/artist/setting/background-image'
            await callAPI(HTTPMETHOD.DELETE, {}, url, token)
        } catch (e: any) {
            return e;
        } finally {
            setIsLoadingScreenImage(false);
        }
    }
    // #endregion API ==============================================
    // #region form 설정 =================================================
    // 로딩 인터페이스
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const { addToast } = useToast();
    // 채팅 인사말
    const [chatGreeting, setChatGreeting] = useState<string>('');
    // 배경 이미지 파일
    const [screenFile, setScreenFile] = useState<File | null>(null);
    const handleScreenFile = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setScreenFile(file);
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    }
    const handleScreenFileClean = () => {
        setScreenFile(null);
        setScreenImageUrl('');
    }
    const handleConfirm = () => {
        showLoading();
        APIPatchGreeting()
            .then(() => {
                if (screenFile) {
                    APIPatchScreenImage()
                        .then(() => {
                            hideLoading();
                            addToast('수정이 완료됐습니다.');
                        }).catch(() => {
                            hideLoading();
                            addToast('수정에 실패했습니다.');
                        })
                } else {
                    if (screenImageUrl === '') {
                        APIDeleteScreenImage()
                            .then(() => {
                                hideLoading();
                                addToast('수정이 완료됐습니다.');
                            }).catch(() => {
                                hideLoading();
                                addToast('수정에 실패했습니다.');
                            })
                    } else {
                        hideLoading();
                        addToast('수정이 완료됐습니다.');
                    }
                }
            }).catch(() => {
                hideLoading();
                addToast('수정에 실패했습니다.');
            })
    }

    // #endregion form 설정 ==============================================


    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            <div style={styles.wrapper}>
                <div style={styles.head}>
                    <p style={styles.title}>{'채팅방 설정'}</p>
                    <button onClick={close} style={styles.closeButton}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div style={styles.body}>
                    <div style={styles.screen}>
                        <div style={styles.screenWrap}>
                            <div style={styles.screenPreview}>
                                <div style={styles.screenPreviewImg}>
                                    {
                                        screenFile
                                            ? <><div style={styles.screenPreviewImgFile}></div><img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={URL.createObjectURL(screenFile)} alt="" /></>
                                            :
                                            screenImageUrl
                                                ? <><div style={styles.screenPreviewImgFile}></div><img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={screenImageUrl} alt="" /></>
                                                : <div style={styles.screenPreviewBasic}></div>
                                    }
                                </div>
                                <div style={styles.screenConversationBox}><img style={{ display: 'block', width: 'calc(100% - 14px)', position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)' }} src="/image/screenConversationBox.png" alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.buttons}>
                        <div style={styles.buttonsWrap}>
                            <button style={styles.buttonsItem} onClick={handleScreenFile}>
                                <div style={styles.buttonsItemIcon}>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <g clipPath="url(#clip0_5146_27459)">
                                            <path d="M13.056 2.61133C13.3321 2.61133 13.556 2.83519 13.556 3.11133C13.556 3.38747 13.3321 3.61133 13.056 3.61133H9.72266C9.44651 3.61133 9.22266 3.38747 9.22266 3.11133C9.22266 2.83519 9.44651 2.61133 9.72266 2.61133H13.056Z" fill="#6B7280" />
                                            <path d="M10.8887 4.77669V1.44336C10.8887 1.16722 11.1125 0.943359 11.3887 0.943359C11.6648 0.943359 11.8887 1.16722 11.8887 1.44336V4.77669C11.8887 5.05284 11.6648 5.27669 11.3887 5.27669C11.1125 5.27669 10.8887 5.05284 10.8887 4.77669Z" fill="#6B7280" />
                                            <path d="M2 10.8887V3.11133C42 2.68404 2.16986 2.27415 2.47201 1.97201C2.77415 1.66986 3.18404 1.5 3.61133 1.5H7.77799L7.82878 1.5026C8.08096 1.52815 8.27799 1.74108 8.27799 2C8.27799 2.25892 8.08096 2.47185 7.82878 2.4974L7.77799 2.5H3.61133C3.44925 2.5 3.29364 2.56443 3.17904 2.67904C3.06443 2.79364 3 2.94925 3 3.11133V10.8887C3 11.0507 3.06443 11.2064 3.17904 11.321C3.29364 11.4356 3.44925 11.5 3.61133 11.5H11.3887C11.5507 11.5 11.7064 11.4356 11.821 11.321C11.9356 11.2064 12 11.0507 12 10.8887V6.72201C12.0001 6.44596 12.2239 6.22201 12.5 6.22201C12.7761 6.22201 12.9999 6.44596 13 6.72201V10.8887C13 11.316 12.8301 11.7259 12.528 12.028C12.2259 12.3301 11.816 12.5 11.3887 12.5H3.61133C3.18403 12.5 2.77415 12.3301 2.47201 12.028C2.16986 11.7259 2 11.316 2 10.8887Z" fill="#6B7280" />
                                            <path d="M9.9993 6.12695C10.265 6.12695 10.8365 6.29692 11.1386 6.59896L12.8528 8.31315C13.0481 8.50841 13.0481 8.82492 12.8528 9.02018C12.6697 9.20326 12.3799 9.21491 12.1835 9.05469L12.1458 9.02018L10.4316 7.30599C10.317 7.19142 10.1613 7.12695 9.9993 7.12695C9.83725 7.12695 9.68161 7.19142 9.56701 7.30599L4.51948 12.3535C4.32422 12.5488 4.00771 12.5488 3.81245 12.3535C3.61721 12.1583 3.6172 11.8417 3.81245 11.6465L8.85998 6.59896C9.1621 6.29692 9.57209 6.12695 9.9993 6.12695Z" fill="#6B7280" />
                                            <path d="M6.44466 5.33398C6.44466 4.99655 6.17139 4.72277 5.83398 4.72266C5.49648 4.72266 5.22266 4.99648 5.22266 5.33398C5.22277 5.67139 5.49655 5.94466 5.83398 5.94466C6.17132 5.94454 6.44454 5.67132 6.44466 5.33398ZM7.44466 5.33398C7.44454 6.2236 6.7236 6.94454 5.83398 6.94466C4.94426 6.94466 4.22277 6.22368 4.22266 5.33398C4.22266 4.44419 4.94419 3.72266 5.83398 3.72266C6.72368 3.72277 7.44466 4.44426 7.44466 5.33398Z" fill="#6B7280" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5146_27459">
                                                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.833984 0.333984)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p style={styles.buttonsItemTitle}>{'앨범에서 배경 설정'}</p>
                            </button>
                            <button style={styles.buttonsItem} onClick={handleScreenFileClean}>
                                <div style={styles.buttonsItemIcon}>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path d="M11.5833 1.75H3.41667C2.77233 1.75 2.25 2.27233 2.25 2.91667V11.0833C2.25 11.7277 2.77233 12.25 3.41667 12.25H11.5833C12.2277 12.25 12.75 11.7277 12.75 11.0833V2.91667C12.75 2.27233 12.2277 1.75 11.5833 1.75Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.75065 6.41732C6.39498 6.41732 6.91732 5.89498 6.91732 5.25065C6.91732 4.60632 6.39498 4.08398 5.75065 4.08398C5.10632 4.08398 4.58398 4.60632 4.58398 5.25065C4.58398 5.89498 5.10632 6.41732 5.75065 6.41732Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.75 8.75113L10.9498 6.95096C10.7311 6.73224 10.4344 6.60938 10.125 6.60938C9.81564 6.60938 9.51895 6.73224 9.30017 6.95096L4 12.2511" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p style={styles.buttonsItemTitle}>{'기본 배경 설정'}</p>
                            </button>
                        </div>
                    </div>
                    <div style={styles.desc}>
                        <div style={styles.desc01}>배경 9:16 비율 / 지원파일 : jpg, jpeg, png (최대 10mb)</div>
                        <div style={styles.desc02}>관리자 페이지에서는 투명도 조절이 불가능하므로 검정 20% 불투명도로 적용됩니다.</div>
                    </div>
                </div>
                <div style={styles.form}>
                    <div style={styles.formTitle}>채팅 인사말</div>
                    <AdmInputTextArea value={chatGreeting} onChange={(textValue: string) => setChatGreeting(textValue)} inputStyle={{ fontSize: '16px', lineHeight: '20px', height: '120px' }} size="small" id="chat-greeting" name="chat-greeting" placeholder="채팅 인사말을 입력해주세요." />
                </div>
                <div style={styles.confirm}>
                    <AdmButton size="large" color="primary" onClick={close}>{'취소'}</AdmButton>
                    <AdmButton size="large" color="primaryFill" onClick={handleConfirm}>{'저장'}</AdmButton>
                </div>
            </div>
        </div>
    )
}

export default SettingChatroomPopup;