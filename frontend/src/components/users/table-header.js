import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useUser } from '../../context/user';

const adminTableHeaders = [
  'No',
  'Email',
  'First Name',
  'Last Name',
  'Country',
  'City',
  'Role',
  'Category',
  'Sub Category',
  'Actions'
];

const userTableHeaders = [
  'No',
  'First Name',
  'Last Name',
  'Country',
  'City',
  'Category',
  'Sub Category',
]

const UserTableHeader = () => {
  const { methods: { isAdmin } } = useUser();
  const tableHeaders = isAdmin() ? adminTableHeaders : userTableHeaders;
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map(header =>
          <TableCell key={header}>
            {header}
          </TableCell>)
        }
      </TableRow>
    </TableHead>
  )
}
export default UserTableHeader;