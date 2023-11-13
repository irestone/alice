import { AttrType, CollectionName, ItemAttr, NamedEntry, Source } from '@common/types'

// section #########################################################################################
//  FILE ATTR OPTIONS
// #################################################################################################

export const regions: NamedEntry[] = [
  { id: 'RU-KB', name: 'КБР' },
  { id: 'RU-KDA', name: 'Краснодарский край' },
]

export const fileStatusOpts: NamedEntry[] = [
  { id: 'working', name: 'в работе' },
  { id: 'on_hold', name: 'отложенные' },
  { id: 'archived', name: 'архив' },
]

export const courtOpts: NamedEntry[] = [
  { id: '1', name: 'суд 1' },
  { id: '2', name: 'суд 2' },
]

export const trialStatusOpts: NamedEntry[] = [
  { id: 'undefined', name: 'не указано' },
  { id: 'granted', name: 'удовлетворено' },
  { id: 'rejected', name: 'отказано' },
]

export const successionAppStatusOpts: NamedEntry[] = [
  { id: 'not_sent', name: 'нет' },
  { id: 'email', name: 'почтой' },
  { id: 'gas', name: 'ГАС Правосудие' },
  { id: 'kad', name: 'Кад Арбитр' },
]

export const successionDecisionOpts: NamedEntry[] = [
  { id: 'undefined', name: 'не вынесено' },
  { id: 'granted', name: 'удовлетворено' },
  { id: 'rejected', name: 'отказано' },
]

export const stateDutyOpts: NamedEntry[] = [
  { id: 'included', name: 'включена' },
  { id: 'state', name: 'в пользу гос-ва' },
]

export const recalcStatusOpts: NamedEntry[] = [
  { id: 'not_needed', name: 'не нужен' },
  { id: 'needed', name: 'нужен' },
  { id: 'done', name: 'произведен' },
]

export const liqDebtStatusOpts: NamedEntry[] = [
  { id: 'no', name: 'нет' },
  { id: 'not_paid', name: 'не выплачен' },
  { id: 'paid', name: 'выплачен' },
]

export const enfNotePossessionOpts: NamedEntry[] = [
  { id: 'unknown', name: 'неизвестно' },
  { id: 'us', name: 'у нас' },
  { id: 'liq', name: 'у КУ' },
  { id: 'fssp', name: 'у ФССП' },
  { id: 'lost', name: 'утерян (получаем дубликат)' },
]

export const enfProceedingStatusOpts: NamedEntry[] = [
  { id: 'not_opened', name: 'не возбуждено' },
  { id: 'going', name: 'в процессе' },
  { id: 'finished', name: 'окончено' },
]

export const enfProceedingOspOpts: NamedEntry[] = [
  { id: '1', name: 'осп 1' },
  { id: '2', name: 'осп 2' },
]

export const fileGroupingOpts: NamedEntry[] = [
  { id: 'custom', name: 'мои группы' },
  { id: 'regions', name: 'по регионам' },
]

// section #########################################################################################
//  FILE ATTRS
// #################################################################################################

