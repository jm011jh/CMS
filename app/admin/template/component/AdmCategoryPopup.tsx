"use client";

import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import AdminCategoryBox from "./AdminCategoryBox";


type AdmSubsUserPopupProps = {
    typeProp?: 'MEDIA' | 'FAQ' | 'FAQ_NONE'
    close?: () => void;
}

interface Category {
    id: any;
    name: string;
    nameEn: string;
    type: 'MEDIA' | 'FAQ' | 'FAQ_NONE' | undefined;
}


const AdmCategoryPopup: React.FC<AdmSubsUserPopupProps> = ({ typeProp, close }) => {
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
            alignSelf: 'stretch',
        },

        bodyBox: {
            width: '536px',
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'center',
        },

        bodyBottom: {
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        },
    }

    // # API ==============================================================
    const [detailData, setDetailData] = useState<Category[]>([]);
    const [originData, setOriginData] = useState<Category[]>([]);
    const APIgetCategoryList = async () => {
        try {
            const url = '/api/admin/category';
            const token = getAccessToken();
            const response: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
            setDetailData(response.data.data);
            setOriginData(response.data.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    const APIpostCategory = async (name: string, nameEn: string) => {
        try {
            const url = '/api/admin/category';
            const token = getAccessToken();
            const param = {
                name: name,
                nameEn: nameEn,
                type: typeProp,
            }
            const response: any = await callAPI(HTTPMETHOD.POST, param, url, token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    // const APIpostCategoryBasic = async (name: string, nameEn: string) => {
    //     try {
    //         const url = '/api/admin/category';
    //         const token = getAccessToken();
    //         const param = { name: name, nameEn: nameEn, type: 'FAQ_NONE' };
    //         const response: any = await callAPI(HTTPMETHOD.POST, param, url, token);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    const APIpatchCategory = async (id: string, name: string, nameEn: string) => {
        try {
            const url = '/api/admin/category';
            const token = getAccessToken();
            const param = {
                id: id,
                name: name,
                nameEn: nameEn,
            }
            const response: any = await callAPI(HTTPMETHOD.PATCH, param, url, token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    const APIdeleteCategory = async (id: string) => {
        try {
            const url = '/api/admin/category/faq/' + id;
            const token = getAccessToken();
            const param = { id: id };
            const response: any = await callAPI(HTTPMETHOD.DELETE, param, url, token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        APIgetCategoryList();
    }, [typeProp])
    // #region event ========================================================
    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = Array.from(detailData); // `detailData` 배열을 얕은 복사하여 새로운 배열을 생성합니다.
        const [reorderedItem] = items.splice(result.source.index, 1); // source index를 사용하여 원래 위치에서 항목을 제거합니다.
        items.splice(result.destination.index, 0, reorderedItem); // destination index를 사용하여 제거된 항목을 새로운 위치에 삽입합니다.
        setDetailData(items); // 재정렬된 배열로 상태를 업데이트합니다.
    };
    const handleUpdate = (id: string, title: string, description: string) => {
        const updatedData = detailData.map((item: any) => {
            if (item.id.toString() === id) {
                return { ...item, name: title, nameEn: description };
            }
            return item;
        });
        setDetailData(updatedData);
    };
    const handleDelete = (id: string) => {
        const updatedData = detailData.filter((item: any) => item.id.toString() !== id);
        setDetailData(updatedData);
    };
    const handleAdd = () => {
        const newCategory: Category = {
            id: `new-${Date.now()}`,
            name: '새 카테고리',
            nameEn: 'New Category',
            type: typeProp || 'FAQ_NONE',
        };
        setDetailData([...detailData, newCategory]);
    };
    const saveCategory = async () => {
        try {
            const promises: Promise<any>[] = [];
            detailData.forEach((item: Category) => {
                if (item.type !== 'FAQ_NONE') {
                    if (item.id.toString().includes('new')) { // 추가일 경우
                        promises.push(APIpostCategory(item.name, item.nameEn));
                    } else { // 수정일 경우
                        promises.push(APIpatchCategory(item.id, item.name, item.nameEn));
                        console.log(item.id, item.name, item.nameEn);
                    }
                }
            });
            originData.forEach((item: Category) => {
                if (!detailData.some((detailItem: Category) => detailItem.id === item.id)) {
                    promises.push(APIdeleteCategory(item.id));
                }
            });
            await Promise.all(promises);
            // APIpostCategoryBasic('미분류(비공개)', '')
            return true;
        } catch (error) {
            console.error("카테고리 저장 중 오류 발생:", error);
            return false;
        }
    }
    const handleSave = () => {
        saveCategory()
            .then((result: boolean) => {
                if (result) {
                    alert('카테고리 설정이 완료되었습니다.');
                    close?.();

                    window.location.reload(); // 페이지 새로고침
                } else {
                    alert('카테고리 설정 중 오류가 발생하였습니다.');
                }
            })
            .catch((error: any) => {
                alert('카테고리 설정 중 오류가 발생하였습니다.');
            })
    }
    // #endregion event ======================================================

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'카테고리 설정'}</p>
                        <button onClick={close} style={styles.closeButton}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div style={styles.body}>
                        {detailData !== null && detailData.length !== 0 &&
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable" >
                                    {(provided, snapshot) => (
                                        <div
                                            style={{
                                                backgroundColor: snapshot.isDraggingOver ? '#F3F4F6' : '#FFFFFF',
                                                borderRadius: '6px',
                                                overflowY: 'auto',
                                                height: detailData.length * 48 + 32 + 'px',
                                                ...styles.body,
                                            }}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                detailData.map((item, index) => (
                                                    item.type !== 'FAQ_NONE' &&
                                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index} isDragDisabled={true}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    height: '48px',
                                                                    ...styles.bodyBox,
                                                                }}
                                                            >
                                                                <AdminCategoryBox
                                                                    id={item.id.toString()}
                                                                    title={item.name}
                                                                    description={item.nameEn}
                                                                    onUpdate={handleUpdate}
                                                                    onDelete={handleDelete} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        }
                        <div style={styles.bodyBottom}>
                            <AdmButton
                                size={'large'}
                                color={'primaryBorder'}
                                onClick={handleAdd}
                                style={{ minWidth: '160px', maxWidth: '160px' }}
                            >
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.333 9.25L16.4092 9.25391C16.7875 9.29223 17.083 9.61161 17.083 10C17.083 10.3884 16.7875 10.7078 16.4092 10.7461L16.333 10.75H4.66602C4.2518 10.75 3.91602 10.4142 3.91602 10C3.91602 9.58579 4.2518 9.25 4.66602 9.25H16.333Z" fill="#6B7280" />
                                    <path d="M9.75 15.835V4.16797C9.75 3.75376 10.0858 3.41797 10.5 3.41797C10.9142 3.41797 11.25 3.75376 11.25 4.16797V15.835C11.2498 16.249 10.9141 16.585 10.5 16.585C10.0859 16.585 9.75018 16.249 9.75 15.835Z" fill="#6B7280" />
                                </svg>
                                <span style={{ marginLeft: '8px' }}>새 카테고리 추가</span>
                            </AdmButton>

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
                                    handleSave();
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

export default AdmCategoryPopup;