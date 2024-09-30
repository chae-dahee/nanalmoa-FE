import { useQuery } from '@tanstack/react-query'
import EventItem from './EventItem'
import { QUERY_KEYS } from '@/constants/api'
import { getSchedules } from '@/api/schedules/get-schedules'
import { ISchedule } from '@/types/schedules'
import { useUser } from '@/hooks/use-user'

const EventContainer = () => {
  const { user, isUserLoading } = useUser()
  const { isLoading, data } = useQuery<ISchedule[]>({
    queryKey: [QUERY_KEYS.GET_SCHEDULES],
    queryFn: () => getSchedules(user.userId || 0),
    enabled: !isUserLoading && !!user.userId,
  })

  const sortScheduleDESC = (schedules: ISchedule[]) => {
    return schedules.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  }

  if (isUserLoading || isLoading) return <div>로딩 중...</div>
  if (!data) return <div>데이터가 없습니다.</div>

  return (
    <>
      {sortScheduleDESC(data).map((schedule) => (
        <EventItem key={schedule.scheduleId} schedule={schedule} />
      ))}
    </>
  )
}

export default EventContainer
