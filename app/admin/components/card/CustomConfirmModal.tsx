import { Dispatch, ReactNode, SetStateAction } from "react";
import ReactModal from "react-modal";

interface Props {
    title: ReactNode,
    content: ReactNode,
    onConfirm: () => void,
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>,
}

const CustomConfirmModal = ({ title, content, onConfirm, modalIsOpen, setModalIsOpen, }: Props) => {

    const closeHandler = () => {
        setModalIsOpen(false);
    }

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeHandler}
            ariaHideApp={false}
            style={{ content: { top: "50%", left: "50%", right: "auto", bottom: "auto", marginRight: "-50%", transform: "translate(-50%, -50%)", width: "330px", borderRadius: "12px" } }} >

            <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
                <div style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
                    {title}
                </div>
                <div style={{ marginBottom: "24px", fontSize: "14px", textAlign: "center", color: "#7D828C" }}>
                    {content}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                    <button style={{ height: "56px", width: "113px", color: "#ADAAC7", border: "solid 1px #ADAAC7", borderRadius: "12px", backgroundColor: "#fff" }} onClick={closeHandler}>
                        취소
                    </button>
                    <button style={{ height: "56px", width: "113px", color: "#fff", border: "solid 1px #ADAAC7", borderRadius: "12px", backgroundColor: "#ADAAC7" }} onClick={onConfirm}>
                        확인
                    </button>
                </div>
            </div>

        </ReactModal>
    )
}

export default CustomConfirmModal;