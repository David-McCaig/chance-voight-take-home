"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MergedData, Post, User } from "../lib/definitions";
import LoadingTable from "./loading-table";
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
  const [tableData, setTableData] = useState<MergedData[]>([]);
  const [loading, setLoading] = useState(true);
console.log(tableData)
  useEffect(() => {
    async function getTableData() {
      const currentPage = searchParams.get("page") || 1;
      setTableData(await fetchTableData(currentPage));
      setLoading(false);
    }
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function nextPageClick() {
    setLoading(true);
    const currentPage = searchParams.get("page") || 1;
    if (currentPage !== "9") {
      router.push(`/table?page=${String(+currentPage + 1)}`);
      setTableData(await fetchTableData(String(+currentPage + 1)));
    }
    setLoading(false);
  }

  async function previousPageClick() {
    setLoading(true);
    const currentPage = searchParams.get("page") || 1;
    if (currentPage !== "1") {
      router.push(`/table?page=${String(+currentPage - 1)}`);
      setTableData(await fetchTableData(String(+currentPage - 1)));
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center pt-2">
      {loading ? (
        <LoadingTable />
      ) : (
        <Card className="w-11/12 h-11/12">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
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
  );
}
