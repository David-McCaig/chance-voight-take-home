"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

import { Skeleton } from "@/components/ui/skeleton";

function LoadingTable() {
  const numbers = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div className="flex min-h-screen flex-col  items-center pt-2">
      <Card className="">
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
                {numbers.map((num) => (
                  <TableRow key={num} className="bg-accent">
                    <TableCell>
                      <Skeleton className="h-9 w-24" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="h-9 w-32" />
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="h-9 w-24" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-9 w-64 " />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-9 w-[50rem]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </CardContent>
        <Pagination className="pb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
}

export default LoadingTable;
