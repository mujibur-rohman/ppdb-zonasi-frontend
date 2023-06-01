import { Badge, Button, Modal, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MdDeleteOutline } from "react-icons/md";
import ROLES from "../../../constants/Roles";
import APIUsers from "../../../api/users.api";
import { useDisclosure } from "@mantine/hooks";
import ChangPasswordForm from "./ChangPasswordForm";
import { useContext, useState } from "react";
import { AuthProvider } from "../../../context/AuthContext";
import { HEADERS_USER } from "../../../constants/TableHeaders";

const UsersTable = ({ users, role, mutate }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectId, setSelectId] = useState();
  const ctx = useContext(AuthProvider);

  const openDeleteModal = (id) => {
    return modals.openConfirmModal({
      withCloseButton: false,
      title: "Delete User",
      children: (
        <Text size="sm">
          Data yang dihapus tidak akan bisa dikembalikan lagi, apakah yakin?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red", variant: "outline" },
      cancelProps: { color: "blue", variant: "light" },
      onConfirm: async () => {
        await APIUsers.deleteUsers(id);
        mutate();
      },
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <ChangPasswordForm id={selectId} close={close} />
      </Modal>
      <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
        <thead>
          <tr>
            {HEADERS_USER.filter((head) =>
              role == 2 ? true : head.key !== 4
            ).map((head, i) => (
              <th key={i}>{head.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-normal">
          {users?.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                {ROLES.filter((role) => role.id === user.role).map((role) => (
                  <Badge key={role.id}>{role.name}</Badge>
                ))}
              </td>
              {user.role === 2 && (
                <td>
                  {user.isEmailVerified ? (
                    <Badge color="teal">Verified</Badge>
                  ) : (
                    <Badge color="red">Unverified</Badge>
                  )}
                </td>
              )}
              {ctx.user.uuid === user.uuid ? (
                <td>
                  <Badge variant="outline" color="yellow">
                    You
                  </Badge>
                </td>
              ) : (
                <td className="flex items-center gap-4">
                  <MdDeleteOutline
                    onClick={() => {
                      openDeleteModal(user.uuid);
                    }}
                    className="text-red-500 w-6 h-6 cursor-pointer"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      open();
                      setSelectId(user.uuid);
                    }}
                    size="xs"
                  >
                    Change Password
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UsersTable;
