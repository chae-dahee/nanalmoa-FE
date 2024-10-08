import { GetSchedulesRes } from '@/types/schedules'
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

type Props = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  currentMonth: Date
  schedules?: GetSchedulesRes
}

export const useCalendar = ({ setCurrentDate, currentMonth }: Props) => {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)

  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const dateFormat = 'd'
  const rows = []
  let day = startDate

  const formatDay = (date: Date) => {
    if (isToday(date)) return 'font-bold underline'
    if (date.getDay() === 0) return 'text-red-500'
    if (date.getDay() === 6) return 'text-blue-500'
    return ''
  }

  while (day <= endDate) {
    const days: React.ReactNode[] = []
    for (let i = 0; i < 7; i++) {
      const isCurrentMonth = isSameMonth(day, monthStart)
      const currentDay = new Date(day)

      days.push(
        <div
          className={`relative flex items-center justify-center p-2 text-center ${
            !isSameMonth(day, monthStart) ? 'text-gray-300' : formatDay(day)
          }`}
          key={currentDay.toISOString()}
        >
          {/* TODO: 일정이 있을 경우, 원으로 일정 있음 나타내는 스타일 추가 */}
          {/* TODO: 연속된 일정 스타일 적용 */}
          {/* <div className={`absolute inset-0 opacity-60 ${scheduleStyle}`}></div> */}
          <button
            onClick={() => setCurrentDate(currentDay)}
            className={`z-50 flex h-10 w-10 items-center justify-center rounded-full ${!isCurrentMonth ? 'text-gray-400' : ''}`}
          >
            {format(day, dateFormat)}
          </button>
        </div>
      )

      day = addDays(day, 1)
      if (day >= endDate) break
    }
    rows.push(
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    )
  }

  return { rows }
}
