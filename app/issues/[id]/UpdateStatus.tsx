'use client';
import { Select, Text } from '@radix-ui/themes'
import React from 'react'
import { notFound } from 'next/navigation';
import { Issue, Status } from '@prisma/client';
import { Skeleton } from '@/app/components';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';

const UpdateStatus = async ({issue}: {issue: Issue}) => {

  const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

 
const onStatusUpdate = (status: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status
      })
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