import { render } from '@testing-library/react';
import Skeleton from './skeleton';

describe('Componente Skeleton', () => {
  it('deve renderizar com estilos padrão', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle('width: 200px');
    expect(skeleton).toHaveStyle('height: 200px');
    expect(skeleton).toHaveStyle('border-radius: 12px');
    expect(skeleton).toHaveStyle('margin-right: 0px');
    expect(skeleton).toHaveStyle('margin-left: 0px');
    expect(skeleton).toHaveStyle('margin-top: 0px');
    expect(skeleton).toHaveStyle('margin-bottom: 0px');
  });

  it('deve aplicar largura e altura personalizadas', () => {
    const { container } = render(<Skeleton width={300} height={150} />);
    const skeleton = container.firstChild;

    expect(skeleton).toHaveStyle('width: 300px');
    expect(skeleton).toHaveStyle('height: 150px');
  });

  it('deve aplicar margens e borda arredondada personalizadas', () => {
    const { container } = render(<Skeleton right={10} left={20} top={30} bottom={40} radius={20} />);
    const skeleton = container.firstChild;

    expect(skeleton).toHaveStyle('margin-right: 10px');
    expect(skeleton).toHaveStyle('margin-left: 20px');
    expect(skeleton).toHaveStyle('margin-top: 30px');
    expect(skeleton).toHaveStyle('margin-bottom: 40px');
    expect(skeleton).toHaveStyle('border-radius: 20px');
  });
});
