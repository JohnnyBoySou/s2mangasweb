'use client';
import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  mask?: 'CPF' | 'PHONE' | 'CEP' | 'NASCIMENTO';
  pass?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, setValue, label, mask, pass = false, type = 'text', ...props }, ref) => {
    const [focus, setFocus] = useState(false);
    const [secure, setSecure] = useState(pass);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { maskFunction, maxLength } = getMaskFunction(mask);
      let val = maskFunction(e.target.value);
      if (maxLength && val.length > maxLength) val = val.slice(0, maxLength);
      setValue(val);
    };

    const inputStyle: React.CSSProperties = {
      width: '90%',
      padding: '12px 16px',
      fontSize: 18,
      color: '#fff',
      backgroundColor: 'transparent',
      border: `2px solid ${focus ? '#fff' : '#303030'}`,
      borderRadius: 6,
      outline: 'none',
      fontFamily: 'inherit',
      caretColor: '#fff',
      transition: 'border-color 0.3s ease',
    };

    const placeholderStyle: React.CSSProperties = {
      color: focus ? '#ffffff90' : '#ffffff60',
    };

    const iconButtonStyle: React.CSSProperties = {
      position: 'absolute',
      right: 20,
      top: '50%',
      background: "red",
      transform: 'translateY(-50%)',
      border: 'none',
      cursor: 'pointer',
      padding: 8,
    };

    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
    };

    return (
      <div style={wrapperStyle}>
        <input
          {...props}
          ref={ref}
          type={secure ? 'password' : type}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={label}
          style={{ ...inputStyle, ...placeholderStyle }}
        />
        {pass && (
          <button type="button" onClick={() => setSecure(!secure)} style={iconButtonStyle}>
            {secure ? <Eye size={20} color="#F1F1F1" /> : <EyeOff size={20} color="#D1D1D1" />}
          </button>
        )}
      </div>
    );
  }
);

export default Input;

function getMaskFunction(mask?: string) {
    switch (mask) {
      case 'CPF':
        return { maskFunction: applyCpfMask, maxLength: 14 };
      case 'PHONE':
        return { maskFunction: applyPhoneMask, maxLength: 16 };
      case 'CEP':
        return { maskFunction: applyCepMask, maxLength: 9 };
      case 'NASCIMENTO':
        return { maskFunction: applyBirthdateMask, maxLength: 10 };
      default:
        return { maskFunction: (text: string) => text, maxLength: undefined };
    }
  }
  
  function applyCpfMask(value: string): string {
    return value.replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  function applyCepMask(value: string): string {
    return value.replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  
  function applyPhoneMask(value: string): string {
    return value.replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  
  function applyBirthdateMask(value: string): string {
    return value.replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  }
  