import { Dispatch, SetStateAction } from "react";
import ReactModal from "react-modal";
import styles from "./GuideModal.module.css";

interface Props {
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>,
    fileUrl: string
}

const GuideModal = ({ modalIsOpen, setModalIsOpen, fileUrl }: Props) => {

    const closeHandler = () => {
        setModalIsOpen(false);
    }

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeHandler}
            style={{ content: { top: "50%", left: "50%", right: "auto", bottom: "auto", marginRight: "-50%", transform: "translate(-50%, -50%)", width: "276px", borderRadius: "12px" } }} >

            <div className={styles.root}>
                <div className={styles.title}>회원등록 가이드 <img className={styles.closeBtn} src="/image/icon_close.png" onClick={closeHandler} alt="" /></div>
                <div className={styles.content}>
                    등록이 처음이세요?<br /><br />
                    <span className={styles.contentSuccess}>회원등록 신청 및 작성기준</span> 안내를<br />
                    다운로드받아 확인해보세요!
                </div>

                <a className={`btn primary medium radius ${styles.button}`} href={fileUrl}>다운로드</a>

            </div>

        </ReactModal>
    )
}

export default GuideModal;