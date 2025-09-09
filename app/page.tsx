"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const AgreementPage = (props: { setIsAgreement: (isAgreement: boolean) => void }) => {
  return (
    <div className="pop__alert">
      {/* <div className="pop__alertBg"></div> */}
      <div className="pop__alertCont">
        <div className="pop__alert_agree01">Jisoo 서비스 이용을 위한 <br />앱 권한 안내</div>
        <div className="pop__alert_agree02">
          <div className="pop__alert_agree02_item">
            <img className="pop__alert_agree02_itemIcon" src="/image/icon_notification.png" alt="agree01" />
            <div className="pop__alert_agree02_itemTxt">
              <div className="pop__alert_agree02_itemTxt01">알림 (선택)</div>
              <div className="pop__alert_agree02_itemTxt02">콘텐츠 중요메시지 수신을 위해 필요</div>
            </div>
          </div>
          <div className="pop__alert_agree02_item">
            <img className="pop__alert_agree02_itemIcon" src="/image/icon_camera.png" alt="agree02" />
            <div className="pop__alert_agree02_itemTxt">
              <div className="pop__alert_agree02_itemTxt01">사진/저장공간 (선택)</div>
              <div className="pop__alert_agree02_itemTxt02">이미지 저장에 필요</div>
            </div>
          </div>
        </div>
        <div className="pop__alert_agree03">
          <div className="pop__alert_agree03_item">
            <div className="pop__alert_agree03_itemSpan"></div>
            <div className="pop__alert_agree03_itemTxt">기종별로 선택적 접근 권한 항목이 상이할 수 있습니다.</div>
          </div>
          <div className="pop__alert_agree03_item">
            <div className="pop__alert_agree03_itemSpan"></div>
            <div className="pop__alert_agree03_itemTxt">해당 기능 이용시 동의를 받고 있으며, 허용하지 않아도 서비스 이용이 가능합니다.</div>
          </div>
        </div>
        <div className="pop__alertBtn btn primary large pointer" onClick={() => props.setIsAgreement(false)}>OK</div>
      </div>
    </div>
  );
};

export default function Home() {

  const router = useRouter();

  return (
    <div className={`intro ${dayjs().diff('2025-02-02 14:00') >= 0 ? "intro_2" : ""}`}>
      {
        <>
          {
            dayjs().diff('2025-02-02 14:00') >= 0 ?
              <div className="marketBtnRoot">
                <a className="googleBtn" href="https://play.google.com/store/apps/details?id=com.jisoo.platform" target="_blank"></a>
                <a className="appleBtn" href="https://apps.apple.com/app/jisoo/id6740193950" target="_blank"></a>
              </div>
              :
              <>
                <a className="googleBtn" href="#" onClick={e => alert('준비중입니다')}></a>
                <a className="appleBtn" href="#" onClick={e => alert('준비중입니다')}></a>
              </>
          }
          <div className="termRoot">
            <a className="termBtn" onClick={e => router.push('/agreement?id=1')}>이용약관</a>
            <a className="termBtn" onClick={e => router.push('/agreement?id=2')}>개인정보 처리방침</a>
            {/* <a className="termBtn" onClick={e => router.push('/terms?id=SERVICE_TERMS&lang=ko')}>이용약관</a>
            <a className="termBtn" onClick={e => router.push('/terms?id=PRIVACY_POLICY&lang=ko')}>개인정보 처리방침</a> */}
          </div>
        </>
      }
    </div>
  );
}
