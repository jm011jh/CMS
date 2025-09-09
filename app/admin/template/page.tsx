"use client";

import { useState } from "react";
import AdmButton from "../components/design/AdmButton";
import { useConfirmPopupStore } from "../store/confirmPopupStore";
import useLoadingScreenStore from "../store/loadingScreenStore";
import AdmCategoryPopup from "./component/AdmCategoryPopup";

const TemplatePage = () => {

    const [showTest01, setShowTest01] = useState(false);

    const handleSave = (data: any) => {
        // Handle the save action here
        // console.log("Data saved:", data);
        setTest01Data(data); // Update the testData state with the new data from the popup
        // You can also close the popup after saving if needed
        setShowTest01(false);
    };

    const [test01Data, setTest01Data] = useState<any>(
        new Array(10).fill(null).map((_, index) => {
            return {
                id: index + 1,
                title: `카테고리 ${index + 1}`,
                description: `카테고리 ${index + 1}에 대한 설명입니다.`,
            }
        }
        )
    );

    const { showPopup } = useConfirmPopupStore();
    const showTest02 = () => {
        showPopup({
            title: <p>사용자 탈퇴를 진행할까요?2</p>,
            desc: <p>탈퇴 시 모든 개인정보 및 이용내역이 삭제되며<br />이후 복구할 수 없으며, 구독 중인 서비스가 있는지<br />확인 후 탈퇴처리해주세요.<br />정말 탈퇴처리하시겠습니까?</p>,
            onConfirm: () => {
                alert('탈퇴처리 되었습니다.');
            },
            onCancel: () => {
                return false;
            }
        });
        // You can implement the popup logic here
    };

    const { showLoading, hideLoading } = useLoadingScreenStore();
    const showTest03 = () => {
        showLoading();
        setTimeout(() => {
            hideLoading();
            alert('로딩이 완료되었습니다.');
        }, 2000); // Simulate a loading time of 2 seconds
    }

    return (
        <div className="adm--l-body">
            <div className="adm--l-header">
                <h1>Template Page</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                <AdmButton size="large" onClick={() => setShowTest01(true)}>카테고리 정렬 버튼</AdmButton>
                <AdmButton size="large" onClick={showTest02}>팝업 버튼</AdmButton>
                <AdmButton size="large" onClick={showTest03}>로딩</AdmButton>
            </div>
            <div>
                <br />
                <br />

                !!!!  cagegory test data !!!!
                <br />
                {test01Data.map((item: any) => (
                    <div key={item.id}>
                        <strong>{item.title}</strong>: {item.description}
                    </div>
                ))}
            </div>

            {showTest01 && (
                <AdmCategoryPopup
                // data={test01Data} // Data for the popup, should be set when opening the popup)
                // status={'success'} // Set the initial status of the popup
                // close={() => setShowTest01(false)} // Function to close the popup
                // handleSave={handleSave}
                />
            )}
        </div>
    );
}
export default TemplatePage;