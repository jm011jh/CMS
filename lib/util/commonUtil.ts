import dayjs from "dayjs";

/**
 * 시간 변환 함수
 * 1 min ago
 * 1 hour ago
 * 03/03
 * 24/03/03
 * 
 * @param date 
 * @returns 
 */
export const calDate = (date: string) => {
    const target = dayjs(date);
    if (target.diff(dayjs(), "minutes") >= -60) {
        return -target.diff(dayjs(), "minutes") + " min ago";
    } else if (target.diff(dayjs(), "hours") >= -24) {
        return -target.diff(dayjs(), "hours") + " hour ago";
    } else if (target.get("year") == dayjs().get("years")) {
        return target.format("MM/DD");
    } else {
        return target.format("YY/MM/DD");
    }
}

/**
 * 만 age 해당 되는지 체크
 * 
 * @param date 
 * @param age 
 * @returns 
 */
export const overAge = (date: string, age: number = 14) => {
    const target = dayjs(date);
    // const target = dayjs().set("year", date).set("month",month-1).set("date", day);

    if (target.diff(dayjs(), "year") > -age) {
        return true;
    } else {
        return false;
    }
}

/**
 * string to blob
 * 
 * @param b64Data 
 * @param contentType 
 * @param sliceSize 
 * @returns 
 */
export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

/**
 * 동기 테스트 function
 * 
 * @param ms 
 * @returns 
 */
export const sleep = function (ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

/**
 * 비밀번호 validate
 * 
 * @param pw 
 * @returns
 *  true - 규칙 맞음
 *  fales - 규칙 틀림
 */
export const validatePw = function (pw: string) {

    //최소 6자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상 (패스워드 체크시 활용)
    // const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;

    //최소 8자리 이상 영문, 숫자, 특수문자가 각각 1개 이상
    const regex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
    
    if (regex.exec(pw)) {
        return true;
    } else {
        return false;
    }
};

/**
 * 숫자 validate
 * 
 * @param tel 
 * @returns
 *  true - 규칙 맞음
 *  fales - 규칙 틀림
 */
export const validateTel = function (tel: string) {

    //숫자
    const regex = /^[0-9]+$/;

    if (regex.exec(tel)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 한글 validate
 * 
 * @param txt 
 * @returns
 *  true - 규칙 맞음
 *  fales - 규칙 틀림
 */
export const validateKorea = function (txt: string) {

    //공백 포함한 한글만
    const regex = /^[가-힣\s]+$/;

    if (regex.exec(txt)) {
        return true;
    } else {
        return false;
    }

}

/**
 * 영문 validate
 * 
 * @param txt
 * @returns 
 */
export const validateEnglish = function (txt: string) {

    //영어(공백 포함)
    const regex = /^[a-zA-Z\s]+$/;

    if (regex.exec(txt)) {
        return true;
    } else {
        return false;
    }

}
/**
 * 이메일 validate
 * 
 * @param tel 
 * @returns
 *  true - 규칙 맞음
 *  fales - 규칙 틀림
 */
export const validateEmail = function (email: string) {
    // return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    const regex = new RegExp('[a-z0-9]+@[a-z\\-]+\\.[a-z]{2,3}');
    return regex.test(email);
}

/**
 * pdf 파일 다운로드
 * 
 * @param file_url 
 * @param fileName 
 */
export async function pdf_file_get(file_url: string, fileName: string = "kr") {
    const init = await fetch(file_url, { method: "get" })
    const blob = await init.blob()

    // const init = await fetch(file_url, {
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    //     mode: "no-cors", // no-cors, *cors, same-origin
    // });

    //cors걸리면 다운로드 불가


    // use blob ... (await 키워드 사용)
    // *** 예제: 함수가 실행되면 파일 다운로드 바로 되게 ***
    // 파일이름 가져오기 [중간 단락 if문에 대한 부분 파일명을 자르는 것 같은데 pdf로는 테스트 안넘어가짐]
    // const disposition = init.headers.get("content-disposition")
    // let fileName = "information.pdf";
    // if (language === "kr")
    //     fileName = "한국어.pdf";

    // if (disposition && disposition.indexOf('attachment') !== -1) {
    //     const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    //     const matches = filenameRegex.exec(disposition)
    //     if (matches != null && matches[1]) {
    //         fileName = matches[1].replace(/['"]/g, '')
    //     }
    // }


    // 가상 링크 DOM 만들어서 다운로드 실행 [가상 돔으로만 a 태그 방식으로 만들려니까 안됨 ㅋㅋ]
    const url = window.URL.createObjectURL(await blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)

}

export function toRFC2231(str: string) {
    const bytes = new TextEncoder().encode(str);
    let sb = 'utf-8\'\'';

    for (let i = 0; i < bytes.length; i++) {
        const b = bytes[i];

        if (b >= 0x20 && b <= 0x7E) {
            if (b === 0x22 || b === 0x25 || b === 0x5C) {
                sb += '\\';
            }
            sb += String.fromCharCode(b);
        } else {
            sb += '%' + b.toString(16).toUpperCase();
        }
    }

    return sb;
}

/** * 파일명에서 확장자명 추출 *
 @param filename   파일명
 @returns _fileExt 확장자명
  */
export function getExtensionOfFilename(filename: string) {
    const _fileLen = filename.length;
    const _lastDot = filename.lastIndexOf('.');
    const _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
    return _fileExt;
}

/** * 랜덤으로 문자열 생성 *
 @param length 문자열 길이
 @returns 랜덤 문자열
  */
export function getRandomId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


/**
 * 날짜 문자열을 ISO 8601 형식으로 변환
 * 
 * @param dateString - 변환할 날짜 문자열
 * @returns ISO 8601 형식의 날짜 문자열
 */
export function convertToISO8601(dateString: string = ''): string {
    if( !dateString ) {
        return new Date().toISOString();
    }
    const date = new Date(dateString);
    return date.toISOString();
}