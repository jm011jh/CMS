import AdmButton from "@/app/admin/components/design/AdmButton";
import { AdmInputCheckbox, AdmInputDate, AdmInputSelect, AdmInputText } from "@/app/components/form/Input"; // AdmInputDate 추가
import { convertToISO8601 } from "@/lib/util/commonUtil";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { CSSProperties, useEffect, useState } from "react";
import { basicThemeColors } from "../../assets/theme";
export type T_AdmListSrchParamOption = { label: string; value: string };


const AdmListSrchBarLabel: React.FC<{ text: string | undefined }> = ({ text }) => {
    const style: React.CSSProperties = {
        fontSize: '16px',
        fontWeight: 700,
        color: '#000000',
        width: '140px',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        lineHeight: '64px', // Center text vertically
        backgroundColor: basicThemeColors.gray100, // Optional: background color for better visibility
        borderRight: `1px solid ${basicThemeColors.gray300}`, // Optional: border for separation
    }
    return (
        <div style={style}>{text && text}</div>
    )
}
const AdmListSrchBarInput: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const style = {
        fontSize: '16px',
        fontWeight: '700',
        color: '#000000',
        width: 'calc(100% - 140px)', // Adjusted to fit label width
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
    }
    return (
        <div style={style}>{children}</div>
    )
}
export type T_AdmListSrchParam = {
    size: '100%' | '50%' | 'auto'; // 가로값, added 'auto' for flexibility
    inputType: 'search' | 'srchType' | 'date' | 'select' | 'datePatrolStart' | 'datePatrolEnd' | 'checkBox'; // 인풋의 타입, changed 'datePatrol' to 'date' for clarity
    paramKey: string; // url에 전달되는 파라미터 값
    label?: string; // Added label for inputs
    placeholder?: string; // Added placeholder
    selectLabel?: string;
    selectOptions?: T_AdmListSrchParamOption[]; // select 옵션들
    defaultValue?: string | Date;
    notInRow?: boolean;
};

type T_AdmListSrchBarProps = {
    srchTypes: T_AdmListSrchParam[];
    initialSearchValues?: Record<string, string>;
    title?: string;
};

