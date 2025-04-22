import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  mh?: number;
  mv?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  ph?: number;
  pv?: number;
  gv?: number;
  gh?: number;
  className?: string;
}

  const getSpacingStyle = (props: LayoutProps): React.CSSProperties => {
    const {
      mh, mv, mt, mb, ml, mr,
      ph, pv, pt, pb, pl, pr,
    } = props;
  
    const marginStyle: React.CSSProperties = {
      ...(mt !== undefined && { marginTop: mt }),
      ...(mb !== undefined && { marginBottom: mb }),
      ...(ml !== undefined && { marginLeft: ml }),
      ...(mr !== undefined && { marginRight: mr }),
      ...(mv !== undefined && {
        marginTop: mv,
        marginBottom: mv,
      }),
      ...(mh !== undefined && {
        marginLeft: mh,
        marginRight: mh,
      }),
    };
  
    const paddingStyle: React.CSSProperties = {
      ...(pt !== undefined && { paddingTop: pt }),
      ...(pb !== undefined && { paddingBottom: pb }),
      ...(pl !== undefined && { paddingLeft: pl }),
      ...(pr !== undefined && { paddingRight: pr }),
      ...(pv !== undefined && {
        paddingTop: pv,
        paddingBottom: pv,
      }),
      ...(ph !== undefined && {
        paddingLeft: ph,
        paddingRight: ph,
      }),
    };
  
    return {
      ...marginStyle,
      ...paddingStyle,
    };
  };

const Column: React.FC<LayoutProps> = (props) => {
  const {
    children,
    style,
    justify = 'flex-start',
    align = 'stretch',
    gv,
    gh,
    className = "",
  } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justify,
        alignItems: align,
        rowGap: gv,
        columnGap: gh,
        ...getSpacingStyle(props),
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const Row: React.FC<LayoutProps> = (props) => {
  const {
    children,
    style,
    justify = 'flex-start',
    align = 'center',
    gv,
    gh,
  } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: justify,
        alignItems: align,
        rowGap: gv,
        columnGap: gh,
        ...getSpacingStyle(props),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Main: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style = {} }) => {
  return (
    <div style={{ flex: 1, overflowY: 'visible', overflowX: 'hidden', minHeight: '100vh', background: `radial-gradient(circle, #202020, #171717)`,  ...style }}>
      {children}
    </div>
  );
};

const ScrollHorizontal: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; contentContainerStyle?: React.CSSProperties }> = ({ children, style = {}, contentContainerStyle = {} }) => {
  return (
    <div style={{ overflowX: 'auto', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'row', ...contentContainerStyle }}>
        {children}
      </div>
    </div>
  );
};

const ScrollVertical: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; contentContainerStyle?: React.CSSProperties }> = ({ children, style = {}, contentContainerStyle = {} }) => {
  return (
    <div style={{ overflowY: 'auto', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', ...contentContainerStyle }}>
        {children}
      </div>
    </div>
  );
};

const Box: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style = {} }) => {
  return (
    <Column
      gv={8}
      pv={20}
      ph={16}
      style={{
        borderWidth: 0.7,
        borderStyle: 'solid',
        borderColor: '#d1d1d130',
        borderRadius: 8,
        flexGrow: 1,
        ...style,
      }}
    >
      {children}
    </Column>
  );
};

export { Column, Row, Main, ScrollHorizontal, ScrollVertical, Box };
