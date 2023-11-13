import { AttrType } from '@common/types'

export const AttrField: Record<AttrType, (...args: any) => any> = {
  string: (props) => <input type='text' {...props} />,
  number: (props) => <input type='number' {...props} />,
  boolean: (props) => <input type='checkbox' {...props} />,
  date: (props) => <input type='date' {...props} />,
  select: (props) => (
    <select {...props}>
      {props.options.map((opt: any) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  ),
  multi_select: (props) => (
    <select {...props}>
      {props.options.map((opt: any) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  ),
}
