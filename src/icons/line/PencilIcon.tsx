import type { SVGProps } from 'react'

/** Icon/ Line/ pencil — Figma 4556:2283. */
export function PencilIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M6.66795 18.6297L17.3222 7.98518L15.6133 6.26643L4.9492 16.911L4.02147 19.0887C3.92381 19.3231 4.17772 19.5965 4.41209 19.4988L6.66795 18.6297ZM18.1816 7.14534L19.168 6.17854C19.666 5.68049 19.6953 5.14339 19.2461 4.69416L18.914 4.36213C18.4746 3.92268 17.9375 3.96174 17.4394 4.45002L16.4531 5.42659L18.1816 7.14534Z" fill="currentColor"/>
    </svg>
  )
}
