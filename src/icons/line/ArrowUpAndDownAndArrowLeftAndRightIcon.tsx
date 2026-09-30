import type { SVGProps } from 'react'

/** Icon/ Line/ arrow.up.and.down.and.arrow.left.and.right — Figma 4556:2305. */
export function ArrowUpAndDownAndArrowLeftAndRightIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M2.27891 12.6488L5.05637 15.2787C5.63789 15.8428 6.41037 15.4002 6.41037 14.6451V12.805H11.2275V17.6395H9.37878C8.63234 17.6395 8.18968 18.4033 8.74518 18.9849L11.3751 21.7623C11.7483 22.1529 12.2777 22.1355 12.6336 21.7536L15.2548 18.9849C15.819 18.4033 15.3763 17.6395 14.6212 17.6395H12.7811V12.805H17.5896V14.6451C17.5896 15.4002 18.3535 15.8428 18.9436 15.2787L21.7124 12.6575C22.0857 12.2929 22.103 11.7722 21.7211 11.3989L18.9436 8.76904C18.3535 8.21355 17.5896 8.65621 17.5896 9.40264V11.2514H12.7811V6.4082H14.6212C15.3763 6.4082 15.819 5.6444 15.2548 5.06288L12.6249 2.28542C12.2604 1.89484 11.731 1.9122 11.3664 2.2941L8.74518 5.06288C8.18968 5.6444 8.63234 6.4082 9.37878 6.4082H11.2275V11.2514H6.41037V9.40264C6.41037 8.65621 5.63789 8.21355 5.05637 8.76904L2.28759 11.3903C1.91437 11.7548 1.89701 12.2756 2.27891 12.6488Z" fill="currentColor"/>
    </svg>
  )
}
