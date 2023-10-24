import NextLink from 'next/link'
import NextImage from 'next/image'

import * as RadixPopover from '@radix-ui/react-popover'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Accordion from '@radix-ui/react-accordion'

import { styled } from '../_styles'

// section #########################################################################################
//  HTML
// #################################################################################################

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

// Form
export const Form = styled('form')
export const Input = styled('input')
export const Textarea = styled('textarea')
export const Select = styled('select')
export const Option = styled('option')
export const Button = styled('button')

// Links
export const Link = styled('a')
export const RouteLink = styled(NextLink)

// Assets
export const Image = styled(NextImage)

// section #########################################################################################
//  RADIX
// #################################################################################################

// Popover
export const RadixPopoverRoot = styled(RadixPopover.Root)
export const RadixPopoverTrigger = styled(RadixPopover.Trigger)
export const RadixPopoverArrow = styled(RadixPopover.Arrow)
export const RadixPopoverClose = styled(RadixPopover.Close)
export const RadixPopoverPortal = styled(RadixPopover.Portal)
export const RadixPopoverContent = styled(RadixPopover.Content)

// Dropdown Menu
export const RadixDropdownMenuRoot = styled(DropdownMenu.Root)
export const RadixDropdownMenuTrigger = styled(DropdownMenu.Trigger)
export const RadixDropdownMenuPortal = styled(DropdownMenu.Portal)
export const RadixDropdownMenuContent = styled(DropdownMenu.Content)
export const RadixDropdownMenuLabel = styled(DropdownMenu.Label)
export const RadixDropdownMenuItem = styled(DropdownMenu.Item)
export const RadixDropdownMenuGroup = styled(DropdownMenu.Group)
export const RadixDropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator)
export const RadixDropdownMenuRadioGroup = styled(DropdownMenu.RadioGroup)
export const RadixDropdownMenuRadioItem = styled(DropdownMenu.RadioItem)
export const RadixDropdownMenuSub = styled(DropdownMenu.Sub)
export const RadixDropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger)
export const RadixDropdownMenuSubContent = styled(DropdownMenu.SubContent)
export const RadixDropdownMenuSeparator = styled(DropdownMenu.Separator)

// Accordion
export const RadixAccordionRoot = styled(Accordion.Root)
export const RadixAccordionItem = styled(Accordion.Item)
export const RadixAccordionHeader = styled(Accordion.Header)
export const RadixAccordionTrigger = styled(Accordion.Trigger)
export const RadixAccordionContent = styled(Accordion.Content)