export const fileAttrs: ItemAttr[] = [
  // part ==========================================
  //  ROOT
  // ===============================================
  {
    id: 'files:status',
    path: 'files:status',
    name: 'Статус',
    type: 'select',
    options: 'fileStatusOpts',
  },
  {
    id: 'files:groups',
    path: 'files:groups',
    name: 'Группы',
    type: 'multi_select',
    options: 'groups',
  },
  {
    id: 'files:pinned',
    path: 'files:pinned',
    name: 'Закреплен',
    type: 'boolean',
  },
  // part ==========================================
  //  GENERAL
  // ===============================================
  {
    id: 'files:general.fullname',
    path: 'files:general.fullname',
    name: 'ФИО',
    type: 'string',
  },
  {
    id: 'files:general.birthday',
    path: 'files:general.birthday',
    name: 'Дата рож.',
    type: 'date',
  },
  {
    id: 'files:general.address',
    path: 'files:general.address',
    name: 'Адрес рег.',
    type: 'string',
  },
  {
    id: 'files:general.inn',
    path: 'files:general.inn',
    name: 'ИНН',
    type: 'string',
  },
  {
    id: 'files:general.snils',
    path: 'files:general.snils',
    name: 'СНИЛС',
    type: 'string',
  },
  {
    id: 'files:general.regions',
    path: 'files:general.regions',
    name: 'Регионы исп. пр-ва',
    type: 'multi_select',
    options: 'regions',
  },
  {
    id: 'files:general.notion',
    path: 'files:general.notion',
    name: 'Примечание',
    fullname: 'Примечание',
    type: 'string',
  },
  // part ==========================================
  //  CASES
  // ===============================================
  {
    id: 'files:cases.initial.court',
    path: 'files:cases.initial.court',
    name: 'Суд',
    fullname: 'Суд 1й инстанции',
    type: 'select',
    options: 'courtOpts',
  },
  {
    id: 'files:cases.initial.caseNumber',
    path: 'files:cases.initial.caseNumber',
    name: 'Номер дела',
    fullname: 'Номер дела суда 1й инст.',
    type: 'string',
  },
  {
    id: 'files:cases.initial.decisionDate',
    path: 'files:cases.initial.decisionDate',
    name: 'Дата решения',
    fullname: 'Дата решения суда 1й инст.',
    type: 'date',
  },
  {
    id: 'files:cases.initial.markedDecisionCopyProvided',
    path: 'files:cases.initial.markedDecisionCopyProvided',
    name: 'Копия решения',
    fullname: 'Копия решения суда 1й инст.',
    type: 'boolean',
  },
  {
    id: 'files:cases.appealStatus',
    path: 'files:cases.appealStatus',
    name: 'Апелляция',
    type: 'select',
    options: 'trialStatusOpts',
  },
  {
    id: 'files:cases.appeal.court',
    path: 'files:cases.appeal.court',
    name: 'Суд',
    fullname: 'Суд апелляции',
    type: 'select',
    options: 'courtOpts',
  },
  {
    id: 'files:cases.appeal.caseNumber',
    path: 'files:cases.appeal.caseNumber',
    name: 'Номер дела',
    fullname: 'Номер дела суда апелляции.',
    type: 'string',
  },
  {
    id: 'files:cases.appeal.decisionDate',
    path: 'files:cases.appeal.decisionDate',
    name: 'Дата решения',
    fullname: 'Дата решения суда апелляции.',
    type: 'date',
  },
  {
    id: 'files:cases.appeal.markedDecisionCopyProvided',
    path: 'files:cases.appeal.markedDecisionCopyProvided',
    name: 'Копия решения',
    fullname: 'Копия решения суда апелляции.',
    type: 'boolean',
  },
  {
    id: 'files:cases.cassationStatus',
    path: 'files:cases.cassationStatus',
    name: 'Кассация',
    type: 'select',
    options: 'trialStatusOpts',
  },
  {
    id: 'files:cases.cassation.court',
    path: 'files:cases.cassation.court',
    name: 'Суд',
    fullname: 'Суд кассации',
    type: 'select',
    options: 'courtOpts',
  },
  {
    id: 'files:cases.cassation.caseNumber',
    path: 'files:cases.cassation.caseNumber',
    name: 'Номер дела',
    fullname: 'Номер дела суда кассации.',
    type: 'string',
  },
  {
    id: 'files:cases.cassation.decisionDate',
    path: 'files:cases.cassation.decisionDate',
    name: 'Дата решения',
    fullname: 'Дата решения суда кассации.',
    type: 'date',
  },
  {
    id: 'files:cases.cassation.markedDecisionCopyProvided',
    path: 'files:cases.cassation.markedDecisionCopyProvided',
    name: 'Копия решения',
    fullname: 'Копия решения суда кассации.',
    type: 'boolean',
  },
  {
    id: 'files:cases.collateralProvided',
    path: 'files:cases.collateralProvided',
    name: 'Залог',
    type: 'boolean',
  },
  {
    id: 'files:cases.collateral.subject',
    path: 'files:cases.collateral.subject',
    name: 'Предмет',
    fullname: 'Предмет залога',
    type: 'string',
  },
  {
    id: 'files:cases.collateral.registered',
    path: 'files:cases.collateral.registered',
    name: 'Зарегистрирован',
    fullname: 'Залог зарегистрирован',
    type: 'boolean',
  },
  {
    id: 'files:cases.collateral.registration.place',
    path: 'files:cases.collateral.registration.place',
    name: 'Место',
    fullname: 'Место регистрации залога',
    type: 'string',
  },
  {
    id: 'files:cases.collateral.registration.date',
    path: 'files:cases.collateral.registration.date',
    name: 'Дата',
    fullname: 'Дата регистрации залога',
    type: 'date',
  },
  {
    id: 'files:cases.cooped',
    path: 'files:cases.cooped',
    name: 'Солидарно',
    type: 'boolean',
  },
  {
    id: 'files:cases.cooped',
    path: 'files:cases.cooped',
    name: 'Солидарные (ФИО)',
    type: 'string',
  },
  {
    id: 'files:cases.notion',
    path: 'files:cases.notion',
    name: 'Прим.',
    fullname: 'Прим. к судебной инф-ии',
    type: 'string',
  },
  // part ==========================================
  //  SUCCESSION
  // ===============================================
  {
    id: 'files:succession.notificationSent',
    path: 'files:succession.notificationSent',
    name: 'Направлено увед. должнику',
    fullname: 'Увед. о прав-ве направлено должнику',
    type: 'boolean',
  },
  {
    id: 'files:succession.notification.sentAt',
    path: 'files:succession.notification.sentAt',
    name: 'Дата',
    fullname: 'Дата увед. должника о прав-ве',
    type: 'date',
  },
  {
    id: 'files:succession.notification.spi',
    path: 'files:succession.notification.spi',
    name: 'ШПИ',
    fullname: 'ШПИ увед. должника о прав-ве',
    type: 'string',
  },
  {
    id: 'files:succession.applicationStatus',
    path: 'files:succession.applicationStatus',
    name: 'Направлено заяв. в суд',
    fullname: 'Заяв. о прав-ве направлено в суд',
    type: 'select',
    options: 'successionAppStatusOpts',
  },
  {
    id: 'files:succession.application.sentAt',
    path: 'files:succession.application.sentAt',
    name: 'Дата',
    fullname: 'Дата направления заяв. о прав-ве в суд',
    type: 'date',
  },
  {
    id: 'files:succession.application.spi',
    path: 'files:succession.application.spi',
    name: 'ШПИ',
    fullname: 'ШПИ направления заяв. о прав-ве в суд',
    type: 'string',
  },
  {
    id: 'files:succession.scheduledFor',
    path: 'files:succession.scheduledFor',
    name: 'Назначено на',
    fullname: 'Слушание о прав-ве назначено на',
    type: 'string',
  },
  {
    id: 'files:succession.inAbsence',
    path: 'files:succession.inAbsence',
    name: 'В отсутствие',
    fullname: 'Слушание о прав-ве в отсутствие',
    type: 'boolean',
  },
  {
    id: 'files:succession.decisionStatus',
    path: 'files:succession.decisionStatus',
    name: 'Решение',
    fullname: 'Решение о прав-ве',
    type: 'select',
    options: 'successionDecisionOpts',
  },
  {
    id: 'files:succession.appealed',
    path: 'files:succession.appealed',
    name: 'Обжалование',
    fullname: 'Обжалование решения о прав-ве',
    type: 'boolean',
  },
  {
    id: 'files:succession.markedDecisionCopyProvided',
    path: 'files:succession.markedDecisionCopyProvided',
    name: 'Копия решения',
    fullname: 'Копия решения о прав-ве',
    type: 'boolean',
  },
  {
    id: 'files:succession.amount',
    path: 'files:succession.amount',
    name: 'Количество',
    fullname: 'Количество (правопреемство)',
    type: 'number',
  },
  {
    id: 'files:succession.notion',
    path: 'files:succession.notion',
    name: 'Прим. к правопреемству',
    type: 'string',
  },
  // part ==========================================
  //  SUMMARY
  // ===============================================
  {
    id: 'files:summary.amountByCourt',
    path: 'files:summary.amountByCourt',
    name: 'Сумма по решению суда',
    type: 'number',
  },
  {
    id: 'files:summary.stateDuty',
    path: 'files:summary.stateDuty',
    name: 'Госпошлина',
    type: 'select',
    options: 'stateDutyOpts',
  },
  {
    id: 'files:summary.transcript',
    path: 'files:summary.transcript',
    name: 'Расшифровка',
    fullname: 'Расшифровка суммы по решению суда',
    type: 'string',
  },
  {
    id: 'files:summary.amountInContract',
    path: 'files:summary.amountInContract',
    name: 'Сумма по договору',
    type: 'number',
  },
  {
    id: 'files:summary.amountUponContractPayoff',
    path: 'files:summary.amountUponContractPayoff',
    name: 'Сумма на дату полно оплаты',
    type: 'number',
  },
  {
    id: 'files:summary.recalcStatus',
    path: 'files:summary.recalcStatus',
    name: 'Перерасчет',
    type: 'select',
    options: 'recalcStatusOpts',
  },
  {
    id: 'files:summary.liqDebtStatus',
    path: 'files:summary.liqDebtStatus',
    name: 'Долг КУ',
    type: 'select',
    options: 'liqDebtStatusOpts',
  },
  {
    id: 'files:summary.liqDebt.amount',
    path: 'files:summary.liqDebt.amount',
    name: 'Сумма',
    fullname: 'Сумма долга КУ',
    type: 'number',
  },
  {
    id: 'files:summary.liqDebt.payoffDate',
    path: 'files:summary.liqDebt.payoffDate',
    name: 'Дата перечисления',
    fullname: 'Дата перечисления долга КУ',
    type: 'string',
  },
  {
    id: 'files:summary.notion',
    path: 'files:summary.notion',
    name: 'Прим.',
    fullname: 'Прим. к суммам',
    type: 'string',
  },
  // part ==========================================
  //  ENFORCEMENT
  // ===============================================
  {
    id: 'files:enforcements->enforcements:note.series',
    path: 'files:enforcements->enforcements:note.series',
    name: 'Серия',
    fullname: 'Серия исп. листа',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:note.number',
    path: 'files:enforcements->enforcements:note.number',
    name: 'Номер',
    fullname: 'Номер исп. листа',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:note.issuer',
    path: 'files:enforcements->enforcements:note.issuer',
    name: 'Кем выдан',
    fullname: 'Кем выдан исп. лист',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:note.issueDate',
    path: 'files:enforcements->enforcements:note.issueDate',
    name: 'Дата выдачи',
    fullname: 'Дата выдачи исп. листа',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:note.sum',
    path: 'files:enforcements->enforcements:note.sum',
    name: 'Сумма',
    fullname: 'Сумма в исп. листе',
    type: 'number',
  },
  {
    id: 'files:enforcements->enforcements:note.transcript',
    path: 'files:enforcements->enforcements:note.transcript',
    name: 'Расшифровка',
    fullname: 'Расшифровка исп. листа',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:note.possession',
    path: 'files:enforcements->enforcements:note.possession',
    name: 'Мест-ние',
    fullname: 'Мест-ние исп. листа',
    type: 'select',
    options: 'enfNotePossessionOpts',
  },
  {
    id: 'files:enforcements->enforcements:proceedingStatus',
    path: 'files:enforcements->enforcements:proceedingStatus',
    name: 'Исп. произ-во',
    type: 'select',
    options: 'enfProceedingStatusOpts',
  },
  {
    id: 'files:enforcements->enforcements:proceeding.osp',
    path: 'files:enforcements->enforcements:proceeding.osp',
    name: 'ОСП',
    fullname: 'ОСП исп. пр-ва',
    type: 'select',
    options: 'enfProceedingOspOpts',
  },
  {
    id: 'files:enforcements->enforcements:proceeding.region',
    path: 'files:enforcements->enforcements:proceeding.region',
    name: 'Регион',
    fullname: 'Исп. пр-во возбуждено в регионе',
    type: 'select',
    options: 'regions',
  },
  {
    id: 'files:enforcements->enforcements:proceeding.initDate',
    path: 'files:enforcements->enforcements:proceeding.initDate',
    name: 'Дата возбуждения',
    fullname: 'Дата возбуждения исп. пр-ва',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:proceeding.endDate',
    path: 'files:enforcements->enforcements:proceeding.endDate',
    name: 'Дата окончания',
    fullname: 'Дата окончания исп. пр-ва',
    type: 'string',
  },
  {
    id: 'files:enforcements->enforcements:notion',
    path: 'files:enforcements->enforcements:notion',
    name: 'Прим.',
    fullname: 'Прим. к исп. процессу',
    type: 'string',
  },
]

