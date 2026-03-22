type Props = {
  svg: string;
  className?: string;
};

export function InlineSvg({ svg, className = "" }: Props) {
  return (
    <span
      className={`inline-flex max-w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:max-w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
