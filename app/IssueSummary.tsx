import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Status } from "@prisma/client";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
         <Link
              key={container.label}
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
        <Card>
          <Flex direction="column" gap="1">
           
              {container.label}
            
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
