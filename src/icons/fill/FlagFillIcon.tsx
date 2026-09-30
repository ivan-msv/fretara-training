import type { SVGProps } from 'react'

/** Icon/ Fill/ flag.fill — Figma 4556:2185. */
export function FlagFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M5.37807 19.8378C5.72059 19.8378 5.99785 19.5688 5.99785 19.2262V14.6921C6.20173 14.6024 6.96829 14.3088 8.16707 14.3088C11.1844 14.3088 13.0764 15.7848 15.9469 15.7848C17.219 15.7848 17.692 15.6462 18.3118 15.369C18.8746 15.1161 19.2415 14.6921 19.2415 13.9418V5.66454C19.2415 5.22417 18.8664 4.97137 18.3934 4.97137C17.9938 4.97137 17.2435 5.31387 15.8408 5.31387C12.9704 5.31387 11.0865 3.83783 8.06105 3.83783C6.78889 3.83783 6.30774 3.97646 5.68797 4.25373C5.12527 4.50654 4.7583 4.93059 4.7583 5.67269V19.2262C4.7583 19.5606 5.04372 19.8378 5.37807 19.8378Z" fill="currentColor"/>
    </svg>
  )
}
