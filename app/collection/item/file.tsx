import { ReactNode } from 'react'
import { isFunction } from 'lodash'

import * as T from '@common/types'
import { CSS, SFC, mixin } from '@common/styles'
import { Div, Input, Label, Span } from '@lib/primitives'
import { Mobile } from '@lib/mobile'
import { Button } from '@lib/buttons'
import { Section } from '@lib/sections'

// section #########################################################################################
//  FIELD
// #################################################################################################

//!fix TPropertyType as with filter
type TPropertyType = 'string' | 'number' | 'boolean' | 'select' | 'multi_select' | 'text'
const Field: SFC<{ value?: any; type: TPropertyType }> = (props) => {
  switch (props.type) {
    case 'string':
      return (
        <Input
          type='text'
          value={props.value}
          css={{
            h: 40,
            bdrad: 4,
            px: 8,
            fontSize: 13,
            lineHeight: 40 / 13,
            bg: '$gray200',
            color: 'inherit',
            '&:focus': { borderBottom: '1px solid $accent500' },
          }}
        />
      )
    case 'number':
      return (
        <Input
          type='number'
          value={props.value}
          css={{
            h: 40,
            bdrad: 4,
            px: 8,
            fontSize: 13,
            lineHeight: 40 / 13,
            bg: '$gray200',
            color: 'inherit',
            '&:focus': { borderBottom: '1px solid $accent500' },
          }}
        />
      )
    case 'select':
    case 'multi_select':
      return (
        <Div
          css={{
            display: 'flex',
            alignItems: 'center',
            h: 40,
            bdrad: 4,
            px: 8,
            fontSize: 13,
            lineHeight: 40 / 13,
            bg: '$gray200',
            color: 'inherit',
          }}
        >
          <Span css={{ flex: 1 }}>{props.value?.join(', ')}</Span>
          <Span css={{ fontSize: 12, fontWeight: 300, color: '#666' }}>▼</Span>
        </Div>
      )
    case 'boolean':
      return (
        <Div css={{ display: 'flex', alignItems: 'center', h: 40 }}>
          <Button
            css={{ size: 32, bg: props.value ? '$accent500' : '$gray200', bdrad: 4 }}
          ></Button>
        </Div>
      )
    case 'text':
      return (
        <Div
          css={{
            minHeight: 40,
            bg: '$gray200',
            bdrad: 4,
            px: 8,
            py: 10,
            fontSize: 13,
            lineHeight: 20 / 13,
          }}
        >
          {props.value}
        </Div>
      )
    default:
      throw new Error('Unknown field type')
  }
}

// section #########################################################################################
//  ROW
// #################################################################################################

/**
 * @param indentIndicatorTail - to trim indentation indicator's tail
 */
const Row: SFC<{
  label: string
  indent?: number
  indentIndicatorTail?: 'long' | 'short' | 'shorter'
  nudge?: number
  stack?: boolean
}> = (props) => {
  const { indent = 0, indentIndicatorTail: iiTail = 'long' } = props
  return (
    <Div
      css={{
        display: 'grid',
        pl: indent * 16,
        ...mixin(!!props.stack, { gap: 8 }, { gap: 16, gtc: `${120 - indent * 16}px auto` }),
        ...mixin(!!props.nudge, { mt: (props.nudge as number) * 8 }),
      }}
    >
      <Label
        css={{
          display: 'flex',
          alignItems: 'center',
          height: props.stack ? 20 : 40,
          fontSize: 13,
          lineHeight: 20 / 13,
          color: '#858585',
          ...mixin(!!props.indent, {
            position: 'relative',
            '&::before': {
              content: '""',
              display: 'block',
              w: 10,
              h: iiTail === 'long' ? 56 : iiTail === 'short' ? 34 : 23,
              position: 'absolute',
              left: -15,
              top: '50%',
              transform: 'translateY(-100%)',
              borderLeft: '2px solid $gray200',
              borderBottom: '2px solid $gray200',
              borderRadius: '0 0 0 4px',
            },
          }),
        }}
      >
        {props.label}
      </Label>
      <Div>{props.children}</Div>
    </Div>
  )
}

// section #########################################################################################
//  MAIN
// #################################################################################################

