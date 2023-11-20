import NextLink from 'next/link'
import NextImage from 'next/image'

import * as RadixPopover from '@radix-ui/react-popover'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import * as RadixAccordion from '@radix-ui/react-accordion'
import * as RadixCollapsible from '@radix-ui/react-collapsible'
import * as RadixSelect from '@radix-ui/react-select'
import * as RadixSwitch from '@radix-ui/react-switch'

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
  Anchor: styled(RadixPopover.Anchor),
  Arrow: styled(RadixPopover.Arrow),
  Close: styled(RadixPopover.Close),
  Content: styled(RadixPopover.Content),
  Portal: styled(RadixPopover.Portal),
  Root: styled(RadixPopover.Root),
  Trigger: styled(RadixPopover.Trigger),
}

export const DropdownMenu = {
  Content: styled(RadixDropdownMenu.Content),
  Group: styled(RadixDropdownMenu.Group),
  Item: styled(RadixDropdownMenu.Item),
  ItemIndicator: styled(RadixDropdownMenu.ItemIndicator),
  Label: styled(RadixDropdownMenu.Label),
  Portal: styled(RadixDropdownMenu.Portal),
  RadioGroup: styled(RadixDropdownMenu.RadioGroup),
  RadioItem: styled(RadixDropdownMenu.RadioItem),
  Root: styled(RadixDropdownMenu.Root),
  Separator: styled(RadixDropdownMenu.Separator),
  Sub: styled(RadixDropdownMenu.Sub),
  SubContent: styled(RadixDropdownMenu.SubContent),
  SubTrigger: styled(RadixDropdownMenu.SubTrigger),
  Trigger: styled(RadixDropdownMenu.Trigger),
}

export const Accordion = {
  Content: styled(RadixAccordion.Content),
  Header: styled(RadixAccordion.Header),
  Item: styled(RadixAccordion.Item),
  Root: styled(RadixAccordion.Root),
  Trigger: styled(RadixAccordion.Trigger),
}

export const Collapsible = {
  Content: styled(RadixCollapsible.Content),
  Root: styled(RadixCollapsible.Root),
  Trigger: styled(RadixCollapsible.Trigger),
}

// export const Select = {
//   Arrow: styled(RadixSelect.Arrow),
//   Content: styled(RadixSelect.Content),
//   Group: styled(RadixSelect.Group),
//   Icon: styled(RadixSelect.Icon),
//   Item: styled(RadixSelect.Item),
//   ItemIndicator: styled(RadixSelect.ItemIndicator),
//   ItemText: styled(RadixSelect.ItemText),
//   Label: styled(RadixSelect.Label),
//   Portal: styled(RadixSelect.Portal),
//   Root: styled(RadixSelect.Root),
//   ScrollDownButton: styled(RadixSelect.ScrollDownButton),
//   ScrollUpButton: styled(RadixSelect.ScrollUpButton),
//   Separator: styled(RadixSelect.Separator),
//   Trigger: styled(RadixSelect.Trigger),
//   Value: styled(RadixSelect.Value),
//   Viewport: styled(RadixSelect.Viewport),
// }

export const Switch = {
  Root: styled(RadixSwitch.Root),
  Thumb: styled(RadixSwitch.Thumb),
}

// section #########################################################################################
//  EXPORT
// #################################################################################################

const Primitive = {
  Accordion,
  Article,
  Aside,
  Button,
  Collapsible,
  Div,
  DropdownMenu,
  Footer,
  Form,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Header,
  Image,
  Input,
  Label,
  Li,
  Link,
  Main,
  Nav,
  Option,
  P,
  Popover,
  RouteLink,
  Section,
  Select,
  Span,
  Switch,
  Textarea,
  Ul,
}

export default Primitive
