import React from "react";
import { Skeleton } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Skeletonload = () => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={250} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={250} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={250} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={250} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Skeletonload;