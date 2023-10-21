import { FILE_STATUS, TASK_STATUS } from '../../_types'
import { styled } from '../../_styles'

export const fileStatusOptions = [
  { value: FILE_STATUS.IN_WORK, label: 'в работе' },
  { value: FILE_STATUS.ON_HOLD, label: 'отложенные' },
  { value: FILE_STATUS.ARCHIVED, label: 'архив' },
]

export const taskStatusOptions = [
  { value: TASK_STATUS.IN_WORK, label: 'в работе' },
  { value: TASK_STATUS.ON_HOLD, label: 'отложенные' },
  { value: TASK_STATUS.ARCHIVED, label: 'архив' },
]

export const StatusSelect = styled('select')
export const StatusOption = styled('option')
