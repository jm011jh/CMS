"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./agreement.css";

interface AgreementContent {
  [key: string]: {
    title_kr: string;
    title_en?: string;
    content_kr: React.ReactNode | any;
    content_en?: React.ReactNode | any;
  };
}

const agreementContents: AgreementContent = {
  "1": {
    title_kr: `㈜블리수엔터테인먼트 (이하 "회사") "JISOO" 앱 이용약관`,
    title_en: `BLISSOO ENTERTAINMENT CO., LTD. ("COMPANY") "JISOO" APP TERMS OF SERVICE`,
    content_kr: `<div class="term_container">

    <div class="term_h1">이용약관</div>

    <div class="term_box">BLISSOO(이하 "회사") "JISOO" 앱을 이용하기 전 이용약관("본 약관")을 반드시 읽어주시기 바랍니다.</div>


    <div class="term_h2">제1조 (목적)</div>
    이 약관은 BLISSOO (이하 “회사”)가 제공하는 팬 플랫폼 서비스 “JISOO”(이하 “서비스”)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.


    <div class="term_h2">제2조 (정의)</div>
    ① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
    <div class="term_indent">
        1. “서비스”라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 “회원”이 이용할 수 있는 “JISOO” 서비스를 의미합니다.
        <br>2. “회원”이라 함은 회사의 “서비스”에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 “서비스”를 이용하는 고객을 의미합니다.
        <br>3. “JISOO 계정”이라 함은 “서비스”를 이용하기 위한 전자우편 주소 및 비밀번호 기반의 로그인 계정을 의미합니다. 일부 “서비스”를 이용하기 위해서는 “JISOO 계정”이 반드시 필요할 수 있습니다.
        <br>4. “오픈마켓 사업자”란 회사의 “서비스”를 설치하고 결제할 수 있도록 제공하는 전자상거래 제공자 일체(“서비스” 내 결제 서비스를 제공하는 사업자 포함)를 제공하는 사업자를 말합니다 (예: 구글 플레이, 애플 앱스토어 등).
        <br>5. “게시물”이라 함은 “회원”이 “서비스” 상에 게시한 부호, 문자, 음성, 음향, 화상, 이미지, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.
        <br>6. “콘텐츠”란 회사가 본 “서비스”를 통해 “회원”에게 제공하는 영상, 이모티콘, 캐릭터 등과 같은 고유 저작물 일체를 의미합니다.
        <br>7. “아티스트”란 회사 또는 회사와 계약된 제3자와의 계약을 통해 “서비스” 내에서 활동하는 연예인, 아티스트, 인플루언서 등을 의미합니다.
    </div>
    ② 이 약관에서 사용하는 용어의 정의는 제1항 각 호에서 정하는 것을 제외하고는 관계 법령 및 기타 일반적인 상관례에 따릅니다.


    <div class="term_h2">제 3 조(약관의 게시와 개정)</div>
    ①    ‘회사’는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처(전화, 팩스, 전자우편 주소 등) 등을 ‘회원’이 알 수 있도록 ‘서비스’ 내 게시합니다. 다만, 이 약관의 구체적 내용은 ‘회원’이 연결화면을 통하여 볼 수 있습니다.
    <br>②    ‘회사’는 ‘약관의규제에관한법률’, ‘정보통신망이용촉진및정보보호등에관한법률(이하 ‘정보통신망법’)’, ‘위치정보의보호및이용등에관한법률’, 콘텐츠산업진흥법 등의 관련법률을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
    <br>③    ‘회사’가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 15일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리한 약관의 개정의 경우에는 그 적용일자 30일 전부터 공지하며, 공지 외에 일정기간 전자우편, ‘서비스’ 내 전자쪽지 이용 시 동의화면 등 전자적 수단을 통해 재차 명확히 통지될 수 있도록 합니다.
    <br>④    전 항에 따라 공지된 적용일자 이후에 ‘회원’이 ‘회사’의 ‘서비스’를 계속 이용하는 경우에는 개정된 약관에 동의하는 것으로 봅니다. 개정된 약관에 동의하지 아니하는 ‘회원’은 언제든지 자유롭게 ‘서비스’ 이용계약을 해지할 수 있습니다.


    <div class="term_h2">제 4 조(약관의 해석)</div>
    ①    이 약관에서 정하지 아니한 사항이나 해석에 대해서는 관계법령 또는 상관례에 따릅니다.
    <br>②    디지털 콘텐츠 및 실물 상품을 판매 할 경우, 해당 페이지 내 별도 ‘이용약관’, ‘개인정보 취급방침’을 게시할 수 있으며, 이 경우 해당 약관을 우선하여 적용합니다.
    <br>③    본 약관은 이용자의 편의를 고려하여 한국어, 영어 및 기타 언어로 제공될 수 있습니다. 만약 번역된 약관이 한국어 약관과 상이한 경우 한국어 약관을 우선하여 해석 및 적용합니다.
    <br>④    회사'는 아동(내국인의 경우 만14세 미만, 외국인의 경우 만16세 미만)을 대상으로 ‘서비스’를 제공하지 않습니다.


    <div class="term_h2">제 5 조(회원가입)</div>
    ①    회원가입은 ‘회원’이 되고자 하는 자(이하 ‘회원 가입 신청자')가 ‘회사’가 정한 가입 양식에 따라 회원 정보를 기입한 후 약관의 내용에 대하여 동의를 한 다음 번호인증 절차를 완료함으로써 회원가입신청을 하고 ‘회사’가 이러한 신청에 대하여 승낙함으로써 회원가입이 완료됩니다.
    <br>②    ‘회사’는 ‘가입신청자’의 신청에 대하여 ‘서비스’ 이용을 승낙함을 원칙으로 합니다. 다만, ‘회사’는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
    <div class="term_indent">
        1. 가입신청자가 이 약관에 의하여 이전에 회원자격이 영구이용정지된 적이 있는 경우, 단 ‘회사’의 회원 재가입 승낙을 얻은 경우에는 예외로 함.
        <br>2. 타인의 명의를 이용한 경우
        <br>3. 허위의 정보를 기재하거나, ‘회사’가 제시하는 내용을 기재하지 않은 경우
        <br>4. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
        <br>5. 부정한 용도 또는 ‘회사’에서 정한 방식 이외의 목적, 방식으로 영리를 추구할 목적으로 ‘서비스’를 이용하고자 하는 경우
        <br>6. 관련법령에 위배되거나 사회의 안녕질서 혹은 미풍양속을 저해할 수 있는 목적으로 신청한 경우
        <br>7. 기타 이 약관에 위배되거나 위법 또는 부당한 이용신청임이 확인된 경우 및 ‘회사’가 합리적인 판단에 의하여 필요하다고 인정하는 경우
        <br>8. 만 14세 미만의 어린이가 ‘서비스’를 이용하고자 하는 경우
    </div>
    ③    제1, 2, 3항에 따른 신청에 있어 ‘회사’는 ‘회원’의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.
    <br>④    ‘회사’는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
    <br>⑤    전 항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, ‘회사’는 원칙적으로 이를 가입신청자에게 알리도록 합니다.
    <br>⑥    ‘회사’는 ‘회원’에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.
    <br>⑦    ‘회사’는 ‘회원’에 대하여 ‘영화및비디오물의진흥에관한법률’ 및 ‘청소년보호법’등에 따른 등급 및 연령 준수를 위해 이용제한이나 등급별 제한을 할 수 있습니다.


    <div class="term_h2">제 6 조(회원정보의 변경)</div>
    ① ‘회원’은 ‘서비스’ 내 ‘내 프로필’ 화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 전자우편 계정은 수정할 수 없습니다.
    <br>② ‘회원’은 회원가입신청 시 기재한 사항이 변경되었을 경우 ‘서비스’ 내에서 수정을 하거나 전자우편, 기타 방법으로 ‘회사’에 대하여 그 변경사항을 알려야 합니다.
    <br>③ 제2항의 변경사항을 ‘회사’에 알리지 않아 발생한 불이익에 대하여 ‘회사’는 책임지지 않습니다.


    <div class="term_h2">제 7 조(개인정보보호 의무)</div>
    ‘회사’는 ‘정보통신망법’ 등 관계 법령이 정하는 바에 따라 ‘회원’의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법률 및 ‘회사’의 개인정보처리방침이 적용됩니다.


    <div class="term_h2">제 8 조(회원의 계정 관리에 대한 의무)</div>
    ① ‘회원’의 ‘계정’에 관한 관리책임은 ‘회원’에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
    <br>② ‘회사’는 ‘회원’의 ‘계정’에 대해 개인정보유출 우려/사실이 있을 경우 해당 ‘계정’의 이용을 제한할 수 있습니다.
    <br>③ ‘회원’은 ‘계정’이 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 ‘회사’에 통지하고 ‘회사’의 안내에 따라야 합니다.
    <br>④ 제3항의 경우에 해당 ‘회원’이 ‘회사’에 그 사실을 통지하지 않거나, 통지한 경우에도 ‘회사’의 안내에 따르지 않아 발생한 불이익에 대하여 ‘회사’는 책임지지 않습니다.


    <div class="term_h2">제 9 조(회원에 대한 통지)</div>
    ① ‘회사’가 ‘회원’에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 ‘서비스’ 내 전자우편 주소, 공식계정 메시지 등으로 할 수 있습니다.
    <br>② ‘회사’는 ‘회원’ 전체에 대한 통지의 경우 7일 이상 ‘서비스’ 내 ‘공지사항’ 화면에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.


    <div class="term_h2">제 10 조(회사의 의무)</div>
    ① ‘회사’는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 ‘서비스’를 제공하기 위하여 최선을 다하여 노력합니다.
    <br>② ‘회사’는 ‘회원’이 안전하게 ‘서비스’를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보취급방침을 공시하고 준수합니다.
    <br>③ ‘회사’는 ‘서비스’이용과 관련하여 ‘회원’으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. ‘회원’이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 ‘회원’에게 처리과정 및 결과를 전달합니다.
    <br>④ ‘회사’는 상품이나 용역에 대하여 「표시․광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시․광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
    <br>⑤ ‘회사’는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.


    <div class="term_h2">제 11 조(회원의 의무)</div>
    ① ‘회원’은 다음 행위를 하여서는 안 됩니다.
    <div class="term_indent">
        1. 신청 또는 변경 시 허위내용의 등록
        <br>2. 타인의 정보도용
        <br>3. ‘회사’가 게시한 정보의 변경
        <br>4. 다른 ‘회원’의 개인정보 및 계정정보를 수집하는 행위
        <br>5. ‘회사’의 사전 동의 없이 영리 목적의 광고성 정보를 전송하기 위하여 이용하는 행위
        <br>6. 리버스엔지니어링, 디컴파일, 디스어셈블 및 기타 일체의 가공행위를 통하여 ‘서비스’를 복제, 분해 또는 모방, 기타 변형하는 행위
        <br>7. 자동 접속 프로그램 등을 사용하는 등 정상적인 용법과 다른 방법으로 ‘서비스’를 이용하여 ‘회사’의 서버에 부하를 일으켜 회사의 정상적인 ‘서비스’를 방해하는 행위
        <br>8. 본인 아닌 제3자에게 접속권한을 부여하는 행위
        <br>9. ‘회사’와 ‘서비스’ 내 연기자, 아티스트, 인플루언서 등(이하 ‘아티스트’라고 함) 제3자의 저작권, 소유권 등 제 권리에 대한 침해
        <br>10. ‘회사’ 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위
        <br>11. 음란 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 ‘서비스’에 공개 또는 게시하는 행위
        <br>12. ‘회사’의 동의 없이 영리를 목적으로 ‘서비스’를 사용하는 행위
        <br>13. 기타 불법적이거나 부당한 행위
    </div>
    ② ‘회원’은 관계법, 이 약관의 규정, 이용안내 및 ‘서비스’와 관련하여 공지한 주의사항, ‘회사’가 통지하는 사항 등을 준수하여야 하며, 기타 ‘회사’의 업무에 방해되는 행위를 하여서는 안 됩니다.


    <div class="term_h2">제 12 조(‘서비스’의 제공 등)</div>
    ① 회사는 ‘회원’에게 현재 아래와 같은 ‘서비스’를 제공합니다.
    <div class="term_indent">
        1. 메신저 서비스
        <br>2. 아티스트의 참여 서비스 (JISOO 채팅 등) (‘아티스트’의 정의는 제 11조 9항에 따릅니다)
        <br>3. 기타 ‘회사’가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 ‘회원’에게 제공하는 일체의 서비스 (아티스트의 게시글 열람, 팬 커뮤니티 기능, 굿즈 구매 등)
    </div>
    ② 회사는 ‘서비스’ 제공을 위하여 전자우편 인증, 회원가입 등의 절차를 요구할 수 있습니다.
    <br>③ 회사는 ‘서비스’를 일정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있습니다. 다만, 이러한 경우에는 그 내용을 사전에 공지합니다.
    <br>④ ‘회사’는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 ‘서비스’의 제공을 일시적으로 중단할 수 있습니다. 이 경우 ‘회사’는 제9조[회원에 대한 통지]에 정한 방법으로 ‘회원’에게 통지합니다. 다만, ‘회사’가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
    <br>⑤ ‘회사’는 ‘서비스’의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 ‘서비스’ 제공화면에 공지한 바에 따릅니다.


    <div class="term_h2">제 13 조(‘서비스’의 변경)</div>
    ①    ‘회사’는 이용 감소로 인한 원활한 ‘서비스’ 제공의 곤란 및 수익성 악화, 기술 진보에 따른 차세대 ‘서비스’로의 전환 필요성, ‘서비스’ 제공과 관련한 회사 정책의 변경 등 기타 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 ‘서비스’를 변경 또는 중단할 수 있습니다.
    <br>②    ‘회사’는 무료로 제공되는 ‘서비스’의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 ‘회원’에게 별도의 보상을 하지 않습니다. 무상으로 제공된 컨텐츠 등에 대해서도 마찬가지입니다.
    <br>③    ‘서비스’의 내용, 이용방법, 이용시간에 대하여 변경 또는 ‘서비스’ 중단이 있는 경우에는 변경 또는 중단될 ‘서비스’의 내용 및 사유, 일자 등은 그 변경 또는 중단 전에 ‘회사’의 ‘웹사이트’ 또는 ‘서비스’ 내 ‘공지사항’ 화면, 공식계정 메시지 등 ‘회원’이 충분히 인지할 수 있는 방법으로 일정 기간을 두고 사전에 공지합니다.




    <div class="term_h2">제 14 조(정보의 제공 및 광고의 게재)</div>
    ①    ‘회사’는 ‘서비스’의 운영과 관련된 정보를 JISOO 서비스 화면, 공식계정 메시지, 홈페이지 등에 게재할 수 있습니다.
    <br>②    ‘회사’는 본 ‘서비스’에 회사 또는 제3자의 광고를 게재할 수 있습니다. 
    <br>③    본 서비스는 회사와 제휴한 다른 사업자가 제공하는 ‘서비스’ 또는 ‘컨텐츠’가 포함되는 경우가 있습니다. 이러한 ‘서비스’ 또는 ‘컨텐츠’에 대한 책임은 이를 제공하는 사업자에게 있으며, 이를 제공하는 사업자가 정한 이용약관 기타 조건이 적용되는 경우가 있습니다. 

    <div class="term_h2">제 15 조(회원 ‘게시물’의 저작권)</div>
    ①    ‘회원’이 ‘서비스’ 내에 게시한 ‘게시물’의 저작권은 저작권법에 의하여 보호를 받습니다. ‘회원’은 ‘회사’에 ‘게시물’을 다음과 같이 사용할 수 있는 전세계적, 영구적, 비독점적이며 무상의 라이선스를 제공합니다. 상기 라이선스의 사용 및 허용 범위는 아래와 같습니다.
    <div class="term_indent">
        1.    ‘서비스’의 운영, 향상, 개선, 신규 서비스 개발을 위한 ‘회사’와 협력사에 의한 ‘게시물’의 사용, 편집, 저장, 복제, 수정, 전송, 전시, 공개적 실연, 공개적인 게시 및 배포
        <br>2.    ‘게시물’의 편집 저작물, 2차적 저작물 작성 및 배포
        <br>3.    ‘회사’ 또는 ‘서비스’의 홍보를 위한 목적으로 ‘회원’의 동의 하에, 미디어, 통신사 등에게 ‘게시물’의 내용을 보도, 방영할 수 있도록 제공
        <br>4.    ‘회사’가 ‘게시물’을 ‘서비스’ 내 검색결과로 사용
        <br>5.    IR과 같은 회사 홍보 자료로 사용
    </div>
    ②    전 항의 규정에도 불구하고, 회사가 ‘회원’의 게시물을 전 항 각 호에 기재된 목적 이외에 상업적 목적(예: 제3자에 게시물을 제공하고 금전적 대가를 받는 경우)으로 사용할 경우에는 사전에 해당 이용자로부터 동의를 얻어야 합니다.
    <br>③    본 ‘서비스’에서 ‘게시물’은 여러 ‘회원’이 전송, 수정, 삭제 등을 할 수 있는 편집 기능을 포함하는 경우가 있습니다. 이때 ‘회원’은 본인의 ‘게시물’에 대해 다른 ‘회원’의 사용과 편집을 허락하는 것으로 합니다. 
    <br>④    ‘회원’이 이용계약을 해지하거나 제19조에 의해 이용계약이 해지되는 경우에도 ‘서비스’의 운영 향상, 개선, 홍보, 신규 서비스 개발을 위한 범위 내에서 본 라이선스는 존속됩니다.
    <br>⑤    ‘회사’는 ‘서비스’ 운영정책상 또는 ‘회사’가 운영하는 서비스간의 통합 등을 하는 경우 ‘게시물’의 내용을 변경하지 아니하고 ‘게시물’의 게재위치를 변경, 이전하거나 서비스간 공유로 하여 서비스할 수 있으며, 해당 사실을 사전에 공지합니다.


    <div class="term_h2">제 16 조(회원 ‘게시물’의 관리)</div>
    ①    ‘회원’의 ‘게시물’은 제3자의 저작권 등 제 권리를 침해하여서는 안됩니다. 이로 인한 저작권 침해 및 제3자에 발생한 손해에 대해 ‘회사’는 책임을 지지 않습니다. ‘회원’의 ‘게시물’이 ‘정보통신망법’ 및 ‘저작권법’ 등 관련법률에 위반되는 내용을 포함하는 경우, 권리자는 관련법률이 정한 절차에 따라 해당 ‘게시물’의 게시중단 및 삭제 등을 요청할 수 있으며, ‘회사’는 관련법률에 따라 조치를 취하여야 합니다.
    <br>②    본 조에 따른 세부절차는 ‘정보통신망법’ 및 ‘저작권법’ 등이 규정한 범위 내에서 ‘회사’가 정한 ‘게시중단요청서비스’에 따릅니다. 
    <br>③    ‘회사’는 전 항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법률에 위반되는 아래와 경우에는 관련법률에 따라 해당 ‘게시물’에 대하여 게시거부나 삭제 등의 조치를 취할 수 있습니다. 그러나, ‘회사’가 모든 ‘게시물’을 검토할 의무가 있는 것은 아닙니다.
        <div class="term_indent">
            1.    음란하거나 폭력적인 내용을 포함하여 공서양속이나 법령을 위반 하는 경우
            <br>2.    타인의 명예를 훼손하는 경우
            <br>3.    ‘회사’의 ‘서비스’ 혹은 ‘스타’에 대하여 악의적인 목적으로 반복적인 비방과 이미지를 훼손하는 경우
            <br>4.    타인의 초상권, 지적재산권 등을 침해하는 경우
        </div>

    <div class="term_h2">제 17 조(‘서비스’ 권리의 귀속)</div>
    ①    ‘서비스’에 대한 저작권 및 소유권 등 제 권리 일체는 ‘회사’에 귀속됩니다. 단, ‘회원’의 ‘게시물’ 및 제휴계약에 따라 제공된 제3자의 저작물은 제외합니다.
    <br>②    ‘회사’가 제공하는 ‘서비스’의 디자인, ‘회사’가 만든 텍스트, 스크립트(script), 그래픽, ‘회원’ 상호간 전송 기능 등 ‘회사’가 제공하는 ‘서비스’에 관련된 모든 상표, ‘서비스’ 마크, 로고 등에 관한 저작권 및 기타 지적재산권은 대한민국 및 기타 외국의 법률에 기하여 ‘회사’가 보유하고 있거나 ‘회사’에게 소유권 또는 사용권이 있습니다.
    <br>③    ‘회사’는 ‘회사’가 제공하는 ‘컨텐츠’에 대한 양도 및 재허락이 불가능하고 비독점적이며 본 ‘서비스’의 이용을 위한 목적에 한하는 이용권을 ‘회원’에게 부여합니다. 고객은 이용료, 이용 기간 등의 이용 조건이 별도로 규정된 본 콘텐츠를 이용할 경우, 이와 같은 이용 조건에 따릅니다. 본 서비스의 화면에 ‘구입’, ‘판매’ 등이 표기되어 있을 경우에도 ‘회사’가 ‘회원’에게 제공하는 본 콘텐츠에 관한 지적재산권, 기타 권리는 ‘회원’에게 이전(양도 등)되지 않으며, ‘회원’에게는 상기 이용권만 부여됩니다.
    <br>④    ‘회원’은 명시적으로 허락된 내용을 제외하고는 ‘서비스’를 통해 얻어지는 ‘회원’의 정보를 영리 목적으로 사용, 복제, 전송, 배포, 유통하는 것을 포함하여 ‘회사’가 만든 텍스트, 스크립트, 그래픽을 서비스 내에서 허용된 방법이 아닌 방법으로 ‘회원’ 상호간 혹은 비회원에 복제, 전송 배포 또는 유통할 수 없습니다.

    <div class="term_h2">제 18 조(회원가입 해지 등)</div>
    ①    ‘회원’의 해지
    <div class="term_indent">
        1.    ‘회원’은 언제든지 ‘서비스’ 내 설정 화면을 통하여 이용계약을 해지할 수 있습니다.
        <br>2.    전 항에 따라 해지를 한 ‘회원’은 ‘회사’가 정하는 규정에 따라 ‘회원’으로 다시 가입할 수 있습니다.
    </div>
    ②    ‘회사’의 해지
    <div class="term_indent">
        1.    ‘회사’는 ‘회원’에게 다음과 같은 사유가 있는 경우 이용계약을 해지할 수 있습니다.
        <div class="term_indent">
            가.    ‘회사’나 다른 ‘회원’, 기타 타인의 권리나 명예, 신용 기타 정당한 이익을 침해하거나 대한민국 법령 또는 공서양속에 위배되는 행위를 한 경우
            나.    ‘회사’가 판매하는 ‘재화 등’에 대해 확인되지 않는 사실로 불신을 조장하는 행위를 한 경우
            다.    ‘회사’가 제공하는 ‘서비스’의 원활한 진행을 방해하는 행위를 하거나 시도한 경우
            라.    기타 ‘회사’가 합리적인 판단에 기하여 ‘서비스’의 제공을 거부할 필요가 있다고 인정할 경우
        </div>
        2.    이용계약은 ‘회사’가 해지의사를 ‘회원’에게 통지한 시점에 종료됩니다. 이 경우 ‘회사’는 ‘회원’이 등록한 전자우편 또는 전화, 기타의 방법을 통하여 해지의사를 통지합니다.
    </div>
    ③    이용계약이 종료/해지되는 경우 아래와 같은 정보는 특별한 사정이 없는 한 삭제되며, 재가입시에도 복원되지 않습니다.
    <div class="term_indent">
        1.    내프로필 정보: 전화번호, 프로필사진, 이름, 메시지 등
        <br>2.    계정: JISOO 계정(전자우편주소)
        <br>3.    구매내역: 구매한 아이템/상품 등
        <br>4.    부가서비스 관련 컨텐츠: 부가서비스를 통해 제공 받은 대화내용, 컨텐츠 등
        <br>5.    그외 디바이스 내 저장된 사용자가 설정한 모든 정보
    </div>
    ④    어느 당사자의 책임있는 사유로 이용계약이 해지되는 경우, 귀책 당사자는 상대방이 입증하는 손해를 배상하여야 합니다.

    <div class="term_h2">제 19 조(이용제한 등)</div>
    ①    ‘회사’는 ‘회원’이 1년 이상 ‘서비스’를 이용하지 않는 경우, 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따라 이용중인 회원의 개인정보와 분리하여 보관하여 ‘JISOO 계정’을 휴면계정으로 전환하여 이용을 제한하거나, ‘JISOO 계정’을 사용하지 않는 이용자를 탈퇴처리할 수 있습니다.
    <br>②    ‘회사’는 ‘회원’이 다음 각 호의 사유에 해당하는 경우 경고, 일시이용정지, 영구이용정지 등으로 ‘서비스’의 이용을 단계적으로 제한할 수 있습니다.
    <div class="term_indent">
        1.    가입 신청 시에 허위 내용을 등록한 경우
        <br>2.    타인의 ‘서비스’ 이용을 방해하거나 정보를 도용하는 등 전자상거래질서를 위협하는 경우
        <br>3.    ‘회사’를 이용하여 법률과 이 약관이 금지하거나 공공질서, 미풍양속에 반하는 행위를 하는 경우
    </div>
    ③    ‘회사’는 전 항에도 불구하고 주민등록법을 위반한 명의도용 및 결제도용, 저작권법 및 정보통신망이용촉진및정보보호등에관한법률 등을 위반한 불법통신 및 해킹, 악성프로그램의 배포 등과 같이 관련 법령을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다. 본 항에 따른 영구이용정지 시 기타 혜택 등도 모두 소멸되며, ‘회사’는 이에 대해 별도로 보상하지 않습니다.
    <br>④    ‘회사’는 ‘회원’이 ‘서비스’ 내에서 사용하는 이름이 반사회적 또는 미풍양속에 어긋나거나 ‘회사’ 및 ‘회사’의 운영자로 오인한 우려가 있는 경우 해당 이름의 사용을 제한할 수 있습니다.
    <br>⑤    본 조에 따라 ‘서비스’ 이용을 영구이용정지하는 경우 회원 확인에 필요한 정보들을 일정보유기간 동안 보유한 후 회원등록을 말소합니다. 이 경우 ‘회원’에게 이를 제9조에 따라 통지하고, 회원등록 말소 전에 소명할 기회를 부여합니다. 이때 ‘회원’의 이의가 정당하다고 ‘회사’가 인정하는 경우 ‘회사’는 ‘회원’의 ‘서비스’ 이용을 재개합니다.

    <div class="term_h2">제 20 조(책임제한)</div>
    ①    ‘회사’는 전시, 사변, 천재지변, 비상사태, 현재의 기술로는 해결이 불가능한 기술적 결함 기타 불가항력적 사유로 ‘서비스’를 제공할 수 없는 경우에는 책임이 면제됩니다.
    <br>②    ‘회사’는 ‘회원’이 ‘서비스’와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.
    <br>③    ‘회사’는 ‘회원’ 간 또는 ‘회원’과 제3자 상호간에 ‘서비스’를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
    <br>④    ‘회사’는 무료로 제공되는 ‘서비스’ 이용과 관련하여 관련법률에 특별한 규정이 없는 한 책임을 지지 않습니다.
    <br>⑤    ‘회사’는 제3자가 ‘서비스’화면 또는 링크된 웹사이트를 통하여 광고한 제품 또는 재화 등의 내용과 품질에 대하여 감시할 의무, 기타 어떠한 책임도 지지 아니합니다.
    <br>⑥    ‘회사’ 및 ‘회사’의 임직원 그리고 대리인은 다음과 같이 발생한 손해에 대해 책임을 지지 아니합니다.
    <div class="term_indent">
        1.    ‘회원’의 상태정보의 허위 또는 부정확성에 기인하는 손해
        <br>2.    그 성질과 경위를 불문하고 ‘서비스’에 대한 접속 및 ‘서비스’의 이용과정에서 발생하는 개인적인 손해
        <br>3.    서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로부터 발생하는 손해
        <br>4.    서버에 대한 전송 또는 서버로부터의 전송에 대한 제3자의 모든 불법적인 방해 또는 중단행위로부터 발생하는 손해
        <br>5.    제3자가 ‘서비스’를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해
        <br>6.    전송된 데이터의 오류 및 생략, 누락, 파괴 등으로 발생되는 손해
        <br>7.    ‘회원’ 간의 회원상태정보 등록 및 ‘서비스’ 이용 과정에서 발생하는 명예훼손 기타 불법행위로 인한 각종 민형사상 책임
    </div>

    <div class="term_h2">제 21 조(해외이용)</div>
    ‘회사’는 ‘회원’이 대한민국의 영토 이외의 지역에서 ‘서비스’를 이용하고자 하는 경우 ‘서비스’의 품질 또는 사용성을 보장하지 않습니다. 따라서 ‘회원’은 대한민국의 영토 이외의 지역에서 ‘서비스’를 이용하고자 하는 경우 스스로의 판단과 책임에 따라서 이용 여부를 결정하여야 하고, 특히 ‘서비스’의 이용과정에서 현지 법령을 준수할 책임은 ‘회원’에게 있습니다.

    <div class="term_h2">제 22 조(준거법 및 재판관할)</div>
    본 약관은 대한민국 법률에 따라 규율되고 해석되며, 이 ‘서비스’와 관련하여 ‘회사’와 ‘회원’ 간에 발생한 분쟁으로 소송이 제기되는 경우, 관련법률에 정한 절차에 따른 법원을 관할 법원으로 합니다.

</div>`,
   content_en: `<div class="term_container">

    <div class="term_h1">Terms of Service</div>
    <div class="term_box">Please read the Terms of Service (“Terms”) before using the “JISOO” app by BLISSOO (“Company”).</div>


    <div class="term_h2">Article 1 (Purpose)</div>
    These Terms of Service (hereinafter, “Terms”) govern the rights, obligations, responsibilities, and other necessary matters between BLISSOO (hereinafter, the “Company”) and its members (“Member(s)”) regarding the use of the fan platform service “JISOO” (hereinafter, the “Service”) provided by the Company.


    <div class="term_h2">Article 2 (Definitions)</div>
    <ul class="term_ul_num">
        <li>The definitions of terms used in these Terms are as follows:</li>
        <ul class="term_ul_num2">
            <li><b>“Service”</b> refers to the “JISOO” service that Members can access and use via various devices (including PCs, TVs, mobile devices, etc.), regardless of the specific type of device or network.</li>
            <li><b>“Member”</b> means a customer who accesses the Company’s Service, enters into a usage contract with the Company in accordance with these Terms, and uses the Service provided by the Company.</li>
            <li><b>“JISOO account”</b> refers to a login account based on an email address and password used to access and use the Service. Some parts of the Service may require a “JISOO account.”</li>
            <li><b>“Open Market Operator”</b> refers to any provider of an electronic commerce platform that allows the Service to be installed or paid for (including any entity providing payment services within the Service), such as Google Play or the Apple App Store.</li>
            <li><b>“Post” or “Posting”</b> refers to texts, photos, videos, and any form of information posted by a Member on the Service, including characters, symbols, voice, sounds, images, videos, files, links, and more.</li>
            <li><b>“Content”</b> refers to all proprietary works (e.g., videos, emoticons, characters, etc.) that the Company provides to Members through the Service.</li>
            <li><b>“Artist”</b> refers to any celebrity, entertainer, influencer, etc. who operates within the Service through a contract with the Company or a third party contracted by the Company.</li>
        </ul>
        <li>Unless otherwise defined in Paragraph 1 above, terms used in these Terms shall follow applicable laws and general business practices.</li>
    </ul>


    <div class="term_h2">Article 3 (Posting and Amendment of the Terms)</div>
    <ul class="term_ul_num">
        <li>The Company shall post these Terms, along with the Company’s name, address of its business office, name of the representative, business registration number, and contact information (telephone, fax, email address, etc.), in a location within the Service such that Members can easily review them. However, the detailed content of these Terms may be viewed by accessing a linked page.</li>
        <li>The Company may amend these Terms to the extent permitted by relevant laws, including the Act on the Regulation of Terms and Conditions, the Act on Promotion of Information and Communications Network Utilization and Information Protection (the “Information and Communications Network Act”), the Act on the Protection and Use of Location Information, the Content Industry Promotion Act, and other relevant laws.</li>
        <li>In the event the Company amends these Terms, the Company shall post the application date of the amendment and the reason for the amendment, along with the current Terms, following the method of Paragraph 1 above. This notice shall be provided at least fifteen (15) days prior to, and until the day before, the effective date of the amended Terms. However, if the amendment is unfavorable to Members, the Company will notify Members thirty (30) days in advance. In addition to posting a notice, the Company may also provide notification through email, in-service electronic messages, a dedicated consent screen, or other electronic means, in order to clearly inform Members of the change.</li>
        <li>If a Member continues to use the Service after the effective date stated in the notice described in the preceding paragraph, it is deemed that the Member agrees to the amended Terms. If a Member does not agree to the amended Terms, the Member may terminate the usage contract and stop using the Service at any time.</li>
    </ul>

    <div class="term_h2">Article 4 (Interpretation of the Terms)</div>
    <ul class="term_ul_num">
        <li>Any matters not stipulated in these Terms or any interpretation thereof shall be governed by relevant laws or customary practices.</li>
        <li>If the Company sells digital content or physical goods, separate terms of use or a separate privacy policy may be posted on the relevant page. In such cases, those separate terms or policies take precedence over these Terms.</li>
        <li>For user convenience, these Terms may be provided in Korean, English, or other languages. In the event of any conflict between a translated version and the Korean version, the Korean version shall prevail.</li>
        <li>The Company does not provide the Service to children (under 14 years of age for Korean nationals, under 16 years of age for foreign nationals).</li>
    </ul>


    <div class="term_h2">Article 5 (Membership Registration)</div>
    <ul class="term_ul_num">
        <li>To register for membership, an individual who wishes to become a Member (hereinafter, “Membership Applicant”) must complete the membership application by filling in the required information in the Company’s designated form, consenting to these Terms, and then completing the phone number verification process. The membership is deemed complete when the Company approves the application.
        <li>As a general rule, the Company shall grant approval for the Membership Applicant to use the Service. However, the Company may refuse to grant approval or may subsequently terminate the usage contract if:
            <ul class="term_ul_num">
                <li>The Membership Applicant previously lost membership privileges due to a permanent suspension for violating these Terms, unless the Membership Applicant has obtained the Company’s approval for re-registration.
                <li>The Membership Applicant uses another person’s name.
                <li>The Membership Applicant has provided false information or failed to provide the required information.
                <li>Approval is not possible due to reasons attributable to the Membership Applicant, or the application otherwise violates the Company’s rules.
                <li>The application is made for the purpose of pursuing commercial gain by fraudulent or improper use, or by methods or purposes not recognized by the Company.
                <li>The application is made for illegal purposes, or for purposes contrary to public order or good morals.
                <li>The application otherwise violates these Terms, is unlawful or improper, or the Company determines there is a reasonable need to do so.
                <li>The applicant is under 14 years of age.
            </ul>
        <li>In reviewing applications under Paragraphs 1 and 2, the Company may require a real-name verification or identity authentication through a professional institution based on the type or category of membership.</li>
        <li>The Company may defer approval if there is insufficient capacity in the related facilities, or if there are technical or operational issues.</li>
        <li>If approval for membership registration is denied or deferred under the preceding paragraphs, the Company will generally inform the Membership Applicant of this decision.</li>
        <li>The Company may categorize Members into different levels according to its policies. Usage times, frequency, service menus, or other service elements may be segmented and restricted differently for each level.</li>
        <li>To comply with the “Promotion of the Motion Pictures and Video Products Act,” the “Youth Protection Act,” or other relevant laws, the Company may impose usage restrictions or age-based restrictions for certain Members.</li>
    </ul>


    <div class="term_h2">Article 6 (Changes to Member Information)</div>
    <ul class="term_ul_num">
        <li>Members may view and modify their personal information at any time via the “My Profile” page within the Service. However, the Member’s email account cannot be changed.</li>
        <li>If any of the information provided during membership registration changes, the Member must update this information within the Service or notify the Company of such changes by email or other methods.</li>
        <li>The Company shall not be liable for any disadvantages arising from the Member’s failure to notify the Company of changes as stipulated in Paragraph 2 above.</li>
    </ul>


    <div class="term_h2">Article 7 (Obligation to Protect Personal Information)</div>
    The Company shall make efforts to protect Members’ personal information, including compliance with the Information and Communications Network Act and other relevant laws. The protection and use of personal information shall be governed by applicable laws and by the Company’s Privacy Policy.


    <div class="term_h2">Article 8 (Obligations Regarding Account Management)</div>
    <ul class="term_ul_num">
        <li>The responsibility for managing a Member’s account rests with the Member, and the Member shall not allow any third party to use it.</li>
        <li>If the Company suspects or confirms the possibility of a data leak related to a Member’s account, it may limit the use of that account.</li>
        <li>If a Member becomes aware that his or her account has been stolen or is being used by a third party, the Member must immediately notify the Company and follow the Company’s guidance.</li>
        <li>If the Member fails to notify the Company in accordance with Paragraph 3, or fails to follow the Company’s guidance after such notification, the Company shall not be liable for any disadvantages that result.</li>
    </ul>

    <div class="term_h2">Article 9 (Notices to Members)</div>
    <ul class="term_ul_num">
        <li>Unless otherwise specified in these Terms, the Company may notify Members via the email address associated with the Service, official in-service messaging, or other means within the Service.</li>
        <li>For notifications addressed to all Members, the Company may substitute individual notices by posting the relevant information on the “Notice” section of the Service for at least seven (7) days. However, regarding issues that significantly impact a specific Member’s individual transactions or activities, the Company shall provide an individual notice to that Member.</li>
    </ul>


    <div class="term_h2">Article 10 (Obligations of the Company)</div>
    <ul class="term_ul_num">
        <li>The Company shall not engage in any acts prohibited by applicable laws or contrary to public morals, and shall use its best efforts to continuously and reliably provide the Service.</li>
        <li>The Company shall implement security measures to ensure that Members can use the Service safely, including protecting personal (and credit) information, and shall comply with its publicly posted Privacy Policy.</li>
        <li>If any opinions or complaints raised by Members are found to be valid, the Company shall address them. Members will be informed via a bulletin board or email of how their complaints or concerns have been handled.</li>
        <li>The Company shall be liable to compensate for any damage suffered by a Member caused by unfair indication or advertising acts as stipulated in Article 3 of the Act on Fair Labeling and Advertising for goods or services sold by the Company.</li>
        <li>The Company shall not send unsolicited commercial emails to Users who do not wish to receive them.</li>
    </ul>


    <div class="term_h2">Article 11 (Obligations of Members)</div>
    <ul class="term_ul_num">
        <li>Members shall not engage in any of the following acts:</li>
        <ul class="term_ul_num">
            <li>Registering false information when applying or modifying details.</li>
            <li>Using another person’s information.</li>
            <li>Altering information posted by the Company.</li>
            <li>Collecting other Members’ personal information or account information.</li>
            <li>Using the Service to send commercial information without the prior consent of the Company for profit-making purposes.</li>
            <li>Reverse engineering, decompiling, disassembling, or otherwise processing or modifying the Service in order to replicate or imitate it in any other form.</li>
            <li>Generating abnormal server loads or hindering the normal operation of the Service by using automated connection programs or other methods not consistent with the Service’s intended use.</li>
            <li>Granting access rights to someone other than the Member.</li>
            <li>Infringing on the copyrights, ownership, or other rights of the Company, Artists, or other third parties.</li>
            <li>Damaging the reputation or interfering with the business of the Company or any third party.</li>
            <li>Posting or disclosing obscene or violent messages, images, audio, or any other content that goes against public morals within the Service.</li>
            <li>Using the Service for commercial gain without the Company’s consent.</li>
            <li>Engaging in other illegal or wrongful acts.</li>
        </ul>
        <li>Members must comply with relevant laws, the provisions of these Terms, usage guidelines and cautions announced in connection with the Service, and any other notices from the Company. Members shall not engage in any actions that interfere with the Company’s operations.</li>
    </ul>




    <div class="term_h2">Article 12 (Provision of the Service)</div>
    <ul class="term_ul_num">
        <li>The Company currently provides the following Services to Members:</li>
            <ul class="term_ul_num">
            <li>Messenger services</li>
            <li>Artist participation services (e.g., “JISOO” chat). (Refer to the definition of “Artist” in Article 11(9).)</li>
            <li>Any and all services additionally developed by the Company or provided to Members through partnerships with other companies (including reading Artist posts, fan community functions, purchasing merchandise, etc.).</li>
            </ul>
        <li>The Company may require email authentication, membership registration, or other procedures in order to provide the Service.</li>
        <li>The Company may segment the Service into various components and separately designate available usage times for each component. In such cases, the Company shall notify Members in advance.</li>
        <li>For reasons such as maintenance, replacement, breakdown of computer or communication systems, or other operational reasons, the Company may temporarily suspend the Service. If so, the Company shall notify Members following the method in Article However, if prior notice is not feasible due to urgent or unavoidable circumstances, the Company may inform Members afterwards.</li>
        <li>If necessary for providing the Service, the Company may perform periodic maintenance at announced intervals, during which the Service may be temporarily unavailable.</li>
    </ul>

    <div class="term_h2">Article 13 (Changes to the Service)</div>
    <ul class="term_ul_num">
        <li>The Company may change or discontinue all or part of the Service for operational or technical reasons, such as a drop in usage leading to difficulty in providing stable service, diminished profitability, the necessity of transitioning to a next-generation service due to technological advancements, or policy changes related to providing the Service.</li>
        <li>The Company may, as needed and without separate compensation, modify, discontinue, or change some or all of the Service it provides free of charge in accordance with its policies and operational requirements, to the extent not prohibited by law. The same applies to content that is provided free of charge.</li>
        <li>If there is any change or discontinuation in the content, usage method, or availability of the Service, the Company shall, in advance, announce the details of such change or discontinuation (content, reasons, and the date) through its website, the in-Service “Notice” board, official account messages, or other methods that allow Members to sufficiently recognize the change, providing a reasonable notice period.</li>
    </ul>


    <div class="term_h2">Article 14 (Provision of Information and Display of Advertisements)</div>
    <ul class="term_ul_num">
        <li>The Company may display information related to the operation of the Service on the JISOO Service screen, via official account messages, on the Company’s website, or via other methods.</li>
        <li>The Company may display advertisements for itself or third parties within the Service.</li>
        <li>The Service may contain content or services provided by other businesses in partnership with the Company. Responsibility for such content or services lies with the provider(s), and their own Terms of Use or conditions may apply.</li>
    </ul>


    <div class="term_h2">Article 15 (Copyright for Members’ Postings)</div>
    <ul class="term_ul_num">
        <li>Copyright for any Post submitted by a Member within the Service is protected by copyright law. The Member grants the Company a worldwide, perpetual, non-exclusive, royalty-free license to use such Posts, including the rights to:</li>
        <ul class="term_ul_num">
            <li>Use, edit, store, reproduce, modify, transmit, display, publicly perform, publicly post, and distribute Members’ Posts for the purpose of operating, improving, enhancing, or developing new services within the Service by the Company and its partners.</li>
            <li>Create and distribute edited or derivative works based on the Post.</li>
            <li>Use or provide the Post to media, news outlets, etc. for Company or Service promotional purposes upon obtaining the Member’s consent.</li>
            <li>Display the Post in Service search results.</li>
            <li>Use the Post for promotional materials of the Company, such as in IR (Investor Relations) documents.</li>
        </ul>
        <li>Notwithstanding the foregoing paragraph, if the Company intends to use a Member’s Post for commercial purposes not listed above (e.g., providing the Post to a third party in exchange for monetary compensation), the Company shall obtain prior consent from the respective Member.</li>
        <li>In some instances, the Service may include editing features that allow multiple Members to transmit, modify, or delete the same Post. In such cases, the Member is deemed to have consented to the use and editing of their Post by other Members.</li>
        <li>Even if a Member terminates the usage contract or if the usage contract is terminated under Article 19, the license granted herein remains in effect within the scope necessary for the operation, enhancement, promotion, or development of new features of the Service.</li>
        <li>For operational or policy-related reasons, or in the event of integration with other services operated by the Company, the Company may move, transfer, or share Posts with other services without altering their content. In such cases, the Company will provide prior notice to Members.</li>
    </ul>


    <div class="term_h2">Article 16 (Management of Members’ Posts)</div>
    <ul class="term_ul_num">
        <li>Members’ Posts must not infringe on the copyright or other rights of any third party. The Company shall not be liable for any copyright infringement or damage to a third party resulting from a Member’s Post. If a Member’s Post violates the Information and Communications Network Act, Copyright Act, or other relevant laws, the rights holder may request the Post to be taken down or deleted, and the Company shall take necessary measures in accordance with relevant laws.</li>
        <li>The detailed procedures under this Article comply with the Company’s “Post Take-Down Request” process, to the extent permitted by the Information and Communications Network Act, the Copyright Act, and other relevant laws.</li>
        <li>Even without a request from the rights holder, if there is a valid reason to believe that a Post infringes on a third party’s rights or otherwise violates Company policies or relevant laws, the Company may, under relevant laws, refuse to display or delete the Post. However, the Company is not obligated to review all Posts.</li>
        <ul class="term_ul_num">
            <li>The Post includes obscene or violent content in violation of public morals or laws.</li>
            <li>The Post defames another person.</li>
            <li>The Post maliciously defames or damages the image of the Company’s Service or Artists on a repeated basis.</li>
            <li>The Post infringes on another person’s portrait rights, intellectual property rights, or other rights.</li>
        </ul>
    </ul>


    <div class="term_h2">Article 17 (Ownership of Service Rights)</div>
    <ul class="term_ul_num">
        <li>All copyrights, ownership, and other rights in and to the Service are owned by the Company unless otherwise specified for Members’ Posts or for third-party works provided under a partnership agreement.</li>
        <li>The Company owns or has the right to use all intellectual property (including trademarks, service marks, logos, text, scripts, graphics, etc.) related to the Service, as protected by the laws of Korea or other countries.</li>
        <li>The Company grants Members a non-transferable, non-exclusive, and limited license to use content provided by the Company solely for the purpose of using the Service. If there are separate conditions regarding usage fees, usage periods, etc., these conditions must be followed. Even if terms such as “purchase” or “sale” are displayed on the Service screen, no intellectual property rights or other rights to such content are transferred to the Member; the Member only receives the usage license specified herein.</li>
        <li>Unless explicitly permitted, Members may not use, replicate, transmit, distribute, or redistribute for commercial purposes, or through any unauthorized methods, any information obtained through the Service, including text, scripts, or graphics created by the Company, whether to other Members or to non-members, outside the ways allowed within the Service.</li>
    </ul>


    <div class="term_h2">Article 18 (Termination of Membership, etc.)</div>
    <ul class="term_ul_num">
        <li><b>Termination by the Member</b></li>
        <ul class="term_ul_num">
            <li>A Member may terminate the usage contract at any time via the Service’s settings page.</li>
            <li>A Member who has terminated membership under the preceding paragraph may re-register according to the Company’s rules.</li>
        </ul>

        <li><b>Termination by the Company</b></li>
        <ul class="term_ul_num">
            <li>The Company may terminate the usage contract if any of the following reasons apply to a Member:</li>
            <ul class="term_ul_num2">
                <li>The Member has infringed upon the rights, reputation, credit, or other legitimate interests of the Company, other Members, or third parties, or has violated laws of the Republic of Korea or public order and morals.</li>
                <li>The Member has spread distrust regarding goods or services sold by the Company based on unverified facts.</li>
                <li>The Member disrupts or attempts to disrupt the smooth progress of the Service provided by the Company.</li>
                <li>The Company otherwise reasonably determines that it is necessary to refuse Service to the Member.</li>
                <li>The usage contract shall end when the Company notifies the Member of its intention to terminate. The Company shall notify the Member of termination through the email address or telephone number provided by the Member or by other means.</li>
            </ul>
        </ul>
        <li>If the usage contract is ended or terminated, the following information will be deleted unless there is a special reason to retain it. Such information cannot be restored even upon re-registration:</li>
        <ul class="term_ul_num">
            <li>Profile information: phone number, profile photo, name, messages, etc.</li>
            <li>Account: JISOO account (email address)</li>
            <li>Purchase history: items or products purchased</li>
            <li>Additional service-related content: chat records or content received through additional services</li>
            <li>All other user-configured data stored in the device</li>
        </ul>
        <li>If the usage contract is terminated due to reasons attributable to either party, the responsible party shall compensate the other for any damages proven to have resulted from such termination.</li>
    </ul>


    <div class="term_h2">Article 19 (Service Restrictions)</div>
    <ul class="term_ul_num">
        <li>If a Member does not use the Service for one (1) year or more, the Company may, in accordance with the Information and Communications Network Act, separate the Member’s personal information and convert the “JISOO account” to a dormant account, limiting further use, or otherwise process the account withdrawal for inactive users.</li>
        <li>If a Member commits any of the following acts, the Company may impose escalating restrictions such as warnings, temporary suspension, or permanent suspension of the Service:</li>
        <ul class="term_ul_num">
            <li>Providing false information upon registering.</li>
            <li>Obstructing another Member’s use of the Service or misappropriating information, thus threatening the established order of electronic commerce.</li>
            <li>Using the Company’s Service to violate these Terms, any laws, public order, or good morals.</li>
        </ul>
        <li>Notwithstanding the preceding paragraph, if the Member commits illegal acts in violation of the Resident Registration Act, Copyright Act, Information and Communications Network Act (e.g., unlawful communication or hacking, distribution of malicious software), the Company may immediately and permanently suspend the Member’s use of the Service. Upon permanent suspension, the Member forfeits all other benefits, and the Company shall not provide any separate compensation.</li>
        <li>If the nickname or display name a Member uses within the Service is antisocial, contrary to public morals, or likely to be mistaken as being associated with the Company or an operator thereof, the Company may restrict the use of that name.</li>
        <li>In the event of a permanent suspension of the Service under this Article, the Company shall keep the necessary member information for a certain retention period before deleting the Member registration. The Company shall notify the Member in accordance with Article 9, and provide the Member an opportunity to explain before deleting the registration. If the Company deems the Member’s objection justifiable, the Company shall resume the Member’s Service use.</li>
    </ul>


    <div class="term_h2">Article 20 (Limitation of Liability)</div>
    <ul class="term_ul_num">
        <li>The Company shall not be liable for failure to provide the Service due to causes beyond its reasonable control, such as war, calamities, natural disasters, states of emergency, technical issues currently unsolvable with existing technology, or other force majeure events.</li>
        <li>The Company shall not be liable for the reliability, accuracy, or quality of any information, data, or facts posted by Members in connection with the Service.</li>
        <li>The Company shall not be liable for transactions or disputes between Members or between a Member and a third party if they arise through or in connection with the Service.</li>
        <li>Unless otherwise stipulated by law, the Company shall not be liable for providing free services or content.</li>
        <li>The Company is under no obligation to monitor, nor bears any liability for, the content or quality of products or services advertised by third parties on the Service interface or on linked websites.</li>
        <li>The Company, its officers, and agents shall not be liable for damages arising from:</li>
        <ul class="term_ul_num">
            <li>Any false or inaccurate information in a Member’s status or profile.</li>
            <li>Personal damages incurred during access to or use of the Service, regardless of how they occur.</li>
            <li>Any illegal access or usage of the server by a third party.</li>
            <li>Any illegal interference with or interruption of server transmissions by a third party.</li>
            <li>Any and all malicious programs (viruses, spyware, etc.) illegally transmitted or distributed by third parties using the Service.</li>
            <li>Errors, omissions, or destruction of transmitted data.</li>
            <li>Various civil or criminal liabilities arising from defamation or other unlawful acts during the processes of registering or using the Service among Members.</li>
        </ul>
    </ul>


    <div class="term_h2">Article 21 (Use of Service from Overseas)</div>
    The Company does not guarantee the quality or usability of the Service if a Member uses it outside the territory of the Republic of Korea. Members who wish to use the Service outside Korea must do so at their own discretion and are solely responsible for complying with local laws in the course of using the Service.


    <div class="term_h2">Article 22 (Governing Law and Jurisdiction)</div>
    These Terms and any disputes between the Company and Members in connection with the Service shall be governed by and interpreted in accordance with the laws of the Republic of Korea. Any lawsuit arising from or relating to the Service shall be brought before a competent court determined in accordance with applicable laws and regulations.

</div>`
  },
  "2": {
    title_kr: `㈜블리수엔터테인먼트 (이하 "회사") "JISOO" 앱 개인정보처리방침`,
    title_en: `BLISSOO ENTERTAINMENT CO., LTD. ("COMPANY") "JISOO" APP PRIVACY POLICY`,
    content_kr: `<div class="term_container">
    <div class="term_h1">개인정보처리방침</div>
    <div class="term_box">BLISSOO(이하 "회사") "JISOO" 앱을 이용하기 전 개인정보처리방침("본 약관")을 반드시 읽어주시기 바랍니다.</div>


    <div class="term_h2">제1조 목적</div>
    회사는 회원이 "JISOO" 서비스(이하 "서비스")를 이용함에 있어 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다. 회사는 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 본 개인정보처리방침을 통해 회원이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. 회사는 회원이 본 처리방침을 언제나 쉽게 열람할 수 있도록 "JISOO" 서비스 화면 내에 게시하고 있습니다.

    <div class="term_h2">제2조 수집하는 개인정보 항목 및 수집방법</div>
    <ul class="term_ul_num">
    <li>회사는 회원이 회원가입 시 서비스 이용약관 및 개인정보의 수집·이용 등 활용에 대한 동의 절차를 마련하여, 동의를 선택하면 개인정보 수집·이용에 동의한 것으로 봅니다.</li>
    <li>회사는 원활한 서비스 제공을 위해 필요 최소한의 개인정보를 수집하고 있으며, 회원가입 및 상담, 서비스 신청 등 서비스 제공 및 계약 이행을 위해 아래와 같이 개인정보를 수집하고 있습니다.</li>
        <div class="term_indent">
            (1) "JISOO" 앱 회원가입
            <ul class="term_ul_num2">
                <li>필수항목: 이메일 주소, 비밀번호, 닉네임</li>
                <li>선택항목: 프로필 사진, 생년월일, 성별, 거주 국가</li>
            </ul>

            (2) 14세 미만 회원가입 제한
            <ul class="term_ul_num2">
                <li>“JISOO’ 앱은 14세 미만 아동의 개인정보를 보호하기 위해, 만 14세 미만의 회원가입을 제한하고 있습니다.</li>
                <li>회원가입 시 제공해야 하는 아래의 개인정보를 만 14세 미만 사용자가 제공할 수 없으며, 서비스 이용이 제한됩니다.</li>
                <li>허위 정보 제공으로 인해 만 14세 미만 아동이 가입한 사실이 확인될 경우, 즉시 해당 계정을 삭제하고 관련 정보를 파기합니다.</li>
            </ul>
            (3) 고객센터를 통한 문의 및 불만 접수
            <ul class="term_ul_num2">
                <li>필수항목: 문의 내용, 이메일 주소, 연락처, 필요 시 추가 정보</li>
            </ul>
            (4) 이벤트 참여 시
            <ul class="term_ul_num2">
                <li>이벤트 진행에 필요한 정보 (이름, 주소, 연락처, 배송 정보 등)</li>
            </ul>
        </div>

    <li>회사는 서비스 이용 과정에서 아래 정보가 자동으로 생성되어 수집될 수 있습니다.</li>
    <ul class="term_ul_num2"><li>서비스 이용 기록(로그인 기록, 이용 콘텐츠, 활동 내역, 구매 내역 등), 접속 로그, 쿠키, 접속 IP 정보, 기기 정보(OS, OS 버전, 디바이스 모델명, 광고 식별자(ADID/IDFA)), 결제 기록, 위치 정보(선택적 동의 시)</li></ul>

    <li>회사는 다음과 같은 방법으로 개인정보를 수집합니다.</li>
    <ul class="term_ul_num2">
        <li>회원가입, 서비스 문의, 이벤트 응모, 설문 조사 등</li>
        <li>생성 정보 수집 툴을 통한 수집</li>
        <li>협력사로부터의 제공 (제휴 마케팅 등을 통해)</li>
    </ul>

    <li>회사는 모바일 App의 서비스 제공 과정에서 이용자에게 사전 고지하고 동의를 받아 아래와 같은 단말기의 접근 권한을 수집·이용할 수 있습니다.</li>
    <div class="term_indent">
        (1) Android
        <br>[필수적 접근 권한]
        <ul class="term_ul_num2"><li>저장 공간: 사진/동영상 업로드, 다운로드 및 저장 시 사용 (Android 10(Q) 이상에서는 저장소 접근 권한 내 미디어 파일에 대한 접근 권한만 요청)</li></ul>

        [선택적 접근 권한]
        <ul class="term_ul_num2">
            <li>카메라: 사진/동영상 촬영 및 전송, 프로필 사진 설정, AR 기능 사용 시 사용</li>
            <li>마이크: 음성 메시지 전송, 영상 통화 시 사용</li>
            <li>알림: 푸시 알림 수신 시 사용</li>
            <li>위치 정보: 위치 기반 서비스 제공 시 사용 (예: 주변 팬들과의 연결, 특정 장소에서의 이벤트 안내 등)</li>
        </ul>

        (2) iOS
        <br>[선택적 접근 권한]
        <ul class="term_ul_num2">
            <li>사진: 사진/동영상 전송 및 저장, 프로필 사진 설정에 사용</li>
            <li>카메라: 사진/동영상 촬영 및 전송, 프로필 사진 설정, AR 기능 사용 시 사용</li>
            <li>마이크: 음성 메시지 전송, 영상 통화 시 사용</li>
            <li>알림: 푸시 알림 수신 시 사용</li>
            <li>위치 정보: 위치 기반 서비스 제공 시 사용 (예: 주변 팬들과의 연결, 특정 장소에서의 이벤트 안내 등)</li>
            <li>선택적 접근 권한은 동의하지 않아도 서비스 이용이 가능하나, 해당 기능 사용이 제한될 수 있습니다.</li>
            <li>접근 권한 설정 변경 방법: 휴대폰 설정 > 애플리케이션(앱) > "JISOO" > 권한 (Android), 설정 > 개인 정보 보호 > "JISOO" (iOS)</li>
        </ul>
    </div>


    <div class="term_h2">제3조 개인정보의 수집 및 이용 목적</div>
    회사는 수집한 개인정보를 다음의 목적으로 활용합니다.
    <ul class="term_ul_num">
        <li>서비스 제공 및 관리: 콘텐츠 제공, 회원 관리, 결제 처리, 고객 지원, 서비스 운영 및 개선 등 서비스 제공에 필요한 제반 업무 수행</li>
        <li>회원 식별 및 관리: 본인 확인, 중복 가입 확인, 불량 회원 방지, 문의 및 불만 처리, 고지사항 전달, 계정 관리 등</li>
        <li>서비스 개선 및 개발: 신규 서비스 개발, 기존 서비스 개선, 이용자 맞춤 서비스 제공, 서비스 이용 통계 분석</li>
        <li>마케팅 및 광고 활용: 이벤트 정보 제공, 광고성 정보 제공 (단, 마케팅 및 광고 목적의 정보 활용 시에는 별도 동의를 받으며, 동의하지 않을 경우 마케팅 정보 제공이 제한됩니다.), 맞춤형 광고 제공</li>
        <li>법령 준수: 법령 및 이용약관 위반 행위 조사 및 조치, 법령상 의무 이행</li>
    </ul>



    <div class="term_h2">제4조 개인정보의 공유 및 제공</div>
    <ul class="term_ul_num">
        <li>회사는 이용자들의 개인정보를 “ 3조 개인정보의 수집 및 이용목적”에서 고지한 범위내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</li>
        <div class="term_indent">
            (1) 이용자들이 사전에 공개에 동의한 경우
            <br>(2) 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
        </div>
        
        <li>
            회사는 회원의 동의가 있는 경우에만 개인정보를 제3자에게 다음과 같이 제공합니다.
            <table style="border-collapse: collapse; border: 0px; text-align: center;">
                <tr>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">제공받는 자</td>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">제공목적</td>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">제공하는 개인정보 항목</td>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">보유 및 이용기간</td>
                </tr>
                <tr>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">주식회사 슬래쉬</td>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">서비스 운영 및 관리</td>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">이름, 닉네임, 이메일 주소</td>
                    <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">업무 제휴 계약 종료 시, 회원탈퇴 시</td>
                </tr>
            </table>
        </li>
    </ul>


    <div class="term_h2">제5조 개인정보의 처리 위탁</div>
    <ul class="term_ul_num">
        <li>회사는 서비스 향상을 위해 외부 전문업체에 개인정보를 위탁하여 운영할 수 있으며, 이 경우 위탁 계약을 통해 개인정보 보호 관련 법령 준수, 개인정보의 안전한 관리, 재위탁 금지 등을 명확히 규정하고 있습니다.</li>
        <li>회사의 개인정보 위탁 처리 기관 및 위탁 업무 내용은 아래와 같습니다.</li>
            <div class="term_indent">
                    (1) 개인정보 국내 처리 위탁 현황
                    <table style="border-collapse: collapse; border: 0px; text-align: center;">
                        <tr>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">수탁업체명</td>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">위탁 업무의 내용</td>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">개인정보 보유 및 위탁 기간</td>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">보유 및 이용기간</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">주식회사 슬래쉬</td>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">서비스 운영 및 관리</td>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">이름, 닉네임, 이메일 주소</td>
                            <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">업무 제휴 계약 종료 시, 회원탈퇴 시</td>
                        </tr>
                    </table>
                <br>
                (2) 개인정보 국외 처리 위탁 현황
                <br>- <b>이전 받는 자</b> : AMAZON Web Service
                <br>- <b>이전 받는 국가</b>: 일본
                <br>- <b>이전 일시 및 방법</b> : 개인정보 수집 시 온라인 전달
                <br>- <b>이전 항목</b> : 이용자로부터 취득 또는 생성한 모든 개인정보
                <br>- <b>보유기간</b> : 개인정보 수집 및 이용 목적 달성 시 또는 위탁계약 종료 시
                <br>- <b>목적</b> : 개인정보를 클라우드 서비스에 전송, 처리 및 저장
                <br>- <b>정보보호책임자 및 연락처</b> : Amazon.com, Inc. / [https://aws.amazon.com/ko/contact-us/](https://aws.amazon.com/ko/contact-us/)
                <br>
                <br>- 단, AMAZON Web Service는 해당 서버의 물리적인 관리만을 행하고, 원칙적으로 회원님의 개인정보에 접근하지 않습니다.
                <br>- 이용자는 회사의 개인정보보호책임자 및 담당부서를 통해 개인정보의 국외 이전을 거부할 수 있습니다. 다만, 거부하실 경우 서비스 이용이 불가합니다.
            </div>
        <li>위탁업무의 내용이나 수탁자가 변경될 경우 지체 없이 본 개인정보처리방침을 통하여 공개하도록 하겠습니다.</li>
    </ul>


    <div class="term_h2">제6조 수집한 개인정보의 보유 및 이용기간</div>
    <ul class="term_ul_num">
        <li>회원이 회원탈퇴를 하거나 개인정보 허위기재로 인해 회원 계정 삭제 처분을 받은 경우 수집된 개인정보는 완전히 삭제되며 어떠한 용도로도 이용할 수 없도록 처리됩니다.</li>
        <li>회원의 개인정보는 고객에게 미리 고지하고 개별적으로 고객의 동의를 받은 보유기간이 경과되거나 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기됩니다. 단, 회사 내부 방침이나 관계 법령의 규정에 의하여 개인정보를 보존할 필요가 있는 경우에는 아래에 명시한 기간 동안 개인정보를 보관할 수 있습니다.</li>
            <div class="term_indent">
                (1) 전자상거래 등에서의 소비자 보호에 관한 법률에 의해 아래 항목은 일정 기간 보관 후 파기합니다. (괄호 안은 보존기간)
                <br>- 계약 또는 청약철회 등에 관한 기록 (5년)
                <br>- 대금결제 및 재화 등의 공급에 관한 기록 (5년)
                <br>- 소비자 불만 또는 분쟁처리에 관한 기록 (3년)
                <br>- 표시/광고에 관한 기록 (6개월)
            </div>
        <li>국세기본법에 의해 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류는 5년간 보관 후 파기합니다.</li>
        <li>전자금융거래법에 의해 전자금융 거래에 관한 기록은 5년간 보관 후 파기합니다.</li>
        <li>통신비밀보호법에 의해 서비스 방문 기록은 3개월간 보관 후 파기합니다.</li>
        <li>회사는 1년 동안 회사의 서비스를 이용하지 않은 장기 미이용자의 개인정보는 개인정보보호법에 근거하여 이용자에게 30일 전 이메일 등의 수단을 통해 사전통지하고 개인정보를 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 관계법령에 규정한 일정한 기간 동안 이용자의 개인정보를 보관합니다.</li>
    </ul>


    <div class="term_h2">제7조 개인정보 파기절차 및 방법</div>
    <ul class="term_ul_num">
        <li>회사는 원칙적으로 보유기간이 경과되거나 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</li>
        <li>파기 절차</li>
            <ul class="term_ul_num">
                <li>회원이 회원가입 등을 위해 입력한 정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기하며, 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.</li>
                <li>단, 관계 법령에 따라 보존해야 하는 개인정보에 대해서는 별도 DB로 분리하여 보관합니다. 분리보관하는 이용자의 개인정보는 법령에서 정한 목적이 아닌 다른 목적으로는 이용하지 않습니다.</li>
            </ul>
        <li>파기 방법</li>
        <ul class="term_ul_num"><li>출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기하며, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li></ul>
    </ul>

    <div class="term_h2">제8조 정보주체 및 법정대리인의 권리의무와 그 행사방법</div>
    <ul class="term_ul_num">
        <li>회원은 언제든지 회원 본인의 개인정보를 확인, 조회하거나 수정할 수 있으며 가입 해지 또는 개인정보의 처리 정지를 요청할 수 있습니다. 다만, 그러한 경우 서비스의 일부 또는 전부 이용이 제한될 수 있습니다.</li>
        <li>회원은 서비스 내 [내 프로필]에서 직접 본인의 개인정보를 조회, 수정하실 수 있습니다. 또한 회원은 서비스 내 [JISOO 탈퇴]를 통하여 언제든지 이용계약을 해지를 할 수 있으며 해지할 경우 회원의 개인정보는 모두 삭제됩니다. 단, 개인정보처리방침 제6조 제2항에 해당하는 경우에는 관계법령에 따라 일정기간 보관할 수 있습니다.</li>
        <li>회원이 자신의 개인정보에 대한 정정 또는 삭제를 요구하는 경우 회사는 본인 여부를 확인한 후 지체 없이 필요한 조치를 취합니다. 또한, 서비스이용약관 제20조 제1항(이용제한 등)의 각 호에 해당하는 경우 개인정보 보호책임자의 판단 하에 회원 계정 삭제 등 개인정보를 파기할 수 있습니다.</li>
        <li>개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리 결과를 제3자에게 통지하여 정정이 이루어지도록 하겠습니다.</li>
        <li>회사는 회원의 요청에 의해 해지 또는 삭제된 개인정보는 개인정보처리방침 제6조에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</li>
        <li>제1항에 따른 권리 행사는 정보주체, 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 서면, 전자우편 등을 통해 하실 수 있습니다. 이 경우 개인정보 처리 방법에 관한 고시 별지 제11호 서식에 따른 위임장을 제출하여야 합니다.</li>
    </ul>

    <div class="term_h2">제9조 개인정보보호를 위한 기술 및 관리적 대책</div>
    회사는 회원의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적, 관리적 대책을 강구하고 있습니다.
    <ul class="term_ul_num">
        <li>기술적 대책</li>
            <ul class="term_ul_num2"><li>회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.</li></ul>
        <li>관리적 대책</li>
        <ul class="term_ul_num2">
            <li>회사의 개인정보 관련 처리 직원은 담당자에 한정시키고 있고, 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 개인정보 처리방침의 준수를 항상 강조하고 있습니다.</li>
            <li>회사는 개인정보 보호책임자를 두어 개인정보 처리방침의 이행을 항상 확인하며, 문제가 발견될 경우 즉시 수정하고 바로잡을 수 있도록 노력하고 있습니다. 단, 이용자 본인의 부주의나 인터넷상의 문제로 개인정보가 유출되어 발생한 문제에 대해 회사는 일체 책임을 지지 않습니다.</li>
        </ul>
    </ul>
    <div class="term_h2">제10조 개인정보 자동수집 장치의 설치/운영 및 거부에 관한 사항</div>
    회사는 이용자에게 보다 빠른 웹 환경 지원을 위해 쿠키를 설치/운영하고 있으며 이용자는 이를 거부할 수 있습니다.
    <ul class="term_ul_num">
        <li>쿠키란?</li>
            <ul class="term_ul_num2">
                <li>쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일입니다. 쿠키는 이용자 기기 내 저장장치에 저장됩니다.</li>
                <li>쿠키는 개인 식별 정보를 수집하지 않으며 이용자는 언제든지 쿠키의 저장을 거부하거나 삭제할 수 있습니다.</li>
            </ul>
        <li>쿠키의 사용 목적</li>
            <ul class="term_ul_num">
                <li>회사는 쿠키를 통해 이용자가 지정한 설정값이나 운영자의 선호 페이지 등을 저장하여 이용자에게 더 빠르고 편리한 웹 환경을 지원할 수 있습니다.</li>
            </ul>

        <li>쿠키의 설치/운영 및 거부</li>
        <ul class="term_ul_num">
            <li>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다.</li>
            <li>이용자는 웹 브라우저 및 OS의 옵션을 설정을 통해 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 다만 쿠키 설치를 거부할 경우 원 사용이 불편해지며 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.</li>
            <li>브라우저별 설정 방법</li>
                <ul class="term_ul_num2">
                    <li>- Internet Explorer: 웹 브라우저 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정</li>
                    <li>- Chrome: 웹 브라우저 우측의 설정 메뉴 > 화면 하단의 고급 설정 표시 > 개인정보의 콘텐츠 설정 버튼 > 쿠키</li>
                </ul>
        </ul>
    </ul>


    <div class="term_h2">제11조 링크 사이트</div>

    회사는 서비스를 통하여 회원에게 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 이 경우 해당 사이트의 「개인정보처리방침」은 서비스의 「개인정보처리방침」과 무관하므로 새로 방문한 사이트의 「개인정보처리방침」을 확인하시기 바랍니다.

    <div class="term_h2">제12조 개인정보 보호책임자 및 담당부서</div>
    회사는 개인정보에 대한 의견 수 및 불만처리를 담당하는 개인정보 보호책임자 및 담당부서를 지정하고 있습니다.
    <div class="term_indent">
            <b>1. 개인정보 보호책임자</b>
            <br>성명: 민병우
            <br>직위: 이사
            <br>Email: hello@jisoo.app
            <br><br>

            <b>2. 개인정보보호 담당부서</b>
            <br>부서명: BD팀
            <br>담당자: 민병우
            <br>Email:  hello@jisoo.app
    </div>
    <br>
    정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
    <br><br>
    <div class="term_indent">
        <b>3. 개인정보 열람청구 접수 처리</b>
        <br>담당부서: CS팀
        <br>Email: hello@jisoo.app
        <br><br>

        <b>4. 기타 개인정보침해에 대한 신고나 상담 기관</b>
        <br>개인정보침해신고센터 (https://privacy.kisa.or.kr / 전화번호: 국번없이 118)
        <br>대검찰청 사이버수사과 (http://www.spo.go.kr/ 전화번호: 국번없이 1301)
        <br>경찰청 사이버수사국 (https://ecrm.cyber.go.kr / 전화번호: 국번없이 182)
    </div>


    <div class="term_h2">제13조 개인정보 처리방침의 개정</div>
    1. 회사는 본 개인정보처리방침을 변경하는 경우 그 변경 사유 및 적용일자를 명시하여 현행 개인정보처리방침과 함께 서비스 내 공지사항을 통해 고지합니다.

    <br><br>
    본 개인정보 처리방침은 2025년 1월 31일부터 적용됩니다.
    <br>- 공고일자: 2025년 01월 31일
    <br>- 시행일자: 2025년 01월 31일

</div>`,
    content_en: `<div class="term_container">
    <div class="term_h1">Privacy Policy</div>
    <div class="term_box">Please read the Privacy Policy (“Terms”) before using the “JISOO” app by BLISSOO (“Company”).</div>


    <div class="term_h2">Article 1 (Purpose)</div>
    The Company establishes and discloses this Privacy Policy to inform data subjects of the procedures and standards for processing personal information under the Personal Information Protection Act and to handle related issues promptly and smoothly. The Company complies with all relevant laws and regulations, processing personal information lawfully and managing it securely. Through this Privacy Policy, we explain how the personal information you provide is used and protected. This Privacy Policy is made available within the “JISOO” service so that members can review it at any time.


    <div class="term_h2">Article 2 (Categories of Personal Information Collected and Methods of Collection)</div>
    2.1 Agreement to Collect and Use Personal Information
    <ul class="term_ul_num2"><li>When registering as a member, you will go through a consent procedure regarding the collection and use of personal information. By selecting “agree,” you are deemed to have consented to the collection and use of your personal information.</li></ul>

    2.2 Personal Information Collection for Service Provision
    <ul class="term_ul_num2">
        <li>The Company collects only the minimum personal information necessary to provide the service. Personal information is collected for the purpose of membership registration, service inquiries, event participation, contract performance, and similar services.</li>
    </ul>

    <div class="term_indent">
        (1) “JISOO” App Membership Registration
        <ul class="term_ul_num2">
            <li>Required Items: Email address, password, nickname</li>
            <li>Optional Items: Profile picture, date of birth, gender, country of residence</li>
        </ul>

        (2) Restriction on Membership Registration for Users Under 14
        <ul class="term_ul_num2">
            <li>The “JISOO” app restricts membership registration for children under 14 to protect their personal information.</li>
            <li>Users under 14 cannot provide the required registration information, and thus their use of the service is restricted.</li>
            <li>If it is found that a user under 14 has joined by providing false information, the Company will immediately delete the account and destroy the related data.</li>
        </ul>

        (3) Inquiries and Complaints Through Customer Service
        <ul class="term_ul_num2"><li>Required Items: Inquiry details, email address, contact information, and additional information if needed</li></ul>

        (4) Event Participation
        <ul class="term_ul_num2"><li>Information required for event participation (e.g., name, address, contact information, shipping details)</li></ul>
    </div>


    2.3 Information Automatically Generated During Service Use
    <ul class="term_ul_num2">
        <li>The following information may be automatically collected during service use:</li>
        <ul class="term_ul_num2" style="list-style-type:circle">
            <li>Service usage records (login logs, content usage, activity history, purchase history, etc.)</li>
            <li>Access logs, cookies, IP addresses, device information (OS, OS version, device model, advertising identifiers (ADID/IDFA)), payment records, location information (if consented)</li>
        </ul>
    </ul>

    2.4 Methods of Collecting Personal Information
    <ul class="term_ul_num2">
        <li>Membership registration, customer inquiries, event applications, surveys, etc.</li>
        <li>Generation through tracking tools</li>
        <li>Information provided by partner companies (e.g., joint marketing)</li>
    </ul>

    2.5 Access Permissions for the Mobile App
    <ul class="term_ul_num2"><li>The Company may request device access permissions to provide the service, after giving prior notice and obtaining consent.</li></ul>
    <div class="term_indent">
        (1) Android
        <ul class="term_ul_num2">
            <li>Required Permissions</li>
                <ul class="term_ul_num2" style="list-style-type:circle">
                    <li>Storage: Used for uploading, downloading, and saving photos/videos (On Android 10 (Q) and above, access is limited to media files in storage).</li>
                    <li>Optional Permissions</li>
                    <li>Camera: Used for taking/sending photos/videos, setting profile pictures, using AR features.</li>
                    <li>Microphone: Used for sending voice messages, video calls.</li>
                    <li>Notifications: Used for receiving push notifications.</li>
                    <li>Location: Used for location-based services (e.g., connecting with nearby fans, event notifications at specific locations).</li>
                </ul>
        (2) iOS
        <ul class="term_ul_num2">
            <li>Optional Permissions</li>   
                <ul class="term_ul_num2" style="list-style-type:circle">
                    <li>Photos: Used for sending/saving photos/videos, setting profile pictures.</li>   
                    <li>Camera: Used for taking/sending photos/videos, setting profile pictures, using AR features.</li>    
                    <li>Microphone: Used for sending voice messages, video calls.</li>  
                    <li>Notifications: Used for receiving push notifications.</li>  
                    <li>Location: Used for location-based services (e.g., connecting with nearby fans, event notifications at specific locations).</li> 
                </ul>
            <li>Users may decline optional permissions, but certain functions may be restricted.</li>   
            <li>Permission Settings</li>    
                <ul class="term_ul_num2" style="list-style-type:circle">
                    <li>Android: Settings > Apps > “JISOO” > Permissions</li>   
                    <li>iOS: Settings > Privacy > “JISOO”</li>  
                </ul>
        </ul>
    </div>



    <div class="term_h2">Article 3 (Purpose of Collecting and Using Personal Information)</div>
    The Company collects and uses personal information for the following purposes:
    <ul class="term_ul_num2">
        <li>Service Provision and Management: Providing content, managing members, processing payments, offering customer support, operating and improving the service.</li>
        <li>Member Identification and Management: Identity verification, checking for duplicate memberships, preventing misuse, handling inquiries/complaints, delivering notifications, managing accounts.</li>
        <li>Service Improvement and Development: Developing new services, enhancing existing services, analyzing usage statistics, and providing personalized services.</li>
        <li>Marketing and Advertising: Providing event information and advertisements (separate consent required for marketing), sending promotional materials, providing personalized advertisements.</li>
        <li>Legal Compliance: Investigating and addressing violations of laws and terms of use, fulfilling legal obligations.</li>
    </ul>


    <div class="term_h2">Article 4 (Sharing and Disclosure of Personal Information)</div>
    <ul class="term_ul_num2">
        <li>The Company does not disclose personal information beyond what is stated in Section 3 without the user’s prior consent, except in the following cases:</li>
            <ul class="term_ul_num2" style="list-style-type:circle">
                <li>When the user has given prior consent to disclosure.</li>
                <li>When required by law or requested by an investigative agency according to legal procedures.</li>
            </ul>
        <li>The Company provides personal information to third parties only with the user’s consent, as shown below:</li>
        <table style="border-collapse: collapse; border: 0px; text-align: center;">
            <tr>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Recipient</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Purpose</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Items Provided</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Retention and Use Period</td>
            </tr>
            <tr>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Slash Corporation</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Service operation & management</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Name, nickname, email address</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Until business partnership ends or membership withdrawal</td>
            </tr>
        </table>
    </ul>


    <div class="term_h2">Article 5 (Outsourcing of Personal Data Processing)</div>
    5.1 Domestic Outsourcing
    <ul class="term_ul_num2">
        <li>The Company may outsource personal data processing to improve its services. In such cases, it signs contracts to ensure compliance with data protection laws, secure management of personal data, and prohibit re-outsourcing without consent.</li>
        <table style="border-collapse: collapse; border: 0px; text-align: center;">
            <tr>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Contractor</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Outsourced Services</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Items Provided</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Retention and Use Period</td>
            </tr>
            <tr>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Slash Corporation</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Service operation & management</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Name, nickname, email address</td>
                <td style="border: 1px solid rgb(0, 0, 0); padding: 0.3em;">Until business partnership ends or membership withdrawal</td>
            </tr>
        </table>
    </ul>

    5.2 Overseas Outsourcing
    <ul class="term_ul_num2">
        <li>Contractor: Amazon Web Services (AWS)</li>
        <li>Country: Japan</li>
        <li>Time and Method of Transfer: Online transfer at the time of data collection</li>
        <li>Data Items Transferred: All personal information collected from or generated by users</li>
        <li>Retention Period: Until the purpose of collection is achieved or until the outsourcing contract ends</li>
        <li>Purpose: Storing, processing, and transmitting personal data via the cloud</li>
        <li>Contact Information: https://aws.amazon.com/ko/contact-us/</li>
    </ul>

    - AWS only provides physical server management and does not, in principle, access user personal information.
    <br>- Users may refuse to allow their data to be transferred overseas, but doing so may result in an inability to use the service.

    <ul class="term_ul_num2">
        <li>If there are changes to the outsourced tasks or contractors, the Company will disclose those changes without delay through an update to this Privacy Policy.</li>
    </ul>




    <div class="term_h2">Article 6 (Retention and Use Period of Collected Personal Information)</div>
    <ul class="term_ul_num2">
        <li>If a user withdraws from membership or if an account is deleted due to false information, the collected personal information is permanently deleted and cannot be used for any other purpose.</li>
        <li>The user’s personal information is promptly destroyed after the stated retention period or when the purpose of collection/use is fulfilled, unless it must be retained for specific periods under law or with individual user consent.</li>
    </ul>


    Relevant Retention Periods Under Specific Laws
    <ul class="term_ul_num2">
        <li>Act on the Consumer Protection in Electronic Commerce:</li>
            <ul class="term_ul_num2" style="list-style-type:circle">
                <li>Records on contracts or subscription withdrawal (5 years)</li>
                <li>Records on payment and supply of goods/services (5 years)</li>
                <li>Records on consumer complaints or dispute resolution (3 years)</li>
                <li>Records on display/advertisement (6 months)</li>
            </ul>
        <li>Framework Act on National Taxes: All transaction records required by tax law must be kept for 5 years.</li>
        <li>Electronic Financial Transactions Act: Records of electronic financial transactions must be kept for 5 years.</li>
        <li>Protection of Communications Secrets Act: Service visit records must be kept for 3 months.</li>
        <li>The Company will delete personal information of inactive users (who have not used the service for one year) 30 days after providing prior notice (via email, etc.), in accordance with the Personal Information Protection Act.</li>
    </ul>



    <div class="term_h2">Article 7 (Procedures and Methods for Destroying Personal Information)</div>
    The Company destroys personal information immediately when its retention period expires or the purpose of collection/use is achieved.
    <br><br>

    7.1 Destruction Procedure
    <ul class="term_ul_num2">
        <li>Information entered by users for membership registration, etc., is destroyed immediately once the purpose of collection/use is fulfilled, unless otherwise required by law.</li>
        <li>Information that must be retained under relevant laws is separated and stored in a different database. The separated personal information is not used for any purpose other than that mandated by law.</li>
    </ul>

    7.2 Destruction Methods
    <ul class="term_ul_num2">
        <li>Printed personal information is destroyed by shredding or incineration.</li>
        <li>Electronic files are deleted using technical methods that prevent the recovery of records.</li>
    </ul>



    <div class="term_h2">Article 8 (Rights and Obligations of Data Subjects and Their Legal Representatives, and How to Exercise Them)</div>
    <ul class="term_ul_num2">
        <li>Users may access, view, or correct their personal information at any time, and they may request account cancellation or restriction of data processing. However, some or all services may be restricted if such requests are made.</li>
        <li>Users can directly view or modify their information in [My Profile] in the service. They can also terminate their membership at any time through [Delete JISOO Account], upon which all personal information is deleted. However, in certain cases described in Section 6(2) of this Privacy Policy, the Company may retain data to the extent allowed by law.</li>
        <li>When a user requests correction or deletion of personal information, the Company verifies the user’s identity and takes action without delay. If the user’s actions fall under Section 20(1) of the Terms of Service (Reasons for Restriction), the Company may delete the user’s account or destroy the user’s personal information under the judgment of the Personal Information Protection Officer.</li>
        <li>The Company will not use or provide any incorrect personal information until corrections are completed. If incorrect information has already been provided to a third party, the Company will notify that party of the correction so that it can be implemented.</li>
        <li>The Company processes deleted personal information according to Section 6 of this Privacy Policy, ensuring it cannot be accessed or used for any purpose.</li>
        <li>A user may also exercise their rights through an authorized representative by submitting a power of attorney in accordance with the relevant laws.</li>
    </ul>

    <div class="term_h2">Article 9 (Technical and Managerial Measures to Protect Personal Information)</div>
    9.1 Technical Measures
    <ul class="term_ul_num2"><li>The Company makes every effort to prevent personal information from being leaked or damaged by hacking or computer viruses. User data is frequently backed up, and the latest antivirus software is used to prevent personal information or data from being leaked or damaged. Secure encryption methods are used to transmit personal information over the network. A firewall system is in place to block unauthorized external access. The Company continually strives to maintain all possible technical security measures.</li></ul>

    9.2 Managerial Measures
    <ul class="term_ul_num2">
        <li>Only authorized personnel handle personal information, and each relevant individual is assigned a separate password that is regularly updated. Frequent training is provided to emphasize compliance with privacy policies.</li>
        <li>The Company has appointed a Personal Information Protection Officer to monitor compliance with this Privacy Policy and to promptly correct any issues. However, the Company is not responsible for problems caused by the user’s personal negligence or issues arising from the inherent risks of using the internet.</li>
    </ul>

    <div class="term_h2">Article 10 (Installation/Operation of Automatic Data Collection Devices and Refusal)</div>
    10.1 Use of Cookies
    <ul class="term_ul_num2"><li>Cookies are small text files sent by a website’s server to the user’s browser. They are stored on the user’s device. Cookies do not contain personally identifiable information, and users can refuse or delete cookies at any time.</li></ul>
    10.2 Purpose of Cookies
    <ul class="term_ul_num2"><li>Cookies allow faster and more convenient web browsing by storing user preferences and frequently visited pages.</li></ul>
    10.3 Installation/Operation and Refusal of Cookies
    <ul class="term_ul_num2">
        <li>Users can choose whether or not to install cookies by adjusting browser settings.</li>
        <li>If cookies are refused, some services requiring login may not function properly.</li>
        <li>Browser Settings</li>
            <ul class="term_ul_num2" style="list-style-type:circle">
                <li>Internet Explorer: Tools > Internet Options > Privacy > Settings</li>
                <li>Chrome: Settings > Advanced > Privacy > Content Settings > Cookies</li>
            </ul>
    </ul>

    <div class="term_h2">Article 11 (Linked Sites)</div>
    <ul class="term_ul_num2"><li>The Company may provide links to other websites or materials. The Company’s Privacy Policy does not apply to linked external sites. Users should review the Privacy Policy of each linked website.</li></ul>

    <div class="term_h2">Article 12 (Personal Information Protection Officer and Responsible Department)</div>
    The Company designates the following personnel to handle inquiries and complaints regarding personal information:
    <br><br>

    Personal Information Protection Officer
    <ul class="term_ul_num2">
        <li>Name: Byungwoo Min</li>
        <li>Title: Director</li>
        <li>Email: hello@jisoo.app</li>
    </ul>

    Personal Information Protection Department
    <ul class="term_ul_num2">
        <li>Department: BD TEAM</li>
        <li>Manager: Byungwoo Min</li>
        <li>Email: hello@jisoo.app</li>
        <li>For personal information access requests under Article 35 of the Personal Information Protection Act, please contact the following department. The Company will make every effort to process your request promptly:</li>
    </ul>


    Personal Information Access Request - Reception and Processing
    <ul class="term_ul_num2">
        <li>Department: CS Team</li>
        <li>Email: hello@jisoo.app</li>
        <li>For reports or counseling concerning personal data breaches, users may also contact the following agencies:</li>
            <ul class="term_ul_num2" style="list-style-type:circle">
                <li>Personal Information Infringement Report Center: https://privacy.kisa.or.kr / Phone: 118 (no area code)</li>
                <li>Supreme Prosecutors’ Office, Cyber Crime Investigation Department: http://www.spo.go.kr / Phone: 1301 (no area code)
                <li>National Police Agency, Cyber Bureau: https://ecrm.cyber.go.kr / Phone: 182 (no area code)</li>
            </ul>
    </ul>


    <div class="term_h2">Article 13 (Revisions to the Privacy Policy)</div>
    <ul class="term_ul_num2"><li>The Company will announce any changes to this Privacy Policy, including the reasons for revision and the effective date, through a notice within the service.</li></ul>
    This Privacy Policy takes effect on January 31, 2025.
    <ul class="term_ul_num2">
        <li>Announcement Date: January 31, 2025</li>
        <li>Effective Date: January 31, 2025</li>
    </ul>
</div>`
  },
  "3": {
    title_kr: `㈜블리수엔터테인먼트 (이하 "회사") "JISOO" 앱 광고성정보수신동의`,
    title_en: `BLISSOO ENTERTAINMENT CO., LTD. ("COMPANY") "JISOO" APP MARKETING INFORMATION CONSENT`,
    content_kr: `<div class="term_container">

    <div class="term_h1">광고성정보수신동의</div>

    <div class="term_box">BLISSOO(이하 "회사") "JISOO" 앱을 이용하기 전 광고성정보수신동의("본 약관")을 반드시 읽어주시기 바랍니다.</div>

    BLISSOO (이하 '회사')는 아래와 같이 개인정보를 수집・이용 합니다.
    <ul class="term_ul_num2">
        <li>수집 이용 항목 : 회원가입시 수집한 항목, 서비스 이용시 수집한 항목, 서비스 이용 기록</li>
        <li>수집 이용 목적 : 마케팅 및 프로모션 활용(광고성 (맞춤형 광고 포함) / 이벤트 정보 제공)</li>
        <li>보유 및 이용기간 : 회원탈퇴 또는 동의 철회 시 까지</li>
    </ul>
    위 개인정보 수집・이용에 동의하지 않으실 수 있으며, 동의하지 않아도 회원가입 및 서비스 이용이 가능합니다.
    <br>그 밖의 사항은 개인정보처리방침에 따릅니다.

</div>`,
    content_en: `<div class="term_container">

    <div class="term_h1">MARKETING INFORMATION CONSENT</div>

    <div class="term_box">Please read the Marketing Information Consent (“Terms”) before using the “JISOO” app by BLISSOO (“Company”).</div>

    BLISSOO (hereinafter referred to as the "Company") collects and uses personal information as follows:
    <ul class="term_ul_num2">
        <li>Collection and Usage Items: Information collected during membership registration, service usage, and service usage records</li>
        <li>Purpose of Collection and Usage: Marketing and promotional purposes (including advertising (personalized ads) / event information)</li>
        <li>Retention and Usage Period: Until membership withdrawal or consent withdrawal</li>
    </ul>
    You may choose not to consent to the collection and use of personal information above. You can still sign up and use the service without consent.
    <br>Other matters are subject to the Privacy Policy.
</div>`,
  },
  "4": {
   title_kr: `㈜블리수엔터테인먼트 (이하 "회사") "JISOO" 앱 청소년 보호정책`,
   title_en: `BLISSOO ENTERTAINMENT CO., LTD. (“COMPANY”) “JISOO” APP YOUTH PROTECTION POLICY`,
   content_kr: `<div class="term_container">
    <div class="term_h1">청소년 보호정책</div>
    <div class="term_box">
        <b>BLISSOO (이하 "회사") "JISOO" 앱 청소년 보호정책</b><Br>
        BLISSOO (이하 "회사")는 모든 연령대가 자유롭게 이용할 수 있는 공간으로서 유해 정보로부터 청소년을 보호하고 청소년의 안전한 인터넷 사용을 돕기 위해 아래와 같이 정보통신망 이용촉진 및 정보보호 등에 관한 법률에서 정한 청소년 보호정책을 시행하고 있습니다. 앞으로도 회사는 깨끗하고 건전한 인터넷 문화를 조성하고 청소년이 올바른 정보공유 활동을 통하여 인격체로 성장할 수 있도록 더욱 노력하겠습니다.
    </div>

    <div class="term_h6">1. 청소년 보호를 위한 목표 및 기본원칙</div>
    청소년이 정신적, 신체적으로 유해한 환경으로부터 보호받고 유익한 환경을 조성하도록 노력하며, 안전하게 인터넷을 이용할 수 있는 서비스를 제공하기 위해 청소년 보호정책을 명시하고 있습니다.

    <div class="term_h6">2. 청소년 보호 장치</div>
    청소년이 아무런 제한장치 없이 유해정보에 노출되지 않도록 청소년 유해매체물에 대해서는 인증장치를 마련, 적용하며 청소년 유해정보가 노출되지 않기 위한 예방차원의 조치를 강구합니다.

    <div class="term_h6">3. 유해정보로 인한 피해상담 및 고충처리</div>
    유해정보로 인한 피해상담 및 고충처리를 위한 전문인력을 배치하여 구제조치의 지연 및 처리 미숙으로 인한 피해가 확산되지 않도록 노력합니다.

    <div class="term_h6">4. 유해정보에 대한 청소년 접근제한 및 관리조치</div>
    불법적이거나 청소년에 유해한 키워드에 대한 금칙어를 일반 검색을 포함한 서비스에 확대 적용하고 있는 등 체계적인 관리를 하고 있습니다.

    <div class="term_h6">5. 유해정보로부터 청소년을 보호하기 위해 교육</div>
    청소년보호담당자 및 각 서비스 담당자들을 대상으로 청소년 보호를 위한 각종 관련 법령 및 제재기준, 유해정보 발견 시 대처방법, 위반사항 처리에 대한 보고절차 등을 교육하고 있습니다.

    <div class="term_h6">6. 전체 이용자들의 인식제고를 통한 청소년 보호</div>
    서비스 이용약관 및 커뮤니티 이용정책 등을 통하여 불건전한 행위를 할 경우 이용제한 또는 민,형사상의 책임을 받을 수 있음을 고지하고 있으며, 신종 유해정보가 발생했을 경우 공지사항 또는 이메일을 통하여 신속히 전파함으로써 청소년 및 전체 이용자를 보호하고 있습니다.

    <div class="term_h6">7. 청소년 보호 책임자 및 담당자의 지정</div>
    아래와 같이 청소년 보호 책임자 및 청소년 보호 담당자를 지정하여 청소년 유해정보 차단 및 관리, 청소년 유해정보로부터 청소년 보호정책을 수립하는 등 청소년 보호업무를 수행하고 있습니다.

    <ul class="term_ul_num2">
        <b>청소년 보호 관리 책임자</b>
        <li>성명 : 민병우</li>
        <li>직위 : 이사</li>
        <li>이메일 : hello@jisoo.app</li>
    </ul>
</div>`,
   content_en: `<div class="term_container">
    <div class="term_h1">YOUTH PROTECTION POLICY</div>
    <div class="term_box">
        <b>BLISSOO (“COMPANY”) “JISOO” APP YOUTH PROTECTION POLICY</b><Br>
        BLISSOO (hereinafter referred to as the “Company”) implements the following Youth Protection Policy, pursuant to the Act on Promotion of Information and Communications Network Utilization and Information Protection, etc., to protect adolescents from harmful information and to help them safely use the internet in a space that can be freely utilized by users of all ages. Going forward, the Company will continue to work toward creating a healthy and clean internet culture and supporting adolescents in developing their personalities through the proper sharing of information.
    </div>

    <div class="term_h6">1. Goals and Basic Principles for Youth Protection</div>
    The Company is committed to protecting adolescents from environments harmful to their mental and physical well-being and to creating beneficial environments. Accordingly, the Company specifies and enforces a Youth Protection Policy to ensure adolescents can safely use the internet.

    <div class="term_h6">2. Youth Protection Measures</div>
    To prevent adolescents from being exposed to harmful content without any restrictions, the Company has set up and applies an authentication mechanism for media materials deemed harmful to youths. We also take preventive measures to ensure harmful information is not exposed to adolescents.

    <div class="term_h6">3. Counseling and Grievance Handling for Harmful Information</div>
    We have assigned specialized personnel to handle counseling and grievances related to harmful information, striving to prevent further damage from delayed or inadequate remediation.

    <div class="term_h6">4. Restricting and Managing Adolescent Access to Harmful Information</div>
    We engage in systematic management by applying restricted keywords for illegal or youth-harmful content—covering general searches and other services—to limit adolescent access.

    <div class="term_h6">5. Education to Protect Adolescents from Harmful Information</div>
    We provide regular training to our Youth Protection Officer(s) and service managers on relevant laws and regulations concerning youth protection, measures to address harmful information, and reporting procedures for any violations.

    <div class="term_h6">6. Protecting Adolescents through Heightened Awareness Among All Users</div>
    Through the Terms of Service and Community Policies, we inform users that they may face usage restrictions or civil/criminal liability for inappropriate behavior. In the event of newly identified harmful information, we swiftly share notices or emails to protect not only adolescents but all users.

    <div class="term_h6">7. Appointment of a Youth Protection Officer and Manager</div>
    The Company designates the following personnel as the Youth Protection Officer and Manager. They are responsible for blocking and managing harmful information, establishing youth protection policies, and performing various tasks to protect adolescents.

    <ul class="term_ul_num2">
        <b>Youth Protection Officer</b>
        <li>Name : Byungwoo Min</li>
        <li>Position : Director</li>
        <li>Email : hello@jisoo.app</li>
    </ul>
</div>`
  },
  "5": {
    title_kr: `㈜블리수엔터테인먼트 (이하 "회사") "JISOO" 앱 서비스 운영 정책`,
    title_en: `SERVICE OPERATION POLICY AND LEGAL NOTICES`,
    content_kr: `<div class="term_container">
    <div class="term_h1">서비스 운영 정책</div>
    <div class="term_box">
        <b>BLISSOO (이하 "회사") "JISOO" 앱 서비스 운영 정책</b><Br>
        본 운영 정책은 BLISSOO (이하 ‘회사’)가 제공하는 JISOO (이하 ‘서비스’)를 운영함에 있어, 서비스 내에 발생할 수 있는 문제 상황에 대하여 일관성 있게 대처하기 위하여 서비스 운영의 기준과 회원 여러분이 지켜주셔야 할 세부적인 사항이 규정되어 있습니다.<br>
        운영 정책을 지키지 않을 경우 불이익을 당할 수 있으니 주의 깊게 읽어 주시기 바랍니다.
    </div>

    <div class="term_h2">제1조 (회원의 권리와 의무)</div>
    <ul class="term_ul_num2">
        <b>가. 회원의 권리</b>
        <li>
            회원은 이메일 문의를 통해 회원 관련 문의 및 서비스에 대한 각종 문의를 포함하여 요청 및 건의를 할 수 있습니다.<br>
            - [이메일 문의] hello@jisoo.app
        </li>
        <li>회사는 서비스 내 회원들 간에 발생하는 분쟁 및 회원 스스로의 과실로 일어난 피해에 대해서는 개입하거나 조치하지 않습니다. 다만, 서비스를 이용 중 다른 회원의 운영 정책 위반 행위로 인해 피해를 입으신 경우, 회원은 이를 회사에 제보하여 운영 정책의 적용을 요청할 수 있으며 회사는 신고 내용을 확인하고 운영 정책에 따른 제재 조치를 취할 수 있습니다.</li>
        <li>운영 정책의 적용 결과가 불만족스러울 경우 언제든지 온라인 및 이메일 문의를 통해 이의를 신청할 수 있습니다.</li>

        <Br><b>나. 회원의 의무</b>
        <li>회원은 서비스 내에서 관계 법령을 위반하는 활동과 서비스 시스템 및 다른 회원의 정상적인 서비스 이용을 방해하는 활동을 하지 않습니다.</li>
        <li>금지하는 활동을 하는 경우 정상적인 이용 회원의 신속한 보호를 위해 사전 안내 없이 위반/방해 활동 회원의 서비스 이용이 한시적, 영구적으로 제한할 수 있습니다. 또한 다른 회원의 콘텐츠가 본 커뮤니티 서비스 운영 정책에 위배되거나, 서비스 이용에 방해가 되는 것으로 판단될 경우 콘텐츠의 신고 기능을 활용하여 주시기 바랍니다.</li>
    </ul>


    <div class="term_h2">제2조 (서비스의 이용제한)</div>
    <ul class="term_ul_num2">
        <b>가. 이용제한 사유에 해당되는 활동 및 불법성 활동</b>
        <li>불법 사행성, 도박 사이트를 홍보</li>
        <li>불법 제품 또는 인터넷에서 판매 금지된 물품을 판매하거나 홍보</li>
        <li>범법 행위에 대한 동기 부여 및 실행에 도움이 되는 정보를 제공</li>
        <li>악성코드, 바이러스 등의 프로그램을 설치/유포하여 회원의 정상적인 서비스 이용을 저해하거나, 회원의 개인정보를 탈취하려고 하는 경우</li>
        <li>방송, 음원, 영화, 만화, 영상, 이미지 등 타인의 저작물을 당사자의 동의 없이 공유</li>
        <li>타인의 저작물을 불법적인 경로로 획득할 수 있는 정보나 방법을 제공 (예 : 무료 다운로드 공유, 불법 촬영물 유통 등)</li>
        <li>타인의 권리에 속하는 상표권, 의장권 등을 무단으로 침해</li>
        <li>게시물(전체 및 일부), 사진, 이미지를 무단 도용(불펌)</li>
        <li>타인의 개인정보를 포함하고 있는 내용을 작성</li>
        <li> 타인의 개인정보 및 계정, 기기를 도용/탈취하여 서비스를 가입하거나, 이용하는 경우</li>

        <br><b>나. 음란, 청소년 유해 활동</b>
        <li>과도한 신체 노출이나 음란한 행위를 묘사</li>
        <li>성매매 관련 정보를 공유</li>
        <li>타인에게 성적 수치심이나 불쾌감을 유발할 수 있는 내용을 작성</li>
        <li>일반적인 사람이 보기에 혐오스럽고 눈살이 찌푸려지는 사진 또는 내용을 작성(예 : 인간/동물의 사체 또는 훼손된 모습, 방뇨/배설/살인/자살의 장면 등)</li>

        <br><b>다. 차별/갈등 조장 활동</b>
        <li>성별, 종교, 장애, 연령, 사회적 신분, 인종, 지역, 직업 등을 차별하거나 이에 대한 편견을 조장하는 내용을 작성</li>


        <br><b>라. 도배/광고/홍보/스팸 활동</b>
        <li>동일한 내용을 동일 서비스 또는 여러 서비스에 반복적으로 등록(예 : 행운의편지 등)</li>
        <li>타인의 동의 없이 타인의 게시글 또는 공간에 광고/홍보 및 방문 유도를 목적으로 상업적 내용을 등록/전송하거나 ‘공감’, ‘친구신청’ 등의 활동을 하는 경우</li>
        <li>상업적 또는 홍보/광고, 악의적인 목적으로 서비스의 시스템 취약점을 이용하여 서비스를 가입/활동하는 경우</li>


        <br><b>마. 계정 거래/양도/대리/교환 활동</b>
        <li>계정 및 계정 내 콘텐츠를 타인에게 판매, 양도, 대여하거나, 타인에게 그 이용을 허락 또는 이를 시도하는 행위</li>
        <li>타인의 계정 및 계정 내 콘텐츠를 취득하기 위해 구매, 양수, 교환을 시도하거나, 이를 타인에게 알선하는 활동</li>
        <li>타인을 기망하여 타인의 계정 및 계정 내 콘텐츠를 탈취하는 행위</li>

        <br><b>바. 서비스에서 금지하는 활동</b>
        <li>정상적인 서비스 이용으로 볼 수 없는 다량의 계정 생성 및 서비스 가입/탈퇴, 반복적 유사 활동</li>
        <li>서비스 명칭 또는 회사의 임직원이나 서비스와 관련한 운영진을 사칭하여 다른 회원을 속이거나 이득을 취하는 등 피해와 혼란을 주는 행위</li>
        <li>욕설/비속어/은어 등 통상적인 금기어 사용과 그 외 회사와 회원이 공유하는 상식과 사회 통념에 반하는 비정상적인 활동</li>
        <li>언론사의 명의나 언론사의 직책 등을 사칭 또는 도용하여 기사 형태를 갖춘 게시물 중 그 내용이 허위로 판단되는 게시물을 게시하는 경우</li>

        <br><b>사. 기타 이용제한 활동</b>
        <li>사용자가 더 이상 서비스를 사용할 의사가 없음을 확인하고 탈퇴하는 경우</li>
    </ul>


    <div class="term_h2">제3조 (서비스 이용제한의 종류)</div>
    <b>가. 콘텐츠 제한</b>
    <br>콘텐츠를 볼 수 없도록 노출이 제한됩니다.

    <br><br><b>나. 서비스 제한</b>
    <br>해당 서비스의 이용이 한시적, 영구적으로 일부 또는 전체 제한됩니다.

    <br><br><b>다. 계정 제한</b>
    <br>모든 서비스의 이용이 한시적, 영구적으로 제한됩니다.

    <br><br><b>라. 가입/탈퇴 제한</b>
    <br>일부 서비스의 경우, 해당 서비스 탈퇴 후 재가입이 일정기간 동안 제한됩니다.

    <ul class="term_ul_num2">
        <li>이용제한은 위반 활동의 누적 정도에 따라 한시적 제한에서 영구적 제한으로 단계적으로 제한 됩니다.</li>
        <li>위의 항목에 구체적으로 해당하지 않은 사항이라 하더라도 건전한 서비스 환경 제공에 악영향을 끼치는 경우 커뮤니티의 이용정책에 의거하여 이용제한 될 수 있습니다.</li>
        <li>단, 음란 콘텐츠 게시/유포 및 사행성 도박 홍보 등 관련 법률에서 금지하는 불법 활동에 대해서는 위반 활동의 누적 정도와 관계없이 일시에 영구적으로 제한될 수 있습니다.</li>
        <li>이용제한에 대한 이의 제기는 온라인 문의 및 이메일 문의를 통해 언제든지 신청할 수 있습니다.</li>
    </ul>

    <div style="text-align:left; margin-top:2em;" class="term_h1">책임의 한계와 법적 고지</div>
    <div class="term_h2">제1조 (책임의 한계)</div>
    <ul class="term_ul_num2">
        <li>BLISSOO (이하 ‘회사’라 함)는 JISOO 서비스(이하 ‘서비스’라 함)에서 제공되는 영상, 링크, 광고, 회원의 게시물 및 댓글 등 모든 콘텐츠(이하 ‘서비스 콘텐츠’라 하며, ‘회사’가 제공하는 이용약관에서 ‘서비스 콘텐츠’ 또는 ‘콘텐츠’라 표현함)의 정확성이나 신뢰성 혹은 적절성에 대해 어떠한 보증도 하지 않으며, ‘서비스’를 통한 광고, 기타 정보 또는 제안의 결과로서 구매 또는 취득하게 되는 제3자의 제품 또는 기타 정보 등의 질에 대해서도 어떠한 보증도 하지 않습니다.</li>
        <li>귀하는, ‘서비스’ 및 ‘서비스 콘텐츠’를 자신의 책임 하에 이용함을 인정합니다. 이에 따라 ‘회사’는 귀하의 ‘서비스’ 및 ‘서비스 콘텐츠’의 이용 자체에 대해서 직접, 간접, 부수적, 징벌적, 파생적인 손해에 대해서 책임을 지지 않습니다.</li>
        <li>‘회사’는 ‘서비스’ 및 ‘서비스 콘텐츠’의 내용을 수정할 의무를 지지 않습니다. 다만, ‘회사’는 필요에 따라 ‘서비스’를 임의로 개선할 수는 있습니다.</li>
    </ul>


    <div class="term_h2">제2조 (법적 고지)</div>
    <ul class="term_ul_num2">
        <li>귀하는, ‘서비스 콘텐츠’를 ‘서비스’ 내에서 ‘서비스’가 허용하는 범위에서 시청하는 것 이외에 ‘서비스 콘텐츠’를 임의로 다운로드하거나 추출할 수 없으며, ‘서비스 콘텐츠’를 ‘회사’의 동의 없이 외부에 전송, 게시하는 등의 행위 또한 금지됩니다.</li>
        <li>귀하는, ‘회사’의 ‘서비스’ 및 ‘서비스 콘텐츠’ 제공 시스템에 ‘회사’가 허락하지 않은 방식으로 접근할 수 없으며, 특히 프로그램 등을 이용한 기계적 접근이나 제3자의 계정정보를 이용한 접근은 엄격히 금지됩니다.</li>
        <li>귀하는, ‘서비스’와 관련된 일체의 정보 및 권리들, 특히 ‘서비스’ 관련 저작물 및 상표 등을 ‘회사’의 허락 없이 사용할 수 없으며, 귀하가 ‘서비스’ 및 ‘서비스 콘텐츠’에 대한 권리자로 오인하도록 하는 행위 또한 금지됩니다.</li>
        <li>귀하는, ‘서비스’ 및 ‘서비스 콘텐츠’를 시청하는 과정에서 습득하게 되는 ‘회사’ 및 제3자에 대한 개인정보를 포함하는 모든 정보에 대하여 해당 정보주체의 동의 없이 외부로 누설하거나 (재)배포, 전송해서는 안됩니다.</li>
        <li>귀하는, 위와 같은 제한사항들에 대해 숙지하고 준수해야 하며, 위반 시 그에 대한 민형사상 법적 책임을 질 수 있음을 인지하고 동의합니다.</li>
        <li>귀하가 위와 같은 책임의 한계 및 법적 고지 내용에 동의하지 않을 경우에는 ‘서비스’ 이용을 할 수 없으므로, 그러한 경우에는 ‘서비스’ 이용을 즉시 중단하시기 바랍니다.</li>
    </ul>

</div>`,
    content_en: `<div class="term_container">
    <div class="term_h1">SERVICE OPERATION POLICY AND LEGAL NOTICES</div>


    <div style="text-align:left; margin-top:2em;" class="term_h1">I. Service Operation Policy</div>
    This policy is established by BLISSOO (“Company”) to ensure a consistent response to potential issues arising from the operation of JISOO (“Service”) and to set forth detailed guidelines that members (“Members”) must abide by.
    <br>Please note that non-compliance may result in disadvantages.


    <div class="term_h2">Article 1 (Rights and Obligations of Members)</div>
    <b>1. Member Rights</b>
    <ul class="term_ul_num2">
        <li>Members may contact the Company via email (hello@jisoo.app) to inquire about membership-related issues or to submit various service-related requests and suggestions.</li>
        <li>The Company does not intervene in disputes between Members or damages caused by Members’ own negligence. However, if you suffer damage due to another Member’s violation of this policy, you may report it to the Company, and the Company may take the necessary actions according to the policy.</li>
        <li>If you are dissatisfied with the outcome of the policy enforcement, you may file an objection at any time via online or email inquiries.</li>
    </ul>

    <b>2. Member Obligations</b>
    <ul class="term_ul_num2">
        <li>Members shall not engage in activities that violate applicable laws or interfere with the Service system and other Members’ normal use of the Service.</li>
        <li>If a Member performs any prohibited activities, the Company may suspend that Member’s access to the Service, either temporarily or permanently, without prior notice, in order to protect normal users promptly.</li>
        <li>If you believe another Member’s content violates the community service operation policy or interferes with your use of the Service, please use the content reporting function.</li>
    </ul>


    <div class="term_h2">Article 2 (Restrictions on Use of the Service)</div>

    <b>1. Examples of Activities Subject to Restrictions</b>
    <ul class="term_ul_num2">
        <li>Promoting illegal gambling or lottery sites; selling/promoting illegal or Internet-banned products</li>
        <li>Providing information that encourages or assists criminal acts</li>
        <li>Distributing viruses/malicious code, attempting to steal personal information</li>
        <li>Sharing copyrighted works (broadcasts, music, films, images, etc.) without permission, distributing illegally recorded content</li>
        <li>Using or stealing another’s personal information or account to sign up for the Service</li>
        <li>Posting obscene or harmful-to-youth content (excessive nudity, prostitution, sexual humiliation, etc.)</li>
        <li>Discriminatory or conflict-promoting content (based on gender, religion, disability, race, etc.)</li>
        <li>Spamming, advertising, promotional activities without consent, exploiting system vulnerabilities</li>
        <li>Trading, transferring, renting out, or stealing accounts or in-account content</li>
        <li>Impersonating the Service or Company staff, posting false news articles, etc.</li>
    </ul>

    <b>2. Types of Restrictions</b>
    <ul class="term_ul_num2">
        <li><b>Content Restriction:</b> The relevant post/content may be hidden from other Members.</li>
        <li><b>Service Restriction:</b> Temporary or permanent suspension of some or all features of the Service.</li>
        <li><b>Account Restriction:</b> Temporary or permanent suspension of all Service usage.</li>
        <li><b>Registration/Withdrawal Restriction:</b> Restricted re-registration for a certain period after withdrawal for some services.</li>
    </ul>
    Restrictions may escalate from temporary to permanent depending on the severity and accumulation of violations.
    <br>Illegal activities (e.g., obscene content, gambling) prohibited by law may result in immediate and permanent suspension regardless of prior violations.
    <br>Members may appeal usage restrictions through online or email inquiries at any time.



    <div style="text-align:left; margin-top:2em;" class="term_h1">II. Limitations of Liability and Legal Notices</div>

    <div class="term_h2">Article 1 (Limitation of Liability)</div>
    <ul class="term_ul_num2">
        <li><b>BLISSOO (“Company”)</b> does not guarantee the accuracy, reliability, or suitability of any content (videos, links, advertisements, posts, comments, etc.) provided by <b>JISOO (“Service”).</b></li>
        <li>You acknowledge that you use the Service at your own risk, and the Company assumes no responsibility for any direct, indirect, incidental, punitive, or consequential damages arising from your use of the Service or its content.</li>
        <li>The Company is under no obligation to modify the contents of the Service, though it may make changes at its discretion if necessary.</li>
    </ul>

    <div class="term_h2">Article 2 (Legal Notices)</div>
    <ul class="term_ul_num">
        <li>Except for viewing the Service Content within the scope permitted by the Service, you may not download or extract the Content. Transmitting or posting the Content externally without the Company’s consent is also prohibited.</li>
        <li>You may not access the Company’s Service systems by unauthorized methods, including using automated programs or third-party account information. Such mechanical or automated access is strictly prohibited.</li>
        <li>You may not use any information or rights related to the Service—particularly copyrights or trademarks—without the Company’s authorization, nor mislead others into believing you hold such rights.</li>
        <li>You may not disclose, redistribute, or transmit any information, including personal data about the Company or third parties, obtained while using the Service, without the data subject’s consent.</li>
        <li>You must comply with the above restrictions and acknowledge that you may face civil or criminal liability for any violations. If you do not agree to these terms, you must cease using the Service immediately.</li>
    </ul>


    <div style="text-align:left; margin-top:2em;" class="term_h1">III. Addendum</div>
    <ul class="term_ul_num2">
        <li>This document outlines the <b>JISOO</b> Service Operation Policy and Limitations of Liability provided by <b>BLISSOO</b> in both Korean and English.</li>
        <li>In case of any discrepancy between the Korean version and the English version, the Korean version shall prevail (in adherence to Korean laws).</li>
        <li>The content herein may be amended at the Company’s discretion, with prior notice to Members where applicable.</li>
    </ul>

</div>`
  }
};

