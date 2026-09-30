import type { SVGProps } from 'react'
import medals from '../assets/medals.png'

/** Icon/ Fill/ Bronze — Figma 4633:9240. */
export function BronzeFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <svg x="5.696037769317627" y="2" width="12.941176414489746" height="20" viewBox="0 0 12.941176414489746 20" overflow="hidden">
        <image href={medals} x="-34.909528992359995" y="-26.635293879419883" width="49.08060980902778" height="72.28235034602085" preserveAspectRatio="none" />
      </svg>
    </svg>
  )
}
