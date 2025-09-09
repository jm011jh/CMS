import { ClipLoader } from "react-spinners";
import useLoadingScreenStore from "../../store/loadingScreenStore";
import styles from "./LoadingScreen.module.css";

interface Props {
    modalIsOpen: boolean
}

// const LoadingScreen = ({ modalIsOpen }: Props) => {
const LoadingScreen = () => {

    const { isLoading } = useLoadingScreenStore();

    return (
        isLoading ?
            <div className={styles.screen}>
                <ClipLoader
                    color={'#fff'}
                    loading={true}
                    cssOverride={{}}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            :
            <></>

    )
}

export default LoadingScreen;