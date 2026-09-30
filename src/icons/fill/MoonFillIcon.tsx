import type { SVGProps } from 'react'

/** Icon/ Fill/ moon.fill — Figma 4556:2202. */
export function MoonFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M17.1074 15.1055C11.8242 15.1055 8.44531 11.7949 8.44531 6.50196C8.44531 5.29102 8.70898 3.81641 9.06055 3.00586C9.14844 2.78125 9.16797 2.63477 9.16797 2.54688C9.16797 2.29297 8.97266 2 8.58203 2C8.47461 2 8.24023 2.01953 8.01562 2.10742C4.42188 3.54297 2 7.33204 2 11.2969C2 16.873 6.52148 21.3945 12.0977 21.3945C16.3066 21.3945 19.832 18.8457 21.0723 15.6816C21.1602 15.4473 21.1797 15.2031 21.1797 15.1152C21.1797 14.7441 20.8867 14.5097 20.6133 14.5097C20.4863 14.5097 20.3789 14.539 20.1934 14.5976C19.4316 14.8418 18.3086 15.1055 17.1074 15.1055Z" fill="currentColor"/>
    </svg>
  )
}
