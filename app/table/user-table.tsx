"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MergedData, Post, User } from "../lib/definitions";
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

export default function Component({fetchTableData}: any) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<MergedData[]>([]);

  useEffect(() => {
    async function getTableData() {
      router.push("/table?page=0");
      const currentPage = searchParams.get("page") || 1;
      setData(await fetchTableData(currentPage));
    }
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function nextPageClick() {
    const currentPage = searchParams.get("page") || 1;
    router.push(`/table?page=${String(+currentPage + 1)}`);
    setData(await fetchTableData(String(+currentPage + 1)));
  }

  async function previousPageClick() {
    const currentPage = searchParams.get("page") || 1;
    currentPage !== "1" &&
      router.push(`/table?page=${String(+currentPage - 1)}`);
    setData(await fetchTableData(String(+currentPage - 1)));
  }

  return (
    <div className="flex min-h-screen flex-col items-center pt-2">
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
                <TableHead className="hidden sm:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">
                  Post Title
                </TableHead>
                <TableHead className="text-right">Post Contents</TableHead>
              </TableRow>
            </TableHeader>
              <TableBody>
                {data.map((user: MergedData) => (
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
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}