import { TFile } from '../_types'
import { SFC, styled } from '../_styles'
import {
  Div,
  Input,
  Option,
  RadixAccordionContent,
  RadixAccordionItem,
  RadixAccordionRoot,
  RadixAccordionTrigger,
  Select,
  Textarea,
} from './_primitives'

const Root = styled(RadixAccordionRoot, {
  maxWidth: '53rem',
  margin: '1rem auto 3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  color: '#ccc',
})

const Section = styled(RadixAccordionItem)

const SectionTitle = styled(RadixAccordionTrigger, {
  fontSize: '1.5rem',
  color: '#eaeaea',
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: 2,
    width: 26,
    backgroundColor: '$accent',
    left: -38,
    top: 0,
    bottom: 0,
    margin: 'auto',
    transform: 'translateY(.03em)',
  },
})

const SectionBody = styled(RadixAccordionContent, { fontSize: '1rem' })

const Properties = styled('div', {
  display: 'grid',
  rowGap: '.7rem',
  padding: '1.5rem .8rem 0',
  '& + &': {
    borderTop: '1px solid #323232',
  },
  'input, textarea': {
    background: 'white',
    borderRadius: 2,
    padding: '.3em',
  },
})

const Row = styled('div', {
  '--pad': '1.5rem',
  '--1st-col-w': '18rem',
  display: 'grid',
  gridTemplateColumns: 'var(--1st-col-w) 1fr',
  variants: {
    pad: {
      true: {
        paddingLeft: 'var(--pad)',
        gridTemplateColumns: 'calc(var(--1st-col-w) - var(--pad)) 1fr',
      },
    },
    pad2: {
      true: {
        paddingLeft: 'calc(var(--pad) * 2)',
        gridTemplateColumns: 'calc(var(--1st-col-w) - var(--pad) * 2) 1fr',
      },
    },
  },
})

const Label = styled('label', {
  display: 'flex',
  justifyContent: 'space-between',
  color: '#b3b3b3',
  userSelect: 'none',
})

const Field = styled('div', {
  display: 'flex',
  gap: '.2rem',
})

const FieldGroup = styled('div', {
  // display: 'flex',
  gap: '1rem',
})

// section #########################################################################################
//  MAIN
// #################################################################################################

interface IFile {
  file: TFile
  update: (changes: Partial<TFile>) => void
}

