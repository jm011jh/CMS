import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import { useRouter } from 'next/navigation';
import { CSSProperties, FC, FormEvent } from 'react';
import { basicThemeColors } from '../../assets/theme';
import AdmViewNavButton from './AdmButtonPrimary';
import { AdmComponentPropsType } from './type';

const styles: { [key: string]: CSSProperties } = {
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: `40px`,
    marginTop: '8px',
    gap: '16px',
  },
  barR: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: `40px`,
    gap: '16px',
  },
  dltButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0px solid #000',
    minWidth: '80px',
    height: '24px',
    color: '#fff',
    fontWeight: 600,
    fontSize: '12px',
    backgroundColor: basicThemeColors.gray500,
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export { styles };

type AdmViewNavBarProps = AdmComponentPropsType & {
  mode: 'edit' | 'save' | 'view';
  save?: (event: FormEvent) => Promise<void> | void;
  edit?: (event: FormEvent) => Promise<void> | void;
  onDelete?: () => void;
  saveTitle?: string;
  editTitle?: string | undefined;
  deleteTitle?: string;
  onCancelConfirm?: () => void; // 취소 확인 액션을 받는 함수,
  onGoBack?: () => void;
};
const AdmViewNavBar: FC<AdmViewNavBarProps> = ({
  className,
  mode,
  save,
  edit,
  onDelete,
  saveTitle,
  editTitle,
  deleteTitle,
  onCancelConfirm,
  onGoBack,
}) => {
  const router = useRouter();
  const { showPopup } = useConfirmPopupStore(); // 스토어에서 showPopup 액션 가져오기
  const handleCancelClick = () => {
    showPopup({
      onConfirm: () => {
        // 팝업에서 "확인"을 눌렀을 때의 동작
        if (onCancelConfirm) {
          onCancelConfirm();
        } else {
          // console.log('취소 확인 액션이 정의되지 않았습니다.');
          // 기본 동작으로 뒤로가기 등을 고려할 수 있으나, 명시적으로 받는 것이 좋음
        }
      },
      onCancel: () => {
        // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
        // console.log('팝업에서 취소가 선택되었습니다.');
      }
    });
  };
  const handleGoBackClick = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };
  return (
    <div style={styles.bar} className={'' + className ? className : ''}>
      <div style={styles.barL}>
        {
          onDelete &&
          <div style={styles.dltButton} onClick={onDelete}>{deleteTitle || '게시글 삭제'}</div>
        }
      </div>
      <div style={styles.barR}>
        {
          onCancelConfirm &&
          <AdmViewNavButton status={'secondary'} onClick={handleCancelClick} size={'large'}>
            취소
          </AdmViewNavButton>
        }
        {mode == 'edit' && (
          <AdmViewNavButton status={'primary'} onClick={edit} size={'large'}>
            {editTitle || '수정'}
          </AdmViewNavButton>
        )}
        {mode == 'save' && (
          <AdmViewNavButton status={'primary'} onClick={save} size={'large'}>
            {saveTitle || '저장'}
          </AdmViewNavButton>
        )}
        {mode == 'view' && (
          <AdmViewNavButton status={'primary'} onClick={handleGoBackClick} size={'large'}>
            목록
          </AdmViewNavButton>
        )}
      </div>
    </div>
  );
};

export default AdmViewNavBar;
