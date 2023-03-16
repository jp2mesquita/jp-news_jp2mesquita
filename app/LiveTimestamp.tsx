'use client'

import TimeAgo from 'react-timeago'

interface LiveTimestampProps{
  time: string
}

export default function LiveTimestamp({time} : LiveTimestampProps){
  return (
    <TimeAgo date={time}/>
  )
}