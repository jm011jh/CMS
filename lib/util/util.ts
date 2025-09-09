
// 리스트 아이템들 중에 date와 time이 같은 것이 있으면 해당 아이템의 id값을 return하는 함수
export const getDuplicateLectureId = (appliedList: any[]) => {
    const uniqueDateTimeMap = new Map();
    
    appliedList.forEach(item => {
        const { date, time } = item.lecture_id;
        const dateTimeKey = date + '-' + time;
        if (!uniqueDateTimeMap.has(dateTimeKey)) {
            uniqueDateTimeMap.set(dateTimeKey, []);
        }
        uniqueDateTimeMap.get(dateTimeKey).push(item);
    });
    
    const result : any = [];
    uniqueDateTimeMap.forEach(value => {
        if (value.length > 1) {
            result.push(...value);
        }
    });
    
    return result;
}


// 신청하는 강의와 이미 신청된 강의 리스트 비교하여 중복일 경우 true 리턴하는 함수
export const checkDuplicateLectureInApply = (appliedList: any[], lecture: any) => {

    // 이미 cart배열에 lecture가 있으면 return
    let isDuplicate = appliedList.some((appliedItem) => {
        return appliedItem.lecture_id.date === lecture.date && appliedItem.lecture_id.time === lecture.time;
    });
    // 카트에 중복된 강의가 있으면 장바구니에서 삭제하기 위해 중복체크변수를 false로 변경
    appliedList.forEach((appliedItem) => {
        if(appliedItem.lecture_id.id === lecture.id) {
            isDuplicate = false;
        }
    });

    if(isDuplicate) {
        return true;
    } else {
        return false;
    }

}


// "오늘하루 보지 않기" 를 위한 함수들

export const isSameDay = (date1 : any, date2 : any) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};
  
export const getStoredPopupDate = (popupId : string) => {
  const storedDate = localStorage.getItem(`popup${popupId}ClosedDate`);
  return storedDate ? new Date(storedDate) : null;
};

export const setStoredPopupDate = (popupId : string, date : any) => {
  localStorage.setItem(`popup${popupId}ClosedDate`, date.toISOString());
};