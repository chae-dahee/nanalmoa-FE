import { cn } from '@/utils/cn'
import { IconButton } from '..'
import { NotificationIcon } from '../../icons'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  GetInvitationsUserRes,
  IInvitation,
  InvitationGroupEnum,
  InvitationRoleEnum,
  InvitationStatusEnum,
} from '@/types/invitations'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '@/constants/api'
import { getAccessToken } from '@/utils/handle-token'
import { getInvitationsUser } from '@/api/invitations/get-invitations-user'
import NotificationItem from './NotificationItem'

const DUMMY: Array<IInvitation> = [
  {
    id: 1,
    type: InvitationGroupEnum.Group,
    role: InvitationRoleEnum.GROUP_MEMBER,
    status: InvitationStatusEnum.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
  {
    id: 2,
    type: InvitationGroupEnum.Manager,
    role: InvitationRoleEnum.SUBORDINATE,
    status: InvitationStatusEnum.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자2',
    inviteeUuid: '2',
    inviteeName: '초대 수신자2',
    groupId: '',
    groupName: '',
  },
  {
    id: 3,
    type: InvitationGroupEnum.Manager,
    role: InvitationRoleEnum.MANAGER,
    status: InvitationStatusEnum.ACCEPTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
  {
    id: 4,
    type: InvitationGroupEnum.Manager,
    role: InvitationRoleEnum.MANAGER,
    status: InvitationStatusEnum.REJECTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
  {
    id: 5,
    type: InvitationGroupEnum.Group,
    role: InvitationRoleEnum.GROUP_ADMIN,
    status: InvitationStatusEnum.REJECTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
  {
    id: 6,
    type: InvitationGroupEnum.Group,
    role: InvitationRoleEnum.GROUP_ADMIN,
    status: InvitationStatusEnum.ACCEPTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
  {
    id: 7,
    type: InvitationGroupEnum.Group,
    role: InvitationRoleEnum.GROUP_MEMBER,
    status: InvitationStatusEnum.ACCEPTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
  {
    id: 8,
    type: InvitationGroupEnum.Manager,
    role: InvitationRoleEnum.SUBORDINATE,
    status: InvitationStatusEnum.REJECTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    inviterUuid: '1',
    inviterName: '초대 발신자1',
    inviteeUuid: '2',
    inviteeName: '초대 수신자1',
    groupId: '1',
    groupName: '그룹명1',
  },
]

const Notification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: invitations } = useQuery<GetInvitationsUserRes, AxiosError>({
    queryKey: [QUERY_KEYS.GET_INVITATIONS_USER, getAccessToken()],
    queryFn: getInvitationsUser,
  })

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <IconButton
        direction="vertical"
        icon={<NotificationIcon />}
        text="알림"
        onClick={handleToggle}
      />

      {isOpen && invitations && (
        <div
          className={cn(
            'absolute right-0 top-12 z-50',
            'flex max-h-80 min-h-24 w-60 flex-col overflow-hidden overflow-y-auto rounded-md border border-neutral-300 bg-neutral-100'
          )}
        >
          {DUMMY.length === 0 ? (
            <p className="mt-10 text-center text-sm">알림이 없습니다.</p>
          ) : (
            <>
              {DUMMY?.map((invitation) => (
                <NotificationItem
                  key={invitation.id}
                  notification={invitation}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Notification