// section #########################################################################################
//  FILE MODULES
// #################################################################################################

export const fileModules: (NamedEntry & { attrs: Source })[] = [
  {
    id: 'general',
    name: 'Общая информация',
    attrs: {
      src: 'fileAttrs',
      target: [
        'files:general.fullname',
        'files:general.birthday',
        'files:general.inn',
        'files:general.snils',
        'files:general.regions',
        'files:general.notion',
      ],
    },
  },
  {
    id: 'cases',
    name: 'Судебная информация',
    attrs: {
      src: 'fileAttrs',
      target: [
        'files:cases.initial.court',
        'files:cases.initial.caseNumber',
        'files:cases.initial.decisionDate',
        'files:cases.initial.markedDecisionCopyProvided',
        'files:cases.appealStatus',
        'files:cases.appeal.court',
        'files:cases.appeal.caseNumber',
        'files:cases.appeal.decisionDate',
        'files:cases.appeal.markedDecisionCopyProvided',
        'files:cases.cassationStatus',
        'files:cases.cassation.court',
        'files:cases.cassation.caseNumber',
        'files:cases.cassation.decisionDate',
        'files:cases.cassation.markedDecisionCopyProvided',
        'files:cases.collateralProvided',
        'files:cases.collateral.subject',
        'files:cases.collateral.registered',
        'files:cases.collateral.registration.place',
        'files:cases.collateral.registration.date',
        'files:cases.cooped',
        'files:cases.cooped',
        'files:cases.notion',
      ],
    },
  },
  {
    id: 'succession',
    name: 'Правопреемство',
    attrs: {
      src: 'fileAttrs',
      target: [
        'files:succession.notificationSent',
        'files:succession.notification.sentAt',
        'files:succession.notification.spi',
        'files:succession.applicationStatus',
        'files:succession.application.sentAt',
        'files:succession.application.spi',
        'files:succession.scheduledFor',
        'files:succession.inAbsence',
        'files:succession.decisionStatus',
        'files:succession.appealed',
        'files:succession.markedDecisionCopyProvided',
        'files:succession.amount',
        'files:succession.notion',
      ],
    },
  },
  {
    id: 'summary',
    name: 'Суммы',
    attrs: {
      src: 'fileAttrs',
      target: [
        'files:summary.amountByCourt',
        'files:summary.stateDuty',
        'files:summary.transcript',
        'files:summary.amountInContract',
        'files:summary.amountUponContractPayoff',
        'files:summary.recalcStatus',
        'files:summary.liqDebtStatus',
        'files:summary.liqDebt.amount',
        'files:summary.liqDebt.payoffDate',
        'files:summary.notion',
      ],
    },
  },
  {
    id: 'enforcements',
    name: 'Исполнительные процессы',
    attrs: {
      src: 'fileAttrs',
      target: [
        'files:enforcements->enforcements:note.series',
        'files:enforcements->enforcements:note.number',
        'files:enforcements->enforcements:note.issuer',
        'files:enforcements->enforcements:note.issueDate',
        'files:enforcements->enforcements:note.sum',
        'files:enforcements->enforcements:note.transcript',
        'files:enforcements->enforcements:note.possession',
        'files:enforcements->enforcements:proceedingStatus',
        'files:enforcements->enforcements:proceeding.osp',
        'files:enforcements->enforcements:proceeding.region',
        'files:enforcements->enforcements:proceeding.initDate',
        'files:enforcements->enforcements:proceeding.endDate',
        'files:enforcements->enforcements:notion',
      ],
    },
  },
]

