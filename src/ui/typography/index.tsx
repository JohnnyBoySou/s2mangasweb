import React, { ReactNode } from 'react';

interface StyleProps {
  size?: number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  mh?: number;
  mv?: number;
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
  fontFamily?: string;
  spacing?: number;
  style?: React.CSSProperties;
  line?: number;
}

interface TextComponentProps extends StyleProps {
  children: ReactNode;
}

const getStyle = ({
  size = 16,
  align = 'left',
  color = '#000',
  mh,
  mv,
  mb,
  mt,
  mr,
  ml,
  fontFamily = 'Book',
  spacing = 0,
  line,
  style = {},
}: StyleProps): React.CSSProperties => {
  const marginStyle =
    mh !== undefined || mv !== undefined
      ? {
          margin: `${mv ?? 0}px ${mh ?? 0}px`,
        }
      : {
          marginBottom: mb,
          marginTop: mt,
          marginRight: mr,
          marginLeft: ml,
        };

  return {
    fontSize: size,
    textAlign: align,
    color,
    lineHeight: line ?? size * 1.4,
    letterSpacing: spacing,
    fontFamily,
    ...marginStyle,
    ...style,
  };
};

export const HeadTitle = (props: TextComponentProps) => {
  return (
    <h1
      style={getStyle({ ...props })}
      aria-label={props.children?.toString()}
    >
      {props?.children}
    </h1>
  );
};

export const Title = (props: TextComponentProps) => {
  return (
    <h2
      style={getStyle({ ...props })}
      aria-label={props.children?.toString()}
    >
      {props?.children}
    </h2>
  );
};

export const Label = (props: TextComponentProps) => {
  return (
    <span
      style={getStyle({ ...props })}
      aria-label={props.children?.toString()}
    >
      {props.children}
    </span>
  );
};

export const SubLabel = (props: TextComponentProps) => {
  return (
    <span
      style={getStyle({ ...props })}
      aria-label={props.children?.toString()}
    >
      {props.children}
    </span>
  );
};

export const Description = (props: TextComponentProps) => {
  return (
    <p
      style={getStyle({ ...props })}
      aria-label={props.children?.toString()}
    >
      {props.children}
    </p>
  );
};

export const U = ({ children }: { children: ReactNode }) => {
  return (
    <span style={{ textDecoration: 'underline' }}>
      {children}
    </span>
  );
};
