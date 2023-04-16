import { Badge, Button, Table } from "@mantine/core";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import ROLES from "../../../constants/Roles";

const UsersTable = ({ users, headers, role }) => {
  return (
    <Table horizontalSpacing="md" verticalSpacing="md" fontSize="sm">
      <thead>
        <tr>
          {headers
            .filter((head) => (role == 2 ? true : head.key !== 4))
            .map((head, i) => (
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
            <td className="flex items-center gap-4">
              <MdDeleteOutline className="text-red-500 w-6 h-6" />
              <Button variant="outline" size="xs">
                Change Password
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
