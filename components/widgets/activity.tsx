import { SFC, styled } from '../../_styles'
import { Button, Div, Item, Span, Textarea } from '../_primitives'

type TUser = {
  id: string
  fullName: string
  avatar: string // src link
}

type TAction = {
  id: string
  user: TUser
  action: string
  datetime: string // ISO timestamp
}

type TComment = {
  id: string
  user: TUser
  body: string
  datetime: string // ISO timestamp
}

const alice: TUser = { id: 'admin', fullName: 'Алиса Кривенцова', avatar: 'cyan' }
const anzor: TUser = { id: '1', fullName: 'Анзор Кумыков', avatar: 'royalblue' }

const Name = styled('button', {
  fontWeight: 500,
})

const Avatar = styled('button', {
  display: 'block',
  width: '1.9rem',
  height: '1.9rem',
  flexShrink: 0,
  aspectRatio: 1,
  borderRadius: 999,
  background: '#333',
})

const NewCommentForm: SFC<{ user: TUser }> = ({ user }) => {
  return (
    <Div
      css={{
        fontWeight: 200,
        color: '$gray600',
        marginTop: '2.2rem',
        display: 'flex',
        alignItems: 'top',
        gap: '.5rem',
        paddingRight: '2.4rem',
      }}
    >
      <Avatar css={{ background: user.avatar }} />
      <Div css={{ flex: 1, border: '1px solid #2c2c2c', borderRadius: 4 }}>
        <Div
          css={{
            height: '2rem',
            background: '#222',
            borderBottom: '1px solid #2c2c2c',
            display: 'grid',
            placeContent: 'center',
          }}
        >
          [[controls]]
        </Div>
        <Textarea
          placeholder='Оставить комментарий...'
          css={{
            display: 'block',
            width: '100%',
            minHeight: '5rem',
            height: 'auto',
            background: '#191919',
            color: '#a5a5a5',
            borderRadius: '0 0 4px 4px',
            padding: '.5rem .9rem',
            fontWeight: 220,
            letterSpacing: '.03em',
            lineHeight: 1.4,
            '&:focus': {
              background: '#151515',
            },
            // fontFamily: 'inherit',
          }}
        ></Textarea>
      </Div>
    </Div>
  )
}

const Comment: SFC<TComment> = ({ user, body, datetime }) => {
  return (
    <Item
      css={{
        fontWeight: 200,
        color: '$gray600',
        display: 'flex',
        alignItems: 'top',
        gap: '.5rem',
      }}
    >
      <Avatar css={{ background: user.avatar }} />
      <Div css={{ flex: 1 }}>
        <Div>
          <Name>{user.fullName}</Name> оставил комментарий
        </Div>
        <Div
          css={{
            width: 'fit-content',
            border: '1px solid #2c2c2c',
            borderRadius: 4,
            padding: '.5rem .9rem',
            background: '#191919',
            marginTop: '.35rem',
            fontWeight: 220,
            letterSpacing: '.03em',
            lineHeight: 1.4,
            color: '#a5a5a5',
          }}
        >
          {body}
        </Div>
        <Div css={{ fontSize: '.8rem', fontWeight: 450, marginTop: '.2rem', color: '#555' }}>
          {datetime}
        </Div>
      </Div>
    </Item>
  )
}

const Action: SFC<TAction> = ({ user, action, datetime }) => {
  return (
    <Item
      css={{ fontWeight: 200, color: '$gray600', display: 'flex', alignItems: 'top', gap: '.5rem' }}
    >
      <Avatar css={{ background: user.avatar }} />
      <Div>
        <Div>
          <Name>{user.fullName}</Name> {action}
        </Div>
        <Div css={{ fontSize: '.8rem', fontWeight: 450, marginTop: '.2rem', color: '#555' }}>
          {datetime}
        </Div>
      </Div>
    </Item>
  )
}

const List = styled('ul', {
  marginTop: '1.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
})

const Root = styled('div', {
  margin: '3rem auto 0',
  maxWidth: '48rem',
})

const Activity: SFC<{
  history: any[]
  onComment: (text: string) => void
}> = ({ history, onComment }) => {
  return (
    <Root>
      <Div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '2.4rem',
          paddingRight: '2.4rem',
        }}
      >
        <Div css={{ height: 1, background: '#2c2c2c', flex: 1, marginRight: '1rem' }}></Div>
        <Button
          css={{
            fontSize: '.75rem',
            fontWeight: 400,
            lineHeight: 1,
            color: '#999',
            '&:hover': {
              color: '#aaa',
            },
          }}
        >
          <Span css={{ color: '#777' }}>⯅</Span>{' '}
          <Span css={{ textDecoration: 'underline' }}>Скрыть детали</Span>
        </Button>
      </Div>
      <List>
        <Action id='1' user={alice} action='добавила файл в картотеку' datetime='3 дня назад' />
        <Action
          id='2'
          user={alice}
          action='направила заявление на правоопреемство в суд'
          datetime='вчера в 13:47'
        />
        <Action
          id='2'
          user={alice}
          action='назначила Анзору Кумыкову задачу'
          datetime='вчера в 14:03'
        />
        <Comment
          id='1'
          user={anzor}
          body='не вариант продолжить работу с должником по такой-то причине, отложу'
          datetime='сегодня в 17:23'
        />
        <Action id='2' user={anzor} action='отложил этот файл' datetime='сегодня в 17:24' />
      </List>
      <NewCommentForm user={alice} />
    </Root>
  )
}

export default Activity
