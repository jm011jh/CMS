import { basicThemeColors } from '@/app/admin/assets/theme';
import { CSSProperties, FC, useState } from 'react';
import { adminStyles } from '../../assets/styleConstants';

type AdmViewNavButtonProps = {
  onClick?: (event: any) => void;
  children?: React.ReactNode | string;
  status?: 'primary' | 'secondary' | 'disable' | 'secondaryBlack' | 'border' | 'error';
  className?: string;
  style?: React.CSSProperties;
  size?: 'xlarge' | 'large' | 'medium' | 'small';
  disabled?: boolean;
};
const statusStyles: { [key: string]: CSSProperties } = {
  primary: {
    background: basicThemeColors.primary.primary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: basicThemeColors.primary.primary,
    color: '#FFFFFF',
  },
  secondary: {
    background: basicThemeColors.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: basicThemeColors.primary.primary,
    color: basicThemeColors.primary.primary,
  },
  secondaryBlack: {
    background: basicThemeColors.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: basicThemeColors.primary.primary,
    color: basicThemeColors.primary.primary,
  },
  disable: {
    background: '#D1D5DB',
    color: '#9CA3AF',
  },
  border: {
    background: basicThemeColors.white,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: basicThemeColors.gray300,
    color: basicThemeColors.gray500,
  },
  error: {
    background: basicThemeColors.error,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: basicThemeColors.error,
    color: '#FFFFFF',
  },
};
const buttonSizeStyles: { [key: string]: CSSProperties } = {
  xlarge: {
    width: adminStyles.buttonSize.width.xlarge,
    height: adminStyles.buttonSize.height.xlarge,
    fontSize: adminStyles.buttonSize.fontSize.xlarge,
    borderRadius: adminStyles.buttonSize.borderRadius.xlarge,
  },
  large: {
    width: adminStyles.buttonSize.width.large,
    height: adminStyles.buttonSize.height.large,
    fontSize: adminStyles.buttonSize.fontSize.large,
    borderRadius: adminStyles.buttonSize.borderRadius.large,
  },
  medium: {
    width: adminStyles.buttonSize.width.medium,
    height: adminStyles.buttonSize.height.medium,
    fontSize: adminStyles.buttonSize.fontSize.medium,
    borderRadius: adminStyles.buttonSize.borderRadius.medium,
  },
  small: {
    width: adminStyles.buttonSize.width.small,
    height: adminStyles.buttonSize.height.small,
    fontSize: adminStyles.buttonSize.fontSize.small,
    borderRadius: adminStyles.buttonSize.borderRadius.small,
  },
}
const AdmViewNavButton: FC<AdmViewNavButtonProps> = ({
  onClick,
  children,
  status = 'primary',
  className,
  size = 'medium',
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
  };

  const focusStyle: CSSProperties = isFocused
    ? {
      outline: `2px solid ${basicThemeColors.info}`,
      outlineOffset: '2px',
    }
    : {
      outline: 'none',
    };
  return (
    <button
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={onClick}
      className={className ? className : ''}
      style={{ ...statusStyles[status], ...buttonSizeStyles[size], ...(disabled ? { outline: 'none' } : focusStyle) }}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      {children}
    </button>
  );
};
export default AdmViewNavButton;
