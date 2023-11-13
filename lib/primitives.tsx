import NextLink from 'next/link'
import NextImage from 'next/image'

import * as RadixPopover from '@radix-ui/react-popover'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import * as RadixAccordion from '@radix-ui/react-accordion'
import * as RadixCollapsible from '@radix-ui/react-collapsible'

import { styled } from '@common/styles'

// section #########################################################################################
//  HTML WRAPPERS
// #################################################################################################

// Generic
export const Div = styled('div')
export const Span = styled('span')

// Structure
export const Main = styled('main')
export const Header = styled('header')
export const Footer = styled('footer')
export const Article = styled('article')
export const Section = styled('section')
export const Aside = styled('aside')
export const Nav = styled('nav')
export const Ul = styled('ul')
export const Li = styled('li')

// Typography
export const H1 = styled('h1')
export const H2 = styled('h2')
export const H3 = styled('h3')
export const H4 = styled('h4')
export const H5 = styled('h5')
export const H6 = styled('h6')
export const P = styled('p')

// Form
export const Form = styled('form')
export const Input = styled('input')
export const Textarea = styled('textarea')
export const Select = styled('select')
export const Option = styled('option')
export const Button = styled('button')
export const Label = styled('label')

// Links
export const Link = styled('a')
export const RouteLink = styled(NextLink)

// Assets
export const Image = styled(NextImage)

// section #########################################################################################
//  RADIX WRAPPERS
// #################################################################################################

export const Popover = {
  Root: styled(RadixPopover.Root),
  Trigger: styled(RadixPopover.Trigger),
  Arrow: styled(RadixPopover.Arrow),
  Close: styled(RadixPopover.Close),
  Portal: styled(RadixPopover.Portal),
  Content: styled(RadixPopover.Content),
}

export const DropdownMenu = {
  Root: styled(RadixDropdownMenu.Root),
  Trigger: styled(RadixDropdownMenu.Trigger),
  Portal: styled(RadixDropdownMenu.Portal),
  Content: styled(RadixDropdownMenu.Content),
  Label: styled(RadixDropdownMenu.Label),
  Item: styled(RadixDropdownMenu.Item),
  Group: styled(RadixDropdownMenu.Group),
  ItemIndicator: styled(RadixDropdownMenu.ItemIndicator),
  RadioGroup: styled(RadixDropdownMenu.RadioGroup),
  RadioItem: styled(RadixDropdownMenu.RadioItem),
  Sub: styled(RadixDropdownMenu.Sub),
  SubTrigger: styled(RadixDropdownMenu.SubTrigger),
  SubContent: styled(RadixDropdownMenu.SubContent),
  Separator: styled(RadixDropdownMenu.Separator),
}

export const Accordion = {
  Root: styled(RadixAccordion.Root),
  Item: styled(RadixAccordion.Item),
  Header: styled(RadixAccordion.Header),
  Trigger: styled(RadixAccordion.Trigger),
  Content: styled(RadixAccordion.Content),
}

export const Collapsible = {
  Root: styled(RadixCollapsible.Root),
  Trigger: styled(RadixCollapsible.Trigger),
  Content: styled(RadixCollapsible.Content),
}

// section #########################################################################################
//  EXPORT
// #################################################################################################

const Primitive = {
  Div,
  Span,
  Main,
  Header,
  Footer,
  Article,
  Section,
  Aside,
  Nav,
  Ul,
  Li,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Form,
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Label,
  Link,
  RouteLink,
  Image,
  Popover,
  DropdownMenu,
  Accordion,
  Collapsible,
}

export default Primitive
