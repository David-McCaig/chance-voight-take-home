"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MergedData } from "../lib/definitions";
import LoadingTable from "./loading-table";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Component({ fetchTableData }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableData, setTableData] = useState<MergedData[] | any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTableData() {
      setLoading(true);
      const currentPage = searchParams.get("page") || 1;
      setTableData(await fetchTableData(currentPage));
      setLoading(false);
    }
    getTableData();
  }, [fetchTableData, searchParams]);

  async function nextPageClick() {
    const currentPage = searchParams.get("page") || 1;
    currentPage !== "9" &&
      router.push(`/table?page=${String(+currentPage + 1)}`);
  }

  async function previousPageClick() {
    const currentPage = searchParams.get("page") || 1;
    currentPage !== "1" &&
      router.push(`/table?page=${String(+currentPage - 1)}`);
  }

  if (tableData?.error) {
    return (
      <div>
        <p>{tableData?.error}</p>
        <p>Please try again</p>
      </div>
    );
  }

  return (
    <Suspense>
      <div className="flex min-h-screen flex-col items-center pt-2">
        {loading ? (
          <LoadingTable />
        ) : (
          <Card className="w-11/12 h-11/12">
            <CardHeader className="px-7">
              <CardTitle>User comments</CardTitle>
              <CardDescription>All the user comments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Company
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Post Title
                    </TableHead>
                    <TableHead className="text-right">Post Contents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((user: MergedData) => (
                    <TableRow key={user?.id} className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{user?.name}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user?.email}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        {user?.company}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user?.title}
                      </TableCell>
                      <TableCell className="text-right">{user?.body}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <Pagination className="pb-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={previousPageClick} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={nextPageClick} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Card>
        )}
      </div>
    </Suspense>
  );
}
