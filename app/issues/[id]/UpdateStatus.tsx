'use client';
import { useRouter } from '@/node_modules/next/navigation';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import React from 'react';
import toast from "react-hot-toast";

const UpdateStatus = async ({issue}: {issue: Issue}) => {

  const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const router = useRouter();
 
const onStatusUpdate = (status: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status
      }).then(() => router.refresh())
      .catch(() => {
        toast.error("Status could not be updated.");
      });
  };

  return (
      <>
    
    <Select.Root onValueChange={onStatusUpdate} defaultValue={issue.status}>
        <Select.Trigger placeholder="Select Status..."></Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Label>Update Status</Select.Label>
                        {statuses?.map((status) => (
                    <Select.Item key={status.value} value={status.value}>
                        {status.label}
                    </Select.Item>
            ))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
    </>
  )
}

export default UpdateStatus;