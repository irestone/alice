import { SFC } from '@common/styles'
import { Mobile } from '@lib/mobile'
import { Section } from '@lib/sections'

export const Profile: SFC = () => {
  return (
    <Mobile.Root>
      <Mobile.Head title='Профиль' />
      <Mobile.Body>
        <Section title='Пользователь' stickyHead={false}>
          <div style={{ height: 500, background: 'gray' }}>block</div>
        </Section>
        <Section title='Сотрудники' stickyHead={false}>
          <div style={{ height: 150, background: 'gray' }}>block</div>
          <div style={{ height: 150, background: 'gray' }}>block</div>
          <div style={{ height: 150, background: 'gray' }}>block</div>
        </Section>
      </Mobile.Body>
    </Mobile.Root>
  )
}
