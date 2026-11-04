import { createElement } from 'react'
import * as lineIcons from '../icons/line'
import * as fillIcons from '../icons/fill'

const iconEntries = [
  ...Object.entries(lineIcons).map(([name, Icon]) => ({ name, Icon, group: 'Line' })),
  ...Object.entries(fillIcons).map(([name, Icon]) => ({ name, Icon, group: 'Fill' })),
]

export const iconControl = {
  control: {
    type: 'select' as const,
    labels: {
      none: 'None',
      ...Object.fromEntries(iconEntries.map(({ name, group }) => [name, `${group} / ${name}`])),
    },
  },
  options: ['none', ...iconEntries.map(({ name }) => name)],
  mapping: {
    none: undefined,
    ...Object.fromEntries(iconEntries.map(({ name, Icon }) => [name, createElement(Icon)])),
  },
}