// section #########################################################################################
//  TASK ATTR OPTIONS
// #################################################################################################

export const taskStatusOpts: NamedEntry[] = [
  { id: 'working', name: 'в работе' },
  { id: 'on_hold', name: 'отложенные' },
  { id: 'archived', name: 'архив' },
]

export const taskGroupingOpts: NamedEntry[] = [
  { id: 'custom', name: 'мои группы' },
  { id: 'priority', name: 'по приоритету' },
  { id: 'executor', name: 'по исполнителям' },
]

// section #########################################################################################
//  TASK ATTRS
// #################################################################################################

export const taskAttrs: ItemAttr[] = [
  {
    id: 'tasks:name',
    path: 'tasks:name',
    name: 'Название',
    type: 'string',
  },
  {
    id: 'tasks:description',
    path: 'tasks:description',
    name: 'Описание',
    type: 'string',
  },
  {
    id: 'tasks:status',
    path: 'tasks:status',
    name: 'Статус',
    type: 'select',
    options: 'taskStatusOpts',
  },
  {
    id: 'tasks:files',
    path: 'tasks:files',
    name: 'Файлы',
    type: 'multi_select',
    options: 'files',
  },
  {
    id: 'tasks:groups',
    path: 'tasks:groups',
    name: 'Группы',
    type: 'multi_select',
    options: 'groups',
  },
  {
    id: 'tasks:pinned',
    path: 'tasks:pinned',
    name: 'Закреплен',
    type: 'boolean',
  },
]
