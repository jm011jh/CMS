"use client";

import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import { AdmInputText, AdmInputTextArea } from "@/app/components/form/Input";
import HeicThumbnail from "@/app/components/HeicThumbnail";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdmArtistEditPopupProps = {
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
    handleSave?: (data: any) => void;
}

const AdmArtistEditPopup: React.FC<AdmArtistEditPopupProps> = ({ data, status, close, handleSave }) => {
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
            maxWidth: '600px',
            backgroundColor: '#fff',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            maxHeight: 'calc(100% - 40px)',
            overflowY: 'auto',
        },
        head: {
            width: '100%',
            minHeight: '56px',
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
            alignSelf: 'stretch',
        },

        bodyBox: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
        },

        bodyBottom: {
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        },

        profileBackground: {
            overflow: 'hidden',
            display: 'flex',
            width: '200px',
            height: '356px',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: '16px',
            paddingBottom: '80px',
            background: 'var(--Gray-500, #6B7280)',
            position: 'relative',
        },

        profileImage: {
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '99px',
            background: 'var(--Gray-300, #D1D5DB)',
            position: 'relative',
            overflow: 'hidden',
        },

        profileImageBtnRoot: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '16px',
            marginBottom: '16px',
            gap: '8px',
        },

        profileImageBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '32px',
            padding: '9px 12px',
            gap: '9px',
            borderRadius: '666px',
            border: `1px solid ${basicThemeColors.gray100}`,
            backgroundColor: basicThemeColors.gray100,
            color: basicThemeColors.gray500,
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
        },

        profileImageDesc: {
            color: 'var(--Gray-400, #9CA3AF)',
            fontSize: '12px',
            marginBottom: '16px',
        },

        profileInputRoot: {
            color: 'var(--Black, #000)',
            fontSize: '16px',
            gap: '8px',
            marginTop: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }
    }

    const [detailData, setDetailData] = useState<any>(null);

    useEffect(() => {
        setDetailData(data || []);

        if (data.profile) {
            if (data.profile.backgroundImage) {
                setBackgroundImage(data.profile.backgroundImage);
            }
            if (data.profile.profileImage) {
                setProfileImage(data.profile.profileImage);
            }
        }

    }, [])

    const [backgroundImage, setBackgroundImage] = useState<any>(null);
    const [profileImage, setProfileImage] = useState<any>(null);

    useEffect(() => {
        console.log(backgroundImage)
    }, [backgroundImage])

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                status === 'success' &&
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'관리자/아티스트 설정'}</p>
                        <button onClick={close} style={styles.closeButton}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div style={styles.body}>
                        <div style={styles.bodyBox}>
                            <div style={styles.profileBackground}>
                                <div style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <HeicThumbnail
                                        fileUrl={backgroundImage?.fileUrl || ''}
                                        fileName={backgroundImage?.fileName || ''}
                                        sizes="100%"
                                        objectFit={'cover'}
                                    />
                                </div>
                                <div style={styles.profileImage}>
                                    {
                                        profileImage
                                            ?
                                            <HeicThumbnail
                                                fileUrl={profileImage?.fileUrl || ''}
                                                fileName={profileImage?.fileName || ''}
                                                sizes="100%"
                                                objectFit={'cover'}
                                            />
                                            :
                                            <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.3867 28C33.2192 28 37.1367 24.0825 37.1367 19.25C37.1367 14.4175 33.2192 10.5 28.3867 10.5C23.5542 10.5 19.6367 14.4175 19.6367 19.25C19.6367 24.0825 23.5542 28 28.3867 28Z" fill="white" />
                                                <path d="M14.7344 40.5992C14.7344 35.96 18.4952 32.1992 23.1344 32.1992H32.9344C37.5736 32.1992 41.3344 35.96 41.3344 40.5992V44.7992H14.7344V40.5992Z" fill="white" />
                                            </svg>
                                    }
                                </div>
                            </div>

                            <div style={styles.profileImageBtnRoot}>
                                <div style={styles.profileImageBtn} onClick={() => {
                                    const profileImageInput = document.getElementById('profileImageInput') as HTMLInputElement;
                                    if (profileImageInput) {
                                        profileImageInput.click();
                                    }
                                }}>

                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3685_32892)">
                                            <path d="M12.5352 7.00195C12.5352 3.96439 10.0727 1.50195 7.03516 1.50195C3.99759 1.50195 1.53516 3.96439 1.53516 7.00195C1.53516 10.0395 3.99759 12.502 7.03516 12.502C10.0727 12.502 12.5352 10.0395 12.5352 7.00195ZM13.5352 7.00195C13.5352 10.5918 10.625 13.502 7.03516 13.502C3.44531 13.502 0.535156 10.5918 0.535156 7.00195C0.535156 3.4121 3.44531 0.501953 7.03516 0.501953C10.625 0.501953 13.5352 3.4121 13.5352 7.00195Z" fill="#6B7280" />
                                            <path d="M8.36979 6.16732C8.36979 5.43094 7.77284 4.83398 7.03646 4.83398C6.30008 4.83398 5.70313 5.43094 5.70313 6.16732C5.70313 6.9037 6.30008 7.50065 7.03646 7.50065C7.77284 7.50065 8.36979 6.9037 8.36979 6.16732ZM9.36979 6.16732C9.36979 7.45598 8.32512 8.50065 7.03646 8.50065C5.74779 8.50065 4.70312 7.45598 4.70312 6.16732C4.70312 4.87865 5.74779 3.83398 7.03646 3.83398C8.32512 3.83398 9.36979 4.87865 9.36979 6.16732Z" fill="#6B7280" />
                                            <path d="M9.20052 12.3333V11.2741C9.20046 11.0429 9.12267 10.8351 9.00456 10.694C8.88871 10.5557 8.75268 10.5001 8.63411 10.5H5.43359C5.31503 10.5001 5.179 10.5557 5.06315 10.694C4.94504 10.8351 4.86725 11.0429 4.86719 11.2741V12.3333C4.86719 12.6095 4.64333 12.8333 4.36719 12.8333C4.09105 12.8333 3.86719 12.6095 3.86719 12.3333V11.2741C3.86724 10.8295 4.01436 10.3888 4.29622 10.0521C4.58028 9.71281 4.98664 9.50008 5.43359 9.5H8.63411C9.08107 9.50008 9.48743 9.71281 9.77148 10.0521C10.0533 10.3888 10.2005 10.8295 10.2005 11.2741V12.3333C10.2005 12.6095 9.97666 12.8333 9.70052 12.8333C9.42438 12.8333 9.20052 12.6095 9.20052 12.3333Z" fill="#6B7280" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3685_32892">
                                                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.367188 0.333984)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    {'프로필 설정'}
                                </div>

                                <div style={styles.profileImageBtn} onClick={() => {
                                    const profileBackgroundInput = document.getElementById('profileBackgroundInput') as HTMLInputElement;
                                    if (profileBackgroundInput) {
                                        profileBackgroundInput.click();
                                    }
                                }}>
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1185 2.75H3.95182C3.30749 2.75 2.78516 3.27233 2.78516 3.91667V12.0833C2.78516 12.7277 3.30749 13.25 3.95182 13.25H12.1185C12.7628 13.25 13.2852 12.7277 13.2852 12.0833V3.91667C13.2852 3.27233 12.7628 2.75 12.1185 2.75Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.28385 7.41732C6.92819 7.41732 7.45052 6.89498 7.45052 6.25065C7.45052 5.60632 6.92819 5.08398 6.28385 5.08398C5.63952 5.08398 5.11719 5.60632 5.11719 6.25065C5.11719 6.89498 5.63952 7.41732 6.28385 7.41732Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.2852 9.75113L11.485 7.95096C11.2662 7.73224 10.9695 7.60938 10.6602 7.60938C10.3508 7.60938 10.0541 7.73224 9.83532 7.95096L4.53516 13.2511" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    {'프로필 배경 설정'}
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profileBackgroundInput"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setBackgroundImage({
                                                file: file,
                                                fileUrl: URL.createObjectURL(file),
                                                fileName: file.name,
                                            });
                                        }
                                    }}
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profileImageInput"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setProfileImage({
                                                file: file,
                                                fileUrl: URL.createObjectURL(file),
                                                fileName: file.name,
                                            });
                                        }
                                    }}
                                />


                            </div>

                            <div style={styles.profileImageDesc}>
                                {'배경 9:16 비율 / 프로필 1:1 비율 / 지원파일 : jpg, jpeg, png (최대 10mb)'}
                            </div>

                            <div style={styles.profileInputRoot}>
                                <div>
                                    닉네임 *
                                </div>
                                <AdmInputText
                                    id={'profileName'}
                                    name={'profileName'}
                                    value={detailData?.name || ''}
                                    onChange={(val) => setDetailData((prev: any) => ({ ...prev, name: val }))}
                                    placeholder={'닉네임을 입력해주세요.'}
                                    desc="" // AdmInputText는 desc prop이 필수일 수 있음
                                    size="large"
                                />
                            </div>

                            <div style={styles.profileInputRoot}>
                                <div>
                                    상태 메시지
                                </div>
                                <AdmInputTextArea
                                    id={'profileDesc'}
                                    name={'profileDesc'}
                                    value={detailData?.profile?.statusMessage || ''}
                                    onChange={(val) => setDetailData((prev: any) => ({ ...prev, profile: { ...prev.profile, statusMessage: val } }))}
                                    placeholder={'상태메시지를 입력해주세요.'}
                                    desc="" // AdmInputText는 desc prop이 필수일 수 있음
                                    size="large"
                                />
                            </div>
                        </div>

                        <div style={styles.bodyBottom}>

                            <div style={{ width: '100%' }}></div>

                            <AdmButton
                                size={'large'}
                                color={'primaryBorder'}
                                onClick={close}
                                style={{ maxWidth: '120px' }}
                            >
                                취소
                            </AdmButton>
                            <AdmButton
                                size={'large'}
                                onClick={() => {
                                    if (handleSave) {
                                        const bgImagePayload = backgroundImage?.file || backgroundImage;
                                        const pImagePayload = profileImage?.file || profileImage;
                                        handleSave({
                                            ...detailData,
                                            updateProfile: {
                                                backgroundImage: bgImagePayload,
                                                profileImage: pImagePayload,
                                            }
                                        });
                                    }
                                }}
                                style={{ maxWidth: '120px' }}
                            >
                                저장
                            </AdmButton>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default AdmArtistEditPopup;