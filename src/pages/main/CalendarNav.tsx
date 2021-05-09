import React from 'react'
interface Props {
  stringProp: string
}

export const CalendarNav: React.FC<Props> = (props) => {
  return <div>{props.stringProp}</div>
}
