"use client";

import { adminStyles } from '@/app/admin/assets/styleConstants';
import { CSSProperties, FC, useState } from 'react';
import { basicThemeColors } from '../../assets/theme';

type AdmButtonProps = {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  color?:
  | 'primaryFill'
  | 'secondaryFill'
  | 'danger'
  | 'success'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'primaryBorder'
  | 'gray500Fill'
  | 'tertiaryFill';
  onClick?: (event: any) => void;
  children?: React.ReactNode | string;
  style?: CSSProperties;
  icon?: React.ReactNode;
  disabled?: boolean;
};
const AdmButton: FC<AdmButtonProps> = ({
  size = 'medium',
  color = 'primaryFill',
  onClick,
  children = '',
  style,
  disabled = false,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    button: {
      pointerEvents: color === 'disabled' ? 'none' : 'auto',
      cursor: color === 'disabled' ? 'default' : 'pointer',
      fontWeight: '500',
      border:
        `1px solid ${color === 'primaryFill' || color === 'primaryBorder'
          ? basicThemeColors.primary.primary
          : color === 'secondaryFill'
            ? basicThemeColors.gray500
            : color === 'danger'
              ? basicThemeColors.error
              : color === 'success'
                ? basicThemeColors.success
                : color === 'primary'
                  ? basicThemeColors.primary.primary
                  : color === 'secondary'
                    ? basicThemeColors.white
                    : color === 'gray500Fill'
                      ? basicThemeColors.gray500
                      : color === 'tertiaryFill'
                        ? basicThemeColors.gray800
                        : '#FFFFFF'
        }`,
      backgroundColor:
        color === 'primaryFill'
          ? basicThemeColors.primary.primary
          : color === 'secondaryFill'
            ? basicThemeColors.gray500
            : color === 'danger'
              ? basicThemeColors.error
              : color === 'success'
                ? basicThemeColors.success
                : color === 'primary'
                  ? basicThemeColors.white
                  : color === 'secondary'
                    ? basicThemeColors.white
                    : color === 'gray500Fill'
                      ? basicThemeColors.gray500
                      : color === 'tertiaryFill'
                        ? basicThemeColors.gray800
                        : '#FFFFFF',
      color:
        color === 'primaryFill' || color === 'secondaryFill' || color === 'danger' || color === 'tertiaryFill' || color === 'gray500Fill'
          ? '#FFFFFF'
          : color === 'primaryBorder' || color === 'primary'
            ? basicThemeColors.primary.primary
            : '#000000',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // width: size,
      minWidth:
        size === 'xxlarge'
          ? adminStyles.buttonSize.width.xxlarge
          : size === 'xlarge'
            ? adminStyles.buttonSize.width.xlarge
            : size === 'large'
              ? adminStyles.buttonSize.width.large
              : size === 'medium'
                ? adminStyles.buttonSize.width.medium
                : size === 'small'
                  ? adminStyles.buttonSize.width.small
                  : 'auto',
      // maxWidth:
      //   size === 'xlarge'
      //     ? adminStyles.buttonSize.width.xlarge
      //     : size === 'large'
      //       ? adminStyles.buttonSize.width.large
      //       : size === 'medium'
      //         ? adminStyles.buttonSize.width.medium
      //         : size === 'small'
      //           ? adminStyles.buttonSize.width.small
      //           : 'auto',
      height:
        size === 'xxlarge'
          ? adminStyles.buttonSize.height.xxlarge
          : size === 'xlarge'
            ? adminStyles.buttonSize.height.xlarge
            : size === 'large'
              ? adminStyles.buttonSize.height.large
              : size === 'medium'
                ? adminStyles.buttonSize.height.medium
                : size === 'small'
                  ? adminStyles.buttonSize.height.small
                  : 'auto',
      borderRadius:
        size === 'xxlarge'
          ? adminStyles.buttonSize.borderRadius.xxlarge
          : size === 'xlarge'
            ? adminStyles.buttonSize.borderRadius.xlarge
            : size === 'large'
              ? adminStyles.buttonSize.borderRadius.large
              : size === 'medium'
                ? adminStyles.buttonSize.borderRadius.medium
                : size === 'small'
                  ? adminStyles.buttonSize.borderRadius.small
                  : '0px',
      fontSize:
        size === 'xxlarge'
          ? adminStyles.buttonSize.fontSize.xxlarge
          : size === 'xlarge'
            ? adminStyles.buttonSize.fontSize.xlarge
            : size === 'large'
              ? adminStyles.buttonSize.fontSize.large
              : size === 'medium'
                ? adminStyles.buttonSize.fontSize.medium
                : size === 'small'
                  ? adminStyles.buttonSize.fontSize.small
                  : '14px',
    },
  };

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
      style={{ ...styles.button, ...style, ...(disabled ? { outline: 'none' } : focusStyle) }}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      {children}
    </button>
  );
};

export default AdmButton;
