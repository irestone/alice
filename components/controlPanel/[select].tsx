// button {
//   all: 'unset',
// }

// const RxTrigger = styled(Select.Trigger, {
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: '4px',
//   padding: '0 15px',
//   fontSize: '13px',
//   lineHeight: '1',
//   height: '35px',
//   gap: '5px',
//   backgroundColor: 'white',
//   color: 'var(--violet-11)',
//   boxShadow: '0 2px 10px var(--black-a7)',
//   '&:hover': {
//     backgroundColor: 'var(--mauve-3)',
//   },

//   '&:focus': {
//     boxShadow: '0 0 0 2px black',
//   },
//   '&[data-placeholder]': {
//     color: 'var(--violet-9)',
//   },
// })

// const RxIcon = styled(Select.Icon, {
//   color: 'var(--violet-11)',
// })

// const RxContent = styled(Select.Content, {
//   overflow: 'hidden',
//   backgroundColor: 'white',
//   borderRadius: '6px',
//   boxShadow:
//     '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
// })

// const RxViewport = styled(Select.Viewport, {
//   padding: '5px',
// })

// const RxItem = styled(Select.Item, {
//   fontSize: '13px',
//   lineHeight: '1',
//   color: 'var(--violet-11)',
//   borderRadius: '3px',
//   display: 'flex',
//   alignItems: 'center',
//   height: '25px',
//   padding: '0 35px 0 25px',
//   position: 'relative',
//   userSelect: 'none',
//   '&[data-disabled]': {
//     color: 'var(--mauve-8)',
//     pointerEvents: 'none',
//   },
//   '&[data-highlighted]': {
//     outline: 'none',
//     backgroundColor: 'var(--violet-9)',
//     color: 'var(--violet-1)',
//   },
// })

// const RxItemText = styled(Select.ItemText)

// const RxLabel = styled(Select.Label, {
//   padding: '0 25px',
//   fontSize: '12px',
//   lineHeight: '25px',
//   color: 'var(--mauve-11)',
// })

// const RxSeparator = styled(Select.Separator, {
//   height: '1px',
//   backgroundColor: 'var(--violet-6)',
//   margin: '5px',
// })

// const RxItemIndicator = styled(Select.ItemIndicator, {
//   position: 'absolute',
//   left: '0',
//   width: '25px',
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// })

// const RxScrollUpButton = styled(Select.ScrollUpButton, {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '25px',
//   backgroundColor: 'white',
//   color: 'var(--violet-11)',
//   cursor: 'default',
// })

// const RxScrollDownButton = styled(Select.ScrollDownButton, {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '25px',
//   backgroundColor: 'white',
//   color: 'var(--violet-11)',
//   cursor: 'default',
// })

// const RxValue = styled(Select.Value)
// const RxPortal = styled(Select.Portal)
// const RxGroup = styled(Select.Group)

// const RxRoot = styled(Select.Root, {
//   '--violet-1': '#14121F',
//   '--violet-6': '#473876',
//   '--violet-9': '#6E56CF',
//   '--violet-11': '#BAA7FF',
//   '--mauve-3': '#232225',
//   '--mauve-8': '#625F69',
//   '--mauve-11': '#B5B2BC',
//   '--black-a7': 'rgba(0, 0, 0, 0.5)',
// })

// const SelectItem: SFC<any> = ({ children, ...props }) => {
//   return (
//     <RxItem {...props}>
//       <RxItemText>{children}</RxItemText>
//       <RxItemIndicator>
//         <CheckIcon />
//       </RxItemIndicator>
//     </RxItem>
//   )
// }

// const SelectDemo = () => (
//   <RxRoot>
//     <RxTrigger aria-label='Food'>
//       <RxValue placeholder='Select a fruit…' />
//       <RxIcon>
//         <ChevronDownIcon />
//       </RxIcon>
//     </RxTrigger>
//     <RxPortal>
//       <RxContent>
//         <RxScrollUpButton>
//           <ChevronUpIcon />
//         </RxScrollUpButton>
//         <RxViewport>
//           <RxGroup>
//             <RxLabel>Fruits</RxLabel>
//             <SelectItem value='apple'>Apple</SelectItem>
//             <SelectItem value='banana'>Banana</SelectItem>
//             <SelectItem value='blueberry'>Blueberry</SelectItem>
//             <SelectItem value='grapes'>Grapes</SelectItem>
//             <SelectItem value='pineapple'>Pineapple</SelectItem>
//           </RxGroup>

//           <RxSeparator />

//           <RxGroup>
//             <RxLabel>Vegetables</RxLabel>
//             <SelectItem value='aubergine'>Aubergine</SelectItem>
//             <SelectItem value='broccoli'>Broccoli</SelectItem>
//             <SelectItem value='carrot' disabled>
//               Carrot
//             </SelectItem>
//             <SelectItem value='courgette'>Courgette</SelectItem>
//             <SelectItem value='leek'>Leek</SelectItem>
//           </RxGroup>

//           <RxSeparator />

//           <RxGroup>
//             <RxLabel>Meat</RxLabel>
//             <SelectItem value='beef'>Beef</SelectItem>
//             <SelectItem value='chicken'>Chicken</SelectItem>
//             <SelectItem value='lamb'>Lamb</SelectItem>
//             <SelectItem value='pork'>Pork</SelectItem>
//           </RxGroup>
//         </RxViewport>
//         <RxScrollDownButton>
//           <ChevronDownIcon />
//         </RxScrollDownButton>
//       </RxContent>
//     </RxPortal>
//   </RxRoot>
// )

// export default SelectDemo
