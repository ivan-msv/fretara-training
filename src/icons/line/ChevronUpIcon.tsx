import type { SVGProps } from 'react'

/** Icon/ Line/ chevron.up — Figma 4556:2269. */
export function ChevronUpIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      role={props['aria-label'] || props['aria-labelledby'] ? 'img' : undefined}
      {...props}
    >
      {children}
      <path fillRule="evenodd" clipRule="evenodd" d="M5.32372 15.7289C4.89209 15.2973 4.89209 14.5975 5.32372 14.1659L11.2185 8.2711C11.6502 7.83946 12.3499 7.83946 12.7815 8.2711L18.6763 14.1659C19.1079 14.5975 19.1079 15.2973 18.6763 15.7289C18.2446 16.1605 17.5449 16.1605 17.1133 15.7289L12 10.6157L6.8868 15.7289C6.45518 16.1605 5.75535 16.1605 5.32372 15.7289Z" fill="currentColor"/>
    </svg>
  )
}
