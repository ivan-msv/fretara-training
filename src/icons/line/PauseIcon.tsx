import type { SVGProps } from 'react'

/** Icon/ Line/ pause — Figma 4556:2303. */
export function PauseIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M8.83008 20.1523C9.29883 20.1523 9.66992 19.791 9.66992 19.332V4.81055C9.66992 4.35156 9.29883 4 8.83008 4C8.37109 4 8 4.35156 8 4.81055V19.332C8 19.791 8.37109 20.1523 8.83008 20.1523ZM15.2852 20.1523C15.7441 20.1523 16.125 19.791 16.125 19.332V4.81055C16.125 4.35156 15.7441 4 15.2852 4C14.8262 4 14.4551 4.35156 14.4551 4.81055V19.332C14.4551 19.791 14.8262 20.1523 15.2852 20.1523Z" fill="currentColor"/>
    </svg>
  )
}
