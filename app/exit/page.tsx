"use client"

import { useState } from 'react'
import './style.css'

const Page = () => {

    const [email, setEmail] = useState("");

    const tryExit = () => {
        if( confirm("정말 탈퇴 하시겠습니까? 모든 정보는 30일 후 삭제 예정입니다.") ){

            // const token = getAccessToken();
            // if (token === "") {
            //     alert("로그인 해주세요.");
            //     return
            // }

            // try {
            //     const result = await callAPI(HTTPMETHOD.POST, {}, "/api/mypage/request/del", token);

            //     dispatch({type: "user/logout" });
                alert("성공적으로 탈퇴 신청되었습니다.");

            // } catch (e: any) {
            //     alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
            // }
        }
    }

    return (
        <div className="privacy">
            <h1>탈퇴</h1>

            <h4>회원님의 소중한 개인정보는 안전하게 보호되고 있습니다.<br/>
            회원 탈퇴 시, 계정은 즉시 비활성화되며, 관련 데이터는 <span className='big'>30일 이후</span> 완전히 삭제됩니다.<br/>
            이 기간 동안에는 탈퇴를 취소하고 계정을 복구할 수 있는 기회를 제공합니다.<br/>
            <br/>
            ※ 개인정보는 관련 법령에 따라 필요한 범위 내에서만 보관되며, 보관 기간이 만료된 후에는 안전하게 삭제됩니다.<br/>
            ※ 탈퇴 후에는 일부 서비스 이용 기록이 통계 및 법적 의무 준수를 위해 익명화된 형태로 보존될 수 있습니다.<br/>
            <br/>
            탈퇴를 진행하시기 전에 유의사항을 확인해 주시기 바랍니다.<br/>
            궁금한 점이 있으시면 고객센터로 문의해 주세요.</h4>

            <input type='text' onChange={(e:any) => setEmail(e.target.value)} placeholder='Enter your email.'></input>

            <div className='exitBtn' onClick={tryExit}>탈퇴하기</div>

        </div>
    );
}
export default Page;