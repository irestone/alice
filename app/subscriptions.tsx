import { SFC } from '@common/styles'
import { Mobile } from '@lib/mobile'
import { Section } from '@lib/sections'

export const Subscriptions: SFC = () => {
  return (
    <Mobile.Root css={{ height: '100%', overflow: 'auto' }}>
      <Mobile.Head title='Подписки' />
      <Mobile.Body css={{ display: 'flex', flexDirection: 'column', gap: 8, pb: 16 }}>
        <Section title='Сегодня' counter stickHeadAt={53}>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
        </Section>
        <Section title='Вчера' counter stickHeadAt={53}>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
        </Section>
        <Section title='Ранее на этой неделе' counter stickHeadAt={53}>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 100, background: 'gray' }}>block</div>
        </Section>
        <Section title='На прошлой неделе' counter stickHeadAt={53}>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 100, background: 'gray' }}>block</div>
        </Section>
        <Section title='Ранее в этом месяце' counter stickHeadAt={53}>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 100, background: 'gray' }}>block</div>
        </Section>
        <Section title='В прошлом месяце' counter stickHeadAt={53}>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 100, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 100, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 120, background: 'gray' }}>block</div>
          <div style={{ height: 60, background: 'gray' }}>block</div>
          <div style={{ height: 80, background: 'gray' }}>block</div>
          <div style={{ height: 100, background: 'gray' }}>block</div>
        </Section>
        <div style={{ textAlign: 'center', padding: 16 }}>загружается...</div>
      </Mobile.Body>
    </Mobile.Root>
  )
}
