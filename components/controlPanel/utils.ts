import { map, random, sample, sampleSize, uniqueId } from 'lodash'

import { TCard, TGroup } from './types'

export const stubGroups: TGroup[] = [
  { id: '1', name: 'перерасчет' },
  { id: '2', name: 'не заполнена общая инфа' },
  { id: '3', name: 'до пятницы' },
  { id: '4', name: 'заур' },
]

const pinnedSample = [true, false, false, false, false, false]
const groupsSample = map(stubGroups, 'id')
const prop1Sample = [
  'Vivamus',
  'sodales',
  'ultricies',
  'ullamcorper',
  'Cras',
  'tempor',
  'vitae',
  'erat',
  'at',
  'vestibulum',
  'Mauris',
  'molestie',
  'hendrerit',
  'ligula',
  'aliquam',
  'euismod',
]
const prop3Sample = [true, false]
const prop4Sample = [
  '2023-03-10T13:17:35.295Z',
  '2023-05-11T13:17:35.295Z',
  '2023-06-12T13:17:35.295Z',
  '2023-07-13T13:17:35.295Z',
  '2023-07-14T13:17:35.295Z',
  '2023-08-15T13:17:35.295Z',
  '2023-08-16T13:17:35.295Z',
  '2023-08-17T13:17:35.295Z',
]

export const genCard = (): TCard => ({
  id: uniqueId(),
  pinned: sample(pinnedSample) as boolean,
  groups: sampleSize(groupsSample, random(0, 3)),
  prop1: sampleSize(prop1Sample, random(1, 3)).join(' '),
  prop2: random(0, 99),
  prop3: sample(prop3Sample) as boolean,
  prop4: sample(prop4Sample) as string,
})