const File: SFC<IFile> = ({ file, update }) => {
  return (
    <Root type='multiple' defaultValue={['1']}>
      <Section value='1'>
        <SectionTitle>Общая информация</SectionTitle>
        <SectionBody>
          <Properties>
            <Row>
              <Label>ФИО</Label>
              <Field>
                <Input type='text' />
              </Field>
            </Row>
            <Row>
              <Label>Дата рождения</Label>
              <Field>
                <Input type='date' />
              </Field>
            </Row>
            <Row>
              <Label>ИНН</Label>
              <Input type='text' />
            </Row>
            <Row>
              <Label>СНИЛС</Label>
              <Field>
                <Input type='text' />
              </Field>
            </Row>
            <Row>
              <Label>Адрес регистрации</Label>
              <Field>
                <Input type='text' />
              </Field>
            </Row>
            <Row>
              <Label>Регионы исп. производства</Label>
              <Field>
                <Select>
                  <Option>option</Option>
                </Select>
              </Field>
            </Row>
            <Row>
              <Label>Доп. информация</Label>
              <Field>
                <Textarea />
              </Field>
            </Row>
          </Properties>
        </SectionBody>
      </Section>

      <Section value='2'>
        <SectionTitle>Судебная информация</SectionTitle>
        <SectionBody>
          <Properties>
            <Row>
              <Label>Суд</Label>
              <Field>
                <Select>
                  <Option>option</Option>
                </Select>
              </Field>
            </Row>
            <Row>
              <Label>Дата решени</Label>
              <Field>
                <Input type='date' />
              </Field>
            </Row>
            <Row>
              <Label>Номер дела</Label>
              <Field>
                <Input type='text' />
              </Field>
            </Row>
            <Row>
              <Label>Копия решения с отметкой</Label>
              <Field>
                <Input type='checkbox' />
              </Field>
            </Row>
            <Row>
              <Label>2я инстанция</Label>
              <Field>
                <Input type='checkbox' />
              </Field>
            </Row>
            {true && (
              <>
                <Row pad>
                  <Label>Суд</Label>
                  <Field>
                    <Select>
                      <Option>option</Option>
                    </Select>
                  </Field>
                </Row>
                <Row pad>
                  <Label>Дата решени</Label>
                  <Field>
                    <Input type='date' />
                  </Field>
                </Row>
                <Row pad>
                  <Label>Номер дела</Label>
                  <Field>
                    <Input type='text' />
                  </Field>
                </Row>
                <Row pad>
                  <Label>Копия решения с отметкой</Label>
                  <Field>
                    <Input type='checkbox' />
                  </Field>
                </Row>
              </>
            )}
            <Row>
              <Label>Кассация</Label>
              <Field>
                <Input type='checkbox' />
              </Field>
            </Row>
            {true && (
              <>
                <Row pad>
                  <Label>Суд</Label>
                  <Field>
                    <Select>
                      <Option>option</Option>
                    </Select>
                  </Field>
                </Row>
                <Row pad>
                  <Label>Дата решени</Label>
                  <Field>
                    <Input type='date' />
                  </Field>
                </Row>
                <Row pad>
                  <Label>Номер дела</Label>
                  <Field>
                    <Input type='text' />
                  </Field>
                </Row>
                <Row pad>
                  <Label>Копия решения с отметкой</Label>
                  <Field>
                    <Input type='checkbox' />
                  </Field>
                </Row>
              </>
            )}
            <Row>
              <Label>Залог</Label>
              <Field>
                <Input type='checkbox' />
              </Field>
            </Row>
            {true && (
              <>
                <Row pad>
                  <Label>Предмет залога</Label>
                  <Field>
                    <Input type='text' />
                  </Field>
                </Row>
                <Row pad>
                  <Label>Зарегистрирован</Label>
                  <Field>
                    <Input type='checkbox' />
                  </Field>
                </Row>
                {true && (
                  <>
                    <Row pad2>
                      <Label>Место регистрации</Label>
                      <Field>
                        <Input type='text' />
                      </Field>
                    </Row>
                    <Row pad2>
                      <Label>Дата регистрации</Label>
                      <Field>
                        <Input type='date' />
                      </Field>
                    </Row>
                  </>
                )}
                <Row>
                  <Label>Солидарно</Label>
                  <Field>
                    <Input type='checkbox' />
                  </Field>
                </Row>
                {true && (
                  <>
                    <Row pad>
                      <Label>ФИО</Label>
                      <Field>
                        <Input type='text' />
                      </Field>
                    </Row>
                  </>
                )}
              </>
            )}
          </Properties>
        </SectionBody>
      </Section>

      <Section value='3'>
        <SectionTitle>Суммы</SectionTitle>
        <SectionBody>
          <Properties>
            <Label>Сумма по решению суда</Label>
            <Field>
              <Input type='number' />
            </Field>
            <Label>Госпошлина</Label>
            <FieldGroup>
              <Field>
                <Input type='radio' />
                <Label>включена</Label>
              </Field>
              <Field>
                <Input type='radio' />
                <Label>в пользу государства</Label>
              </Field>
            </FieldGroup>
            <Label>Расшифровка</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Сумма по договору</Label>
            <Field>
              <Input type='number' />
            </Field>
            <Label>Сумма на дату полной оплаты</Label>
            <Field>
              <Input type='number' />
            </Field>
            <Label>КУ нам должен</Label>
            <Field>
              <Input type='checkbox' />
            </Field>
            {true && (
              <>
                <Label>Сумма долга</Label>
                <Field>
                  <Input type='number' />
                </Field>
              </>
            )}
            <Label>Расчет</Label>
            <Field>
              <Input type='checkbox' />
            </Field>
            {true && (
              <>
                <Label>Дата перечисления</Label>
                <Field>
                  <Input type='date' />
                </Field>
              </>
            )}
            <Label>Перерасчет</Label>
            <Field>
              <Input type='checkbox' />
            </Field>
            {true && (
              <>
                <Label>Произведен</Label>
                <Field>
                  <Input type='checkbox' />
                </Field>
              </>
            )}
          </Properties>
        </SectionBody>
      </Section>

      <Section value='4'>
        <SectionTitle>Исполнительный лист</SectionTitle>
        <SectionBody>
          <Properties>
            <Label>Серия</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Номер</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Кем выдан</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Дата выдачи</Label>
            <Field>
              <Input type='date' />
            </Field>
            <Label>Сумма</Label>
            <Field>
              <Input type='number' />
            </Field>
            <Label>Расшифровка</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Местонахождение</Label>
            <Field>
              <Select>
                <Option>КУ</Option>
                <Option>у нас</Option>
                <Option>ищем</Option>
                <Option>ФССП</Option>
                <Option>утерян, получаем дубликат</Option>
              </Select>
            </Field>
            <Label>Комментарий</Label>
            <Field>
              <Textarea />
            </Field>
          </Properties>
        </SectionBody>
      </Section>

      <Section value='5'>
        <SectionTitle>Исполнительное производство</SectionTitle>
        <SectionBody>
          <Properties>
            <Label>Номер</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Дата возбуждения</Label>
            <Field>
              <Input type='date' />
            </Field>
            <Label>ОСП</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Регион</Label>
            <Field>
              <Input type='text' />
            </Field>
            <Label>Окончено</Label>
            <Field>
              <Input type='checkbox' />
            </Field>
            {true && (
              <>
                <Label>Дата окончания</Label>
                <Field>
                  <Input type='date' />
                </Field>
              </>
            )}
            <Label>Комментарий</Label>
            <Field>
              <Textarea />
            </Field>
          </Properties>
        </SectionBody>
      </Section>

      <Section value='6'>
        <SectionTitle>Правопреемство</SectionTitle>
        <SectionBody>
          <Properties>
            <Label>Направлено увед-е и заяв-е должнику</Label>
            <Field>
              <Input type='chekbox' />
            </Field>
            {true && (
              <>
                <Label>Дата</Label>
                <Field>
                  <Input type='date' />
                </Field>
                <Label>ШПИ</Label>
                <Field>
                  <Input type='text' />
                </Field>
              </>
            )}
            <Label>Направлено в суд</Label>
            <Field>
              <Select>
                <Option>почтой</Option>
                <Option>ГАС Правосудие</Option>
                <Option>Кад Арбитр</Option>
              </Select>
            </Field>
            {'opt1' && (
              <>
                <Label>Дата</Label>
                <Field>
                  <Input type='date' />
                </Field>
                <Label>ШПИ</Label>
                <Field>
                  <Input type='text' />
                </Field>
                <Label>Комментарий</Label>
                <Field>
                  <Textarea />
                </Field>
              </>
            )}
            {'opt2' && (
              <>
                <Label>Дата</Label>
                <Field>
                  <Input type='date' />
                </Field>
              </>
            )}
            {'opt3' && (
              <>
                <Label>Дата</Label>
                <Field>
                  <Input type='date' />
                </Field>
              </>
            )}
            <Label>Назначено на</Label>
            <Field>
              <Input type='date' />
            </Field>
            <Label>В отсутствие</Label>
            <Field>
              <Input type='checkbox' />
            </Field>
            <Label>Результат</Label>
            <Select>
              <Option>удовлетворено</Option>
              <Option>отказ, обжалование</Option>
              <Option>отказ</Option>
            </Select>
            {'opt3' && (
              <>
                <Label>Комментарий</Label>
                <Field>
                  <Textarea />
                </Field>
              </>
            )}
            <Label>Копия с отметкой</Label>
            <Field>
              <Input type='checkbox' />
            </Field>
            {true && (
              <>
                <Label>Количество</Label>
                <Field>
                  <Input type='number' />
                </Field>
                <Label>Комментарий</Label>
                <Field>
                  <Textarea />
                </Field>
              </>
            )}
          </Properties>
        </SectionBody>
      </Section>
    </Root>
  )
}

export default File
