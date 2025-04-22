import React from 'react';
import "./style.css"
interface ButtonProps {
  onPress?: () => void;
  variant?: 'default' | 'secondary' | 'destructive' | 'ghost' | 'link' | 'outline' | 'primary' | 'blur';
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  loading?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const IconButton: React.FC<ButtonProps> = ({
  onPress,
  variant = 'default',
  style,
  textStyle,
  loading = false,
  icon,
  disabled,
}) => {
  const baseContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 36,
    width: 36,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Circular',
    ...(variant === 'default' && { backgroundColor: '#fff', color: '#000' }),
    ...(variant === 'secondary' && { backgroundColor: '#f0f0f0', color: '#333' }),
    ...(variant === 'destructive' && { backgroundColor: '#ff4d4d', color: '#fff' }),
    ...(variant === 'ghost' && { backgroundColor: '#303030', color: '#f1f1f1' }),
    ...(variant === 'link' && { backgroundColor: 'transparent', color: '#fff', borderBottom: '1px solid #fff', }),
    ...(variant === 'outline' && {
      backgroundColor: 'transparent',
      border: '1px solid #fff',
      color: '#fff',
    }),
    ...(variant === 'primary' && { backgroundColor: '#007bff', color: '#fff' }),
    ...(variant === 'blur' && {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#fff',
    }),
    ...(disabled && { opacity: 0.5, pointerEvents: 'none' }),
    ...style,
  };

  return (
    <button
      style={baseContainerStyle}
      onClick={onPress}
      className='icon-button'
      disabled={disabled || loading}
    >
      {loading ? (
        <span style={{ fontSize: 14 }}>Carregando...</span>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      )}
    </button>
  );
};

export default IconButton;
