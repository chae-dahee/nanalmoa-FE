import { getManagerInvitationReceived } from '@/api/manager/get-manager-invitation-received'
import { getManagerInvitationSend } from '@/api/manager/get-manager-invitation-send'
import { postManagerInvitation } from '@/api/manager/post-manager-invitation'
import UserSelector from '@/components/common/UserSelector'
import InvitationLayout from '@/components/setting/InvitationLayout'
import InvitationsSection from '@/components/setting/InvitationsSection'
import InviteModal from '@/components/setting/InviteModal'
import ReceivedInvitation from '@/components/setting/ReceivedInvitation'
import SendedInvitation from '@/components/setting/SendedInvitation'
import SettingSection from '@/components/setting/SettingSection'
import SettingTitle from '@/components/setting/SettingTitle'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { UserWithPhoneNumber } from '@/types/auth'
import {
  IGetManagerInvitationRes,
  IPostManagerInvitationRes,
} from '@/types/manager'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'

const SettingManagerPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserWithPhoneNumber | null>(
    null
  )

  // 보낸 초대 현황
  const { data: sendedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_SEND, isModalOpen],
    queryFn: () => getManagerInvitationSend(),
    enabled: !selectedUser,
  })

  // 받은 초대 현황
  const { data: receivedInvitations } = useQuery<IGetManagerInvitationRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_INVITATION_RECEIVED],
    queryFn: () => getManagerInvitationReceived(),
    enabled: !selectedUser,
  })

  const mutation = useMutation<IPostManagerInvitationRes, AxiosError, string>({
    mutationFn: postManagerInvitation,
    onSuccess: () => {
      closeModal()
    },
    onError: () => {},
  })

  const handleInviteManagerModal = (user: UserWithPhoneNumber) => {
    setSelectedUser(user)
    openModal()
  }

  const handleInviteManager = () => {
    if (selectedUser?.userUuid) {
      mutation.mutate(selectedUser?.userUuid)
    }
  }

  return (
    <div className="p-5">
      <SettingTitle title="관리자 관리" />

      <SettingSection title="💌 관리자 초대하기">
        <div className="mt-3">
          <UserSelector onClick={handleInviteManagerModal} />
        </div>
      </SettingSection>

      <SettingSection title="💌 초대 목록">
        <div className="py-3">
          <InvitationsSection
            title="받은 초대 현황"
            itemsLength={receivedInvitations?.length || 0}
          >
            <InvitationLayout
              items={receivedInvitations}
              Component={ReceivedInvitation}
              message="받은 초대가 없습니다."
              // 초대 거절
              onClickReject={() => {}}
              // 초대 수락
              onClickAccept={() => {}}
            />
          </InvitationsSection>
        </div>
        <div>
          <InvitationsSection
            title="보낸 초대 현황"
            itemsLength={sendedInvitations?.length || 0}
          >
            <InvitationLayout
              items={sendedInvitations}
              Component={SendedInvitation}
              message="보낸 초대가 없습니다."
              // 초대 철회
              onClickReject={() => {}}
            />
          </InvitationsSection>
        </div>
      </SettingSection>

      {isModalOpen && selectedUser && (
        <InviteModal
          onClose={closeModal}
          user={selectedUser}
          type="관리자"
          title="관리자 초대 확인"
          onClick={handleInviteManager}
        />
      )}
    </div>
  )
}

export default SettingManagerPage
