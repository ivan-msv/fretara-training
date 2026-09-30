import type { SVGProps } from 'react'

/** Icon/ Line/info circle — Figma 4870:26362. */
export function InfoCircleIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M12 2.25C17.3851 2.25 21.75 6.61487 21.75 12C21.75 17.3841 17.3852 21.75 12 21.75C6.61481 21.75 2.25 17.3841 2.25 12C2.25 6.61487 6.61487 2.25 12 2.25ZM12 3.75C7.44329 3.75 3.75 7.44329 3.75 12C3.75 16.5558 7.44335 20.25 12 20.25C16.5567 20.25 20.25 16.5558 20.25 12C20.25 7.44329 16.5567 3.75 12 3.75ZM12.0059 10.6436C12.42 10.6436 12.7558 10.9794 12.7559 11.3936V15.6934C12.7558 16.1074 12.4199 16.4433 12.0059 16.4434C11.5917 16.4434 11.2559 16.1075 11.2559 15.6934V11.3936C11.2559 10.9794 11.5917 10.6436 12.0059 10.6436ZM12 7.54102C12.4142 7.54102 12.75 7.8768 12.75 8.29102V8.35449C12.7499 8.76859 12.4141 9.10449 12 9.10449C11.5859 9.10449 11.2501 8.76859 11.25 8.35449V8.29102C11.25 7.8768 11.5858 7.54102 12 7.54102Z" fill="currentColor"/>
    </svg>
  )
}
