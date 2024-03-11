'use client';
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { columns } from "./IssueTableColumns";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  sortOrder: string;
}

interface Props {
  issues: Issue[];
}

const IssueTable = ({ issues }: Props) => {

  const router = useRouter();

   const searchParams = useSearchParams();
   
  const onSort = (columnValue: string) => {
    let sortOrder = 'asc';

    if(columnValue === searchParams.get('orderBy')) {
      sortOrder = searchParams.get('sortOrder') ?  searchParams.get('sortOrder')  === 'asc' ? 'desc' : 'asc' : 'asc';
    }
    const params = new URLSearchParams(searchParams);
    params.set('orderBy', columnValue);
    params.set('sortOrder', sortOrder);

     router.push("?" + params.toString());
  }


  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Button onClick={() => onSort(column.value)} className="!bg-transparent !text-black !font-bold align-center !px-0">
                <Flex align='center'>
                {column.label}

                  {column.value === searchParams.get('orderBy') &&  searchParams.get('sortOrder') === 'asc' && (
                <ArrowUpIcon className="inline" />
              )}

              {column.value === searchParams.get('orderBy') && searchParams.get('sortOrder') === 'desc' && (
                <ArrowDownIcon className="inline" />
              )}
              </Flex>
              </Button>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;

