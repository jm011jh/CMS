import { Dispatch, ReactNode, SetStateAction } from "react";
import ReactModal from "react-modal";
import styles from "./CustomModal.module.css";

interface Props {
    title: string,
    content: ReactNode
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>,
}

const CustomModal = ({ title, content, modalIsOpen, setModalIsOpen, }: Props) => {

    const closeHandler = () => {
        setModalIsOpen(false);
    }

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeHandler}
            ariaHideApp={false}
            style={{ content: { top: "50%", left: "50%", right: "auto", bottom: "auto", marginRight: "-50%", transform: "translate(-50%, -50%)", width: "auto", borderRadius: "12px" } }} >

            <div className={styles.root}>
                <div className={styles.title}>{title} <img className={styles.closeBtn} src="/image/icon_close_black.png" onClick={closeHandler} alt="" /></div>
                <div className={styles.content}>
                    {content}
                </div>

                {/* <a className={`btn primary medium radius ${styles.button}`} href={fileUrl}>다운로드</a> */}

            </div>

        </ReactModal>
    )
}

export default CustomModal;