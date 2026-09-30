import type { SVGProps } from 'react'

/** Icon/ Line/ xmark close — Figma 4556:2237. */
export function XmarkCloseIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M5.27228 18.7306C5.63004 19.0988 6.25085 19.0883 6.60861 18.7306L11.996 13.3326L17.394 18.7306C17.7517 19.0883 18.362 19.0988 18.7199 18.7306C19.0986 18.3623 19.0881 17.752 18.7199 17.3942L13.3324 11.9962L18.7199 6.60879C19.0881 6.25104 19.0986 5.63022 18.7199 5.27246C18.362 4.90418 17.7517 4.9147 17.394 5.27246L11.996 10.6704L6.60861 5.27246C6.25085 4.9147 5.63004 4.90418 5.27228 5.27246C4.904 5.63022 4.91452 6.25104 5.27228 6.60879L10.6702 11.9962L5.27228 17.3942C4.91452 17.752 4.904 18.3623 5.27228 18.7306Z" fill="currentColor"/>
    </svg>
  )
}