export const File: SFC<{
  data: T.File
  update: (changes: Partial<T.File>) => void
  mobile?: boolean
}> = (props) => {
  const { data: file } = props
  return (
    <Mobile.Root>
      <Mobile.Head
        title={`Файл ${file.id}`}
        actions={[
          <Button key='pin' icon='pin' css={{ color: '$accent500' }} />,
          <Button key='subscribe' icon='subscribe' />,
          <Button key='subscribe' icon='options' />,
        ]}
        search={false}
      />
      <Mobile.Body>
        <Section title='Общая информация' collapsible>
          <Row label='ФИО'>
            <Field type='string' value={file.general.fullname} />
          </Row>
          <Row label='Дата рождения'>
            <Field type='string' value={file.general.birthday} />
          </Row>
          <Row label='ИНН'>
            <Field type='string' value={file.general.inn} />
          </Row>
          <Row label='СНИЛС'>
            <Field type='string' value={file.general.snils} />
          </Row>
          <Row label='Адрес регистрации'>
            <Field type='string' value={file.general.address} />
          </Row>
          <Row label='Регионы исп. производства'>
            <Field type='multi_select' value={file.general.regions} />
          </Row>
          <Row label='Примечание' stack nudge={1}>
            <Field
              type='text'
              value='Какое-то короткое примечание о должнике. А надо чтоб длинное было. Еще длиннее...'
            />
          </Row>
        </Section>

        <Section title='Судебная информация' collapsible defaultOpen={true}>
          <Row label='Суд'>
            <Field type='string' />
          </Row>
          <Row label='Дата решения'>
            <Field type='string' />
          </Row>
          <Row label='Номер дела'>
            <Field type='string' />
          </Row>
          <Row label='Копия решения'>
            <Field type='boolean' />
          </Row>
          <Row label='2я инстанция'>
            <Field type='boolean' />
          </Row>
          <Row label='Суд' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Дата решения' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Номер дела' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Копия решения' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Кассация'>
            <Field type='string' />
          </Row>
          <Row label='Суд' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Дата решения' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Номер дела' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Копия решения' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Залог'>
            <Field type='string' />
          </Row>
          <Row label='Предмет' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Зарег-ан' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Место' indent={2} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Дата' indent={2}>
            <Field type='string' />
          </Row>
          <Row label='Солидарно'>
            <Field type='string' />
          </Row>
          <Row label='ФИО' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
        </Section>

        <Section title='Суммы' collapsible defaultOpen={true}>
          <Row label='Сумма по решению суда'>
            <Field type='string' />
          </Row>
          <Row label='Госпошлина'>
            <Field type='string' />
          </Row>
          <Row label='Расшифровка'>
            <Field type='string' />
          </Row>
          <Row label='Сумма по договору'>
            <Field type='string' />
          </Row>
          <Row label='Сумма на дату полной оплаты'>
            <Field type='string' />
          </Row>
          <Row label='КУ нам должен'>
            <Field type='string' />
          </Row>
          <Row label='Сумма долга' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Расчет'>
            <Field type='string' />
          </Row>
          <Row label='Дата перечисления' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Перерасчет'>
            <Field type='string' />
          </Row>
          <Row label='Произведен' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
        </Section>

        <Section title='Исполнительный лист' collapsible defaultOpen={true}>
          <Row label='Серия'>
            <Field type='string' />
          </Row>
          <Row label='Номер'>
            <Field type='string' />
          </Row>
          <Row label='Кем выдан'>
            <Field type='string' />
          </Row>
          <Row label='Дата выдачи'>
            <Field type='string' />
          </Row>
          <Row label='Сумма'>
            <Field type='string' />
          </Row>
          <Row label='Расшифровка'>
            <Field type='string' />
          </Row>
          <Row label='Наличие'>
            <Field type='string' />
          </Row>
          <Row label='Комментарий'>
            <Field type='string' />
          </Row>
        </Section>

        <Section title='Исполнительное производство' collapsible defaultOpen={true}>
          <Row label='Номер'>
            <Field type='string' />
          </Row>
          <Row label='Дата возбуждения'>
            <Field type='string' />
          </Row>
          <Row label='ОСП'>
            <Field type='string' />
          </Row>
          <Row label='Регион'>
            <Field type='string' />
          </Row>
          <Row label='Окончено'>
            <Field type='string' />
          </Row>
          <Row label='Дата' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Комментарий'>
            <Field type='string' />
          </Row>
        </Section>

        <Section title='Правопреемство' collapsible defaultOpen={true}>
          <Row label='Направлено ув. и заяв. должнику'>
            <Field type='string' />
          </Row>
          <Row label='Дата' indent={1} indentIndicatorTail='shorter'>
            <Field type='string' />
          </Row>
          <Row label='ШПИ' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Направлено заяв. в суд'>
            <Field type='string' />
          </Row>
          <Row label='Дата' indent={1} indentIndicatorTail='shorter'>
            <Field type='string' />
          </Row>
          <Row label='ШПИ' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Комментарий' indent={1}>
            <Field type='string' />
          </Row>
          <Row label='Дата' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Дата' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Назначено на'>
            <Field type='string' />
          </Row>
          <Row label='В отсутствие'>
            <Field type='string' />
          </Row>
          <Row label='Результат'>
            <Field type='string' />
          </Row>
          <Row label='Комментарий' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Копия решения'>
            <Field type='string' />
          </Row>
          <Row label='Количество' indent={1} indentIndicatorTail='short'>
            <Field type='string' />
          </Row>
          <Row label='Комментарий' indent={1}>
            <Field type='string' />
          </Row>
        </Section>
      </Mobile.Body>
    </Mobile.Root>
  )
}
