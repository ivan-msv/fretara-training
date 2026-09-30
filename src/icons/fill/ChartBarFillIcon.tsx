import type { SVGProps } from 'react'

/** Icon/ Fill/ chart.bar.fill — Figma 4556:2173. */
export function ChartBarFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M6.01953 9.32922C7.11753 9.32937 7.68262 9.86296 7.68262 10.9054V18.004C7.68262 19.0465 7.11753 19.5722 6.01953 19.5724H3.65527C2.56501 19.5724 2 19.0466 2 18.004V10.9054C2 9.86285 2.56501 9.32926 3.65527 9.32922H6.01953ZM13.1826 7.01379C14.2807 7.01388 14.8378 7.54666 14.8379 8.58899V18.004C14.8379 19.0465 14.2808 19.5723 13.1826 19.5724H10.8105C9.72031 19.5724 9.15527 19.0466 9.15527 18.004V8.58899C9.15536 7.5466 9.7204 7.01382 10.8105 7.01379H13.1826ZM20.3369 4.68958C21.4351 4.68967 22 5.22326 22 6.26575V18.004C22 19.0465 21.4351 19.5723 20.3369 19.5724H17.9648C16.8825 19.5724 16.3174 19.0466 16.3174 18.004V6.26575C16.3174 5.2232 16.8825 4.6896 17.9648 4.68958H20.3369Z" fill="currentColor"/>
    </svg>
  )
}