export default function AgreementPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [userInfoLanguage, setUserInfoLanguage] = useState<string>('ko');
    const [showBackBtn, setShowBackBtn] = useState<boolean>(true);

    const handleBack = () => {
      router.back();
    }

    const [agreement, setAgreement] = useState<any>({
        title_kr: '',
        title_en: '',
        content_kr: '',
        content_en: ''
    });

    const loadAgreement = (id : string) => {

      setAgreement(agreementContents[id]);
      
    }

    const id = searchParams.get('id');
    const lang = searchParams.get('lang');
    const type = searchParams.get('type');
    
    useEffect(() => {
      loadAgreement(id??"1");
      setUserInfoLanguage(lang??"ko");
      if( (type??"") == "blank" ){
        setShowBackBtn(false);
      }
    }, [id, lang, router]);

  return (
    <div className="signup__cont agreement">
        <div className="signup__top">
            <div className="signup__title"></div>
            {showBackBtn && <div className="signup__back" onClick={handleBack}><img src="/image/icon_close_black.png" alt="back" /></div> }
        </div>
      {/* <h1 className="agreement__title">{
        userInfoLanguage === 'ko' ? 
        agreement.title_kr 
        : 
        userInfoLanguage === 'en' ? 
        agreement.title_en.length !== '' ? agreement.title_en : agreement.title_kr 
        : agreement.title_kr
      }</h1> */}
      <div className="agreement__content" dangerouslySetInnerHTML={{__html:
        userInfoLanguage === 'ko' ? 
        agreement.content_kr : 
        userInfoLanguage === 'en' ? 
        agreement.content_en.length !== '' ? agreement.content_en : agreement.content_kr 
        : agreement.content_kr
      }}>
      </div>
    </div>
  );
}
