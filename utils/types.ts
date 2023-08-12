import { FC, ReactNode } from 'react'
import { CSS } from '@stitches/react'

// Styled Function Component
export type SFC<T = {}> = FC<{ css?: CSS; children?: ReactNode } & T>
