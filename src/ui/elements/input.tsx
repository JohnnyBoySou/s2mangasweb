"use client";
import React, { useState, forwardRef } from "react";
import { Row, Column } from "../layout";
import { Label } from "../typography";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  placeholder?: string;
  mask?: "PHONE" | "NASCIMENTO";
  pass?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, setValue, label, mask, pass = false, type = "text", ...props },
    ref
  ) => {
    const [focus, setFocus] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { maskFunction, maxLength } = getMaskFunction(mask);
      let val = maskFunction(e.target.value);
      if (maxLength && val.length > maxLength) val = val.slice(0, maxLength);
      setValue(val);
    };

    const inputStyle: React.CSSProperties = {
      padding: "12px 6px",
      fontSize: 18,
      backgroundColor: "transparent",
      border: "none",
      borderBottom: `2px solid ${focus ? "#fff" : "#505050"}`,
      borderRadius: 0,
      outline: "none",
      fontFamily: "inherit",
      fontWeight: 400,
      caretColor: "#fff",
      transition: "border-color 0.3s ease",
    };

    const placeholderStyle: React.CSSProperties = {
      color: focus ? "#ffffff" : "#ffffff90",
    };

    return (
      <Column>
        {label && (
          <Label style={{ color: "#ffffff", fontSize: 16, marginBottom: 6, }}>{label}</Label>
        )}
          <input
            {...props}
            ref={ref}
            type={pass ? "password" : type}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="circular"
            placeholder={label}
            style={{ ...inputStyle, ...placeholderStyle }}
          />
      </Column>
    );
  }
);

export default Input;

function getMaskFunction(mask?: string) {
  switch (mask) {
    case "PHONE":
      return { maskFunction: applyPhoneMask, maxLength: 16 };
    case "NASCIMENTO":
      return { maskFunction: applyBirthdateMask, maxLength: 10 };
    default:
      return { maskFunction: (text: string) => text, maxLength: undefined };
  }
}

function applyPhoneMask(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function applyBirthdateMask(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}