const AdmListSrchBar: React.FC<T_AdmListSrchBarProps> = ({ srchTypes,
    initialSearchValues, title }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderRadius: '8px',
            // marginBottom: '20px',
            // pointerEvents: 'none', // for test
        },
        optionsContainer: {
            minWidth: 'calc(100% - 240px)',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end', // Align items to the bottom for better visual with labels
            borderRight: `1px solid ${basicThemeColors.gray300}`, // Right border for separation
            borderBottom: `1px solid ${basicThemeColors.gray300}`, // Right border for separation

            // pointerEvents: "none" // for test
        },
        optionItem: {
            borderLeft: `1px solid ${basicThemeColors.gray300}`, // Right border for separation
            borderTop: `1px solid ${basicThemeColors.gray300}`, // Top border for separation
            display: 'flex',
            flexDirection: 'row', // Stack label and input
        },
        label: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
        },
        actionsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        datePickerWrapper: { // Style for DatePicker
            width: '100%',
        },
        title: {
            fontSize: '18px',
            fontWeight: '600',
            color: `${basicThemeColors.black}`,
        },
    };

    // #region 검색조건 ####################################################################################
    const [searchValues, setSearchValues] = useState<Record<string, any>>({});

    useEffect(() => { // 초기에 값을 가져오는 useEffect훅

        const initialValues: Record<string, any> = {};

        srchTypes.forEach(type => {// 컴포넌트의 파라미터에서 받아온다
            if (initialSearchValues && initialSearchValues[type.paramKey] !== undefined) {
                if (type.inputType === 'date' || type.inputType === 'datePatrolStart' || type.inputType === 'datePatrolEnd') {
                    initialValues[type.paramKey] = initialSearchValues[type.paramKey]; // AdmInputDate는 문자열 또는 Date 객체를 받을 수 있음
                } else {
                    initialValues[type.paramKey] = initialSearchValues[type.paramKey];
                }
            }

        });

        setSearchValues(initialValues);

    }, [srchTypes, initialSearchValues]);
    // #endregion 검색조건 ####################################################################################
    // #region 검색 펑션 ####################################################################################
    const router = useRouter();
    const handleSearch = (searchQuery: Record<string, string>) => {
        const newSearchParams = new URLSearchParams(window.location.search);
        const searchQueryKeys = Object.keys(searchQuery);
        const currentKeysInUrl = Array.from(newSearchParams.keys());
        for (const key of currentKeysInUrl) {
            if (key !== 'page' && !searchQueryKeys.includes(key)) {
                newSearchParams.delete(key);
            }
        }
        Object.entries(searchQuery).forEach(([key, value]) => {
            newSearchParams.set(key, value);
        });

        // Reset page to 1 for new search
        newSearchParams.set('page', '1');
        const thisUrl = new URL(window.location.href);
        const thisOriginPath = thisUrl.origin + thisUrl.pathname;

        router.push(`${thisOriginPath}?${newSearchParams.toString()}`);
    };
    // #endregion 검색 펑션 ####################################################################################

    const handleInputChange = (paramKey: string, value: string | Date | null | string[]) => {
        console.log(paramKey, value);
        if (paramKey === 'startDate' && value) {
            const date = dayjs(value.toString());
            setSearchValues(prev => ({ ...prev, [paramKey]: date.format('YYYY-MM-DD 00:00:00') }));
        } else if (paramKey === 'endDate' && value) {
            const date = dayjs(value.toString());
            setSearchValues(prev => ({ ...prev, [paramKey]: date.format('YYYY-MM-DD 23:59:59') }));
        } else {
            setSearchValues(prev => ({ ...prev, [paramKey]: value }));
        }
    };
    const clearDate = () => {
        setSearchValues(prev => ({ ...prev, startDate: null, endDate: null }));
    };

    const handleSearchClick = () => {
        const paramsToSubmit: Record<string, string> = {};
        for (const key in searchValues) {

            // 날짜형식의 값을 검사
            if (key === 'startDate' || key === 'endDate') {
                const value = searchValues[key];
                if (value) {
                    paramsToSubmit[key] = String(convertToISO8601(value));
                }
            } else {
                paramsToSubmit[key] = String(searchValues[key]);
            }

            // category와 searchType일 때 값이 all일 경우에는 제거
            // if (key === 'category' && paramsToSubmit[key] === 'all') {
            //     delete paramsToSubmit[key];
            // }
            // if (key === 'searchType' && paramsToSubmit[key] === 'all') {
            //     delete paramsToSubmit[key];
            // }
            // if (key === 'reasonType' && paramsToSubmit[key] === 'all') {
            //     delete paramsToSubmit[key];
            // }
            // if (key === 'planType' && paramsToSubmit[key] === 'all') {
            //     delete paramsToSubmit[key];
            // }
            // if (key === 'storeType' && paramsToSubmit[key] === 'all') {
            //     delete paramsToSubmit[key];
            // }
            if (paramsToSubmit[key] === 'all') {
                delete paramsToSubmit[key];
            }


            // 만약 인풋 값이 비어있을 경우 param에서 제거
            if (paramsToSubmit[key] === '' || paramsToSubmit[key] === 'null') {
                delete paramsToSubmit[key];
            }
        }
        console.log(paramsToSubmit)
        handleSearch(paramsToSubmit);
    };

    const getOptionItemStyle = (size: T_AdmListSrchParam['size']): CSSProperties => {
        //우측 여백이 발생하여 삭제
        // if (size === '100%') return { width: 'calc(100% - 16px)' };
        // if (size === '50%') return { width: 'calc(50% - 8px)' };
        if (size === '100%') return { width: 'calc(100%)', minWidth: '400px' };
        if (size === '50%') return { width: 'calc(50%)', minWidth: '400px' };
        return { flexGrow: 1, minWidth: '200px' };
    }

    return (
        <div style={styles.container}>
            {title && <div style={styles.title}>{title}</div>}
            <div style={styles.optionsContainer}>
                {srchTypes.map((type) => (
                    !type.notInRow &&
                    <div key={type.paramKey} style={{ ...styles.optionItem, ...getOptionItemStyle(type.size) }}>
                        <AdmListSrchBarLabel text={type.label} />
                        <AdmListSrchBarInput>
                            <>
                                {
                                    type.inputType === 'search' && (
                                        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                            {
                                                srchTypes.map((type2) => (
                                                    type2.inputType === 'srchType' && (
                                                        <AdmInputSelect
                                                            key={type2.inputType}
                                                            boxStyle={{ maxWidth: '160px', minWidth: '160px' }} // Adjust input width to fill available space
                                                            id={type2.paramKey}
                                                            name={type2.paramKey}
                                                            value={String(searchValues[type2.paramKey] || 'all')}
                                                            onChange={(val) => handleInputChange(type2.paramKey, val)}
                                                            options={type2.selectOptions || []}
                                                            placeholder={type2.placeholder || `Select ${type2.paramKey}`}
                                                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                                        />
                                                    )
                                                ))
                                            }
                                            <AdmInputText
                                                boxStyle={{ maxWidth: type.size === '100%' ? '390px' : 'calc(100%)', width: '100%' }}
                                                searchIcon={true}
                                                key={type.inputType}
                                                id={type.paramKey + 'select'}
                                                name={type.paramKey + 'select'}
                                                size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                                placeholder="검색어를 입력하세요"
                                                value={String(searchValues['search'] || '')}
                                                onChange={(val) => handleInputChange(type.paramKey, val)}
                                            />

                                        </div>
                                    )
                                }
                                {type.inputType === 'datePatrolStart' && (
                                    <>
                                        <AdmInputDate
                                            id={'startDate'}
                                            name={'startDate'}
                                            value={searchValues.startDate || null} // AdmInputDate는 null 또는 Date 객체 또는 ISO 문자열을 받음
                                            onChange={(val) => handleInputChange('startDate', val)} // val은 string | null | Date
                                            placeholder={type.placeholder || "날짜 선택"}
                                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                            desc="" // AdmInputDate는 desc prop이 필수일 수 있음
                                            only="date" // 날짜만 선택 가능하도록 설정
                                        />
                                        <div style={{
                                            width: '12px',
                                            height: '2px',
                                            backgroundColor: basicThemeColors.gray300,
                                            borderRadius: '2px',
                                            margin: '0 8px',
                                        }}></div>
                                        <AdmInputDate
                                            id={'endDate'}
                                            name={'endDate'}
                                            value={searchValues.endDate || null} // AdmInputDate는 null 또는 Date 객체 또는 ISO 문자열을 받음
                                            onChange={(val) => handleInputChange('endDate', val)} // val은 string | null | Date
                                            placeholder={type.placeholder || "날짜 선택"}
                                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                            desc="" // AdmInputDate는 desc prop이 필수일 수 있음
                                            only="date" // 날짜만 선택 가능하도록 설정
                                        />
                                        <div onClick={clearDate} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', cursor: 'pointer' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <path d="M16.5009 2.46967C16.7938 2.17678 17.2686 2.17678 17.5615 2.46967C17.8544 2.76256 17.8544 3.23732 17.5615 3.53022L3.56147 17.5302C3.26857 17.8231 2.79381 17.8231 2.50092 17.5302C2.20803 17.2373 2.20803 16.7626 2.50092 16.4697L16.5009 2.46967Z" fill="#9CA3AF" />
                                                <path d="M2.50092 2.46967C2.79381 2.17678 3.26857 2.17678 3.56147 2.46967L17.5615 16.4697L17.6132 16.5263C17.8535 16.8209 17.8361 17.2556 17.5615 17.5302C17.2869 17.8048 16.8521 17.8223 16.5576 17.582L16.5009 17.5302L2.50092 3.53022C2.20803 3.23732 2.20803 2.76256 2.50092 2.46967Z" fill="#9CA3AF" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                                {type.inputType === 'select' && (
                                    <AdmInputSelect
                                        boxStyle={{ maxWidth: '160px' }} // Adjust input width to fill available space
                                        id={type.paramKey}
                                        name={type.paramKey}
                                        value={String(searchValues[type.paramKey] || 'all')}
                                        onChange={(val) => handleInputChange(type.paramKey, val)}
                                        options={type.selectOptions || []}
                                        placeholder={type.placeholder || `Select ${type.paramKey}`}
                                        size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                    />
                                )}
                                {type.inputType === 'checkBox' && (
                                    <AdmInputCheckbox
                                        id={type.paramKey}
                                        name={type.paramKey}
                                        value={String(searchValues[type.paramKey] || '')}
                                        onChange={(val: any) => handleInputChange(type.paramKey, val)}
                                        options={type.selectOptions || []}
                                        size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                        isDisabled={true}
                                    />
                                )}
                            </>
                        </AdmListSrchBarInput>
                    </div>
                ))}
            </div>
            <div style={styles.actionsContainer}>
                <AdmButton size={'large'} color="primaryFill" onClick={handleSearchClick}>
                    검색
                </AdmButton>
            </div>
        </div>
    )
};

export default AdmListSrchBar;