import { ReactNode } from 'react'
import { CSS, SFC, styled } from '@common/styles'
import { Button } from './buttons'
import { Div, H3, Header } from './primitives'

const MobileHead: SFC<{ title: string; actions?: ReactNode[]; search?: boolean }> = ({
  title,
  actions,
  search = true,
  children,
}) => {
  return (
    <Header
      css={{ pl: 16, pr: 12, bg: '$gray100', pos: 'sticky', t: 0, z: 1, pb: children ? 8 : 0 }}
    >
      <Div
        css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 53 }}
      >
        <H3 css={{ fontSize: 20, fontWeight: 500 }}>{title}</H3>
        <Div css={{ display: 'flex', gap: 8 }}>
          {actions}
          {search && <Button icon='search' colors='no_bg' size={1} />}
        </Div>
      </Div>
      <Div css={{ pr: 4 }}>{children}</Div>
    </Header>
  )
}

const MobileRoot = styled('div', { height: '100%', overflow: 'auto' })
const MobileBody = styled('div', { display: 'flex', flexDirection: 'column', gap: 8, pb: 8 })

export const Mobile = {
  Root: MobileRoot,
  Head: MobileHead,
  Body: MobileBody,
}
