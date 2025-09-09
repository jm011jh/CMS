import { AdmInputText } from "@/app/components/form/Input";
import { useEffect, useState } from "react";

type AdminCategoryBoxProps = {
    id: string;
    title: string;
    description: string;
    onUpdate: (id: string, title: string, description: string) => void; // Optional update handler
    onDelete: (id: string) => void; // Optional delete handler
}

const AdminCategoryBox: React.FC<AdminCategoryBoxProps> = ({ id, title, description, onUpdate, onDelete }) => {

    const styles: { [key: string]: React.CSSProperties } = {
        bodyBoxIcon: {
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '8px',
        },
        bodyBoxHead: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
        },
        bodyBoxHeadTitle: {
            fontSize: '16px',
            fontWeight: 500,
            color: '#111827',
        },
        bodyBoxHeadSubTitle: {
            fontSize: '14px',
            color: '#6B7280',
        },
        bodyBoxRight: {
            display: 'flex',
            alignItems: 'center',
        },
    };

    const [isEditing, setIsEditing] = useState(false);
    const [_title, setTitle] = useState(title);
    const [_description, setDescription] = useState(description);

    useEffect(() => {
        onUpdate(id, _title, _description);
    }, [_title, _description]);

    return (
        <>
            <div style={styles.bodyBoxIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 11.25C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H4.5C4.08579 12.75 3.75 12.4142 3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25L19.5 11.25Z" fill="#9CA3AF" />
                    <path d="M19.5 16.25C19.9142 16.25 20.25 16.5858 20.25 17C20.25 17.4142 19.9142 17.75 19.5 17.75H4.5C4.08579 17.75 3.75 17.4142 3.75 17C3.75 16.5858 4.08579 16.25 4.5 16.25H19.5Z" fill="#9CA3AF" />
                    <path d="M19.5 6.25C19.9142 6.25 20.25 6.58579 20.25 7C20.25 7.41421 19.9142 7.75 19.5 7.75L4.5 7.75C4.08579 7.75 3.75 7.41421 3.75 7C3.75 6.58579 4.08579 6.25 4.5 6.25L19.5 6.25Z" fill="#9CA3AF" />
                </svg>
            </div>
            {
                isEditing ? (
                    <div style={styles.bodyBoxHead}>
                        <AdmInputText
                            id={`category-title-${id}`}
                            name="title"
                            placeholder="카테고리 제목"
                            value={_title}
                            onChange={(e: any) => setTitle(e)} size={"large"} />

                        <AdmInputText
                            id={`category-title-${id}`}
                            name="title"
                            placeholder="카테고리 제목"
                            value={_description}
                            onChange={(e: any) => setDescription(e)} size={"large"} />

                    </div>
                ) :
                    <div style={styles.bodyBoxHead}>
                        <div style={styles.bodyBoxHeadTitle}>
                            {_title}
                        </div>
                        <div style={styles.bodyBoxHeadSubTitle}>
                            {_description}
                        </div>
                    </div>
            }
            <div style={styles.bodyBoxRight}>
                <div style={styles.bodyBoxIcon} onClick={() => setIsEditing(!isEditing)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9167 4.34961C17.9167 3.92556 17.7477 3.51866 17.4479 3.21875C17.1481 2.91883 16.7412 2.75005 16.3171 2.75C15.8931 2.75002 15.4861 2.91802 15.1862 3.21777L4.06415 14.3428C3.95834 14.4483 3.87885 14.578 3.83465 14.7207L3.83563 14.7217L2.91669 17.749L5.94598 16.8311L6.05047 16.792C6.15273 16.7466 6.24618 16.6829 6.32587 16.6035L17.4479 5.48047C17.7476 5.18073 17.9165 4.77343 17.9167 4.34961ZM19.4167 4.34961C19.4165 5.17148 19.0897 5.95994 18.5085 6.54102L7.38544 17.665C7.10539 17.9442 6.7608 18.1515 6.38251 18.2666L2.7536 19.3662L2.75262 19.3672C2.55092 19.4278 2.33578 19.4322 2.13153 19.3809C1.92752 19.3295 1.74138 19.2238 1.59247 19.0752C1.44351 18.9265 1.33754 18.7402 1.28583 18.5361C1.23418 18.3321 1.23833 18.1177 1.29852 17.916L1.2995 17.9121L2.40008 14.2861L2.40106 14.2842C2.51714 13.9056 2.72425 13.5609 3.00458 13.2812L14.1257 2.15723C14.7068 1.57622 15.4953 1.25002 16.3171 1.25C17.139 1.2501 17.9274 1.57696 18.5085 2.1582C19.0896 2.73946 19.4168 3.52768 19.4167 4.34961Z" fill="#9CA3AF" />
                        <path d="M12.3037 3.96967C12.5965 3.67678 13.0713 3.67678 13.3642 3.96967L16.6972 7.30268C16.9901 7.59557 16.9901 8.07033 16.6972 8.36322C16.4043 8.65612 15.9296 8.65612 15.6367 8.36322L12.3037 5.03022C12.0108 4.73732 12.0108 4.26256 12.3037 3.96967Z" fill="#9CA3AF" />
                    </svg>
                </div>
                <div style={styles.bodyBoxIcon} onClick={() => onDelete(id)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4697 2.46967C16.7626 2.17678 17.2373 2.17678 17.5302 2.46967C17.8231 2.76256 17.8231 3.23732 17.5302 3.53022L3.53022 17.5302C3.23732 17.8231 2.76256 17.8231 2.46967 17.5302C2.17678 17.2373 2.17678 16.7626 2.46967 16.4697L16.4697 2.46967Z" fill="#9CA3AF" />
                        <path d="M2.46967 2.46967C2.76256 2.17678 3.23732 2.17678 3.53022 2.46967L17.5302 16.4697L17.582 16.5263C17.8223 16.8209 17.8048 17.2556 17.5302 17.5302C17.2556 17.8048 16.8209 17.8223 16.5263 17.582L16.4697 17.5302L2.46967 3.53022C2.17678 3.23732 2.17678 2.76256 2.46967 2.46967Z" fill="#9CA3AF" />
                    </svg>
                </div>
            </div>
        </>
    )
}

export default AdminCategoryBox;