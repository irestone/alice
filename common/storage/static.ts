import {
  ApplicationSystem,
  EnforcementNoteWhereabouts,
  FileAttr,
  FileGrouping,
  FileStatus,
  Module,
  Region,
  StateDuty,
  SuccessionStatus,
  TaskAttr,
  TaskGrouping,
  TaskPriority,
  TaskStatus,
  TrialResult,
} from '@common/types'

import applicationSystemsRaw from './static/applicationSystems.json'
import enwbRaw from './static/enforcementNoteWhereabouts.json'
import fileAttrsRaw from './static/fileAttrs.json'
import fileGroupingsRaw from './static/fileGroupings.json'
import fileStatusesRaw from './static/fileStatuses.json'
import modulesRaw from './static/modules.json'
import regionsRaw from './static/regions.json'
import stateDutiesRaw from './static/stateDuties.json'
import successionStatusesRaw from './static/successionStatuses.json'
import taskAttrsRaw from './static/taskAttrs.json'
import taskGroupingsRaw from './static/taskGroupings.json'
import taskPrioritiesRaw from './static/taskPriorities.json'
import taskStatusesRaw from './static/taskStatuses.json'
import trialResultsRaw from './static/trialResults.json'

export const applicationSystems = applicationSystemsRaw as ApplicationSystem[]
export const enforcementNoteWhereabouts = enwbRaw as EnforcementNoteWhereabouts[]
export const fileAttrs = fileAttrsRaw as FileAttr[]
export const fileGroupings = fileGroupingsRaw as FileGrouping[]
export const fileStatuses = fileStatusesRaw as FileStatus[]
export const modules = modulesRaw as Module[]
export const regions = regionsRaw as Region[]
export const stateDuties = stateDutiesRaw as StateDuty[]
export const successionStatuses = successionStatusesRaw as SuccessionStatus[]
export const taskAttrs = taskAttrsRaw as TaskAttr[]
export const taskGroupings = taskGroupingsRaw as TaskGrouping[]
export const taskPriorities = taskPrioritiesRaw as TaskPriority[]
export const taskStatuses = taskStatusesRaw as TaskStatus[]
export const trialResults = trialResultsRaw as TrialResult[]
