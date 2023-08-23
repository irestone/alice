import { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'

import { CSS, styled } from './config'
export { styled } from './config'

// Types
export type SFC<T = {}> = FC<{ css?: CSS; children?: ReactNode } & T>

// Generic
export const Component = styled('div')
export const Div = styled('div')
export const Span = styled('span')

// Structure
export const Main = styled('main')
export const Header = styled('header')
export const Footer = styled('footer')
export const Article = styled('article')
export const Aside = styled('aside')
export const Nav = styled('nav')
export const List = styled('ul')
export const Item = styled('li')

// Typography
export const Heading1 = styled('h1')
export const Heading2 = styled('h2')
export const Heading3 = styled('h3')
export const Heading4 = styled('h4')
export const Heading5 = styled('h5')
export const Heading6 = styled('h6')
export const Paragraph = styled('p')

// Iteraction/Form
export const Button = styled('button')
export const Input = styled('input')
export const Textarea = styled('textarea')
export const Link = styled('a')
export const RouteLink = styled(NextLink)

// Assets
export const Image = styled(NextImage)

// todo: component([tag, styles] | FC) => FC
/**
 * const Component = component(Div, { background: 'white' })
 *
 * const Component = component<{ prop: tProp }>(({ css, children, prop }) => {
 *  return (
 *    <Div css={{ position: 'fixed', top: 0 }} prop={prop} >
 *      <Div css={{ background: 'white', ...css }}>{children}</Div>
 *    </Div>
 * )
 * })
 *
 * Aliases: 'c'
 * const Navigation = c(Nav, { ... })
 * const Tabs = c<{ tabs: tTab[] }>(({ css, children, tabs }) => (...))
 *
 */
