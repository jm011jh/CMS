import { Dispatch, useEffect, useState } from "react";
import { basicThemeColors } from "../../assets/theme";

interface AdmInputCheckboxProps {
  isDisabled?: boolean;
  id: string; // 각 체크박스 ID의 접두사로 사용됩니다.
  name: string; // 체크박스 그룹의 이름입니다.
  value?: any; // 현재 선택된 값
  boxStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  selected: string[]; // 선택된 값들의 배열입니다.
  setSelected?: Dispatch<string[]>; // 선택된 값들을 업데이트하는 함수입니다.
  selectedAllItem?: string[]; // 전체 선택된 아이템들
}

export const AdmCheckBoxButton: React.FC<AdmInputCheckboxProps> = ({
  isDisabled,
  id,
  name,
  value,
  boxStyle,
  itemStyle,
  selected,
  setSelected,
  selectedAllItem = []
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    let newSelectedValues: any[];

    if (checkboxValue === 'all' && selectedAllItem) {
      // 전체 선택 체크박스가 클릭되었을 때
      if (isChecked) {
        // 전체 선택된 아이템들을 선택합니다.
        newSelectedValues = [...new Set(['all', ...selectedAllItem])];
      } else {
        // 전체 선택 해제 시 빈 배열로 설정
        newSelectedValues = [];
      }
    } else {
      if (isChecked) {
        // 값이 선택되면 배열에 추가합니다 (중복 방지).
        newSelectedValues = [...new Set([...selected, checkboxValue])];
      } else {
        // 값이 선택 해제되면 배열에서 제거합니다.
        newSelectedValues = selected.filter((v: any) => v !== checkboxValue);
      }
    }



    // //간단한 배열 비교 (순서 상관없이)
    // const arraysEqual = (a: string[], b: string[]) =>
    //   a.length === b.length && a.every(val => b.includes(val));

    // if (arraysEqual(newSelectedValues, selectedAllItem)) {
    //   newSelectedValues = ['all', ...newSelectedValues];
    // }

    // console.log('New selected values:', newSelectedValues);

    if (setSelected) {
      setSelected([...newSelectedValues]);
    }
  };

  const checkboxContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap', // 여러 항목이 있을 경우 줄바꿈 허용
    ...boxStyle,
  };

  const checkboxItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: isDisabled ? 'default' : 'pointer',
    color: isDisabled ? basicThemeColors.gray400 : basicThemeColors.black,
    position: 'relative', // For positioning the hidden input correctly
    ...itemStyle,
    fontWeight: '400',
  };

  // 시각적 체크박스 스타일
  const visualCheckboxBaseStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    border: `1.5px solid ${isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary}`,
    backgroundColor: basicThemeColors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s, border-color 0.2s',
    flexShrink: 0, // 크기 고정
  };

  const CheckmarkIcon = ({ color }: { color: string }) => (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 4L3.83333 6.5L8.5 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [visualCheckboxCurrentStyle, setVisualCheckboxCurrentStyle] = useState<React.CSSProperties>(visualCheckboxBaseStyle);

  useEffect(() => {

    // console.log('Selected values updated:', selected, value);

    // selected 값이 변경될 때마다 체크박스 상태를 업데이트합니다.
    const isCurrentlyChecked = selected.includes(value.toString());
    setIsChecked(isCurrentlyChecked);

    // 시각적 체크박스 스타일을 업데이트합니다.
    setVisualCheckboxCurrentStyle({
      ...visualCheckboxBaseStyle,
      backgroundColor: isCurrentlyChecked ? (isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary) : basicThemeColors.white,
      borderColor: isCurrentlyChecked ? (isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary) : (isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary),
    });

  }, [selected]); // selected 값이 변경될 때마다 컴포넌트가 업데이트되도록 합니다.
  // 초기 선택된 값이 없을 경우 빈 배열로 설정

  return (
    <div> {/* 설명을 위한 일관된 래퍼 */}
      <div style={checkboxContainerStyle} data-disabled={isDisabled}>
        <label key={value} htmlFor={`${id}-${value}`} style={checkboxItemStyle}>
          <input
            tabIndex={isDisabled ? -1 : 1}
            type="checkbox"
            disabled={isDisabled}
            id={`${id}-${value}`}
            name={name} // 그룹 내 모든 체크박스는 동일한 name을 가질 수 있습니다.
            value={value}
            checked={isChecked}
            onChange={handleChange}
            style={{
              position: 'absolute',
              opacity: 1,
              cursor: isDisabled ? 'default' : 'pointer',
              width: '13px',
              height: '13px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0,
              padding: 0,
              zIndex: 1, // 시각적 요소 위에 있도록
            }}
          />
          <div style={{ ...visualCheckboxCurrentStyle, position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
            {isChecked && <CheckmarkIcon color={basicThemeColors.white} />}
          </div>
        </label>
      </div>
    </div>
  );
};