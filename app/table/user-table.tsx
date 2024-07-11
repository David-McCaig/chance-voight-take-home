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

/**
 * Renders a table component that displays user comments.
 * @param fetchTableData - Function to fetch table data.
 */
export default function Component({ fetchTableData }: any) {
  //TODO: Add types for fetchTableData. Uses a server action to fetch table data.
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableData, setTableData] = useState<MergedData[] | any>([]);
  //TODO: Remove any type from tableData
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  Fetches table data and updates the state.
    async function getTableData() {
      setLoading(true);
      const currentPage = searchParams.get("page") || 1;
      setTableData(await fetchTableData(currentPage));
      setLoading(false);
    }
    getTableData();
  }, [fetchTableData, searchParams]);

  // Handles the click event for the next page button.
  async function nextPageClick() {
    const currentPage = searchParams.get("page") || 1;
    currentPage !== "9" &&
      router.push(`/table?page=${String(+currentPage + 1)}`);
  }

  //Handles the click event for the previous page button.
  async function previousPageClick() {
    const currentPage = searchParams.get("page") || 1;
    currentPage !== "0" &&
      router.push(`/table?page=${String(+currentPage - 1)}`);
  }

  // If there is an error in the table data, display an error message
  if (tableData?.error) {
    return (
      <div>
        <p>{tableData?.error}</p>
        <p>Please try again</p>
      </div>
    );
  }

  const isMobile = /iPhone|Android|Windows Phone|BB10|BlackBerry|Tizen|KaiOS/i.test(navigator.userAgent);
  console.log(isMobile);

  return (
    <Suspense>
      {/*TODO: Add a fallback loading component to display while the table data is being fetched */}
      <div className="flex min-h-screen flex-col items-center pt-2">
        
        {loading ? (
          <LoadingTable />
        ) : (
          <>
         
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
                  {/* Render each user data row */}
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
            {/* Pagination component */}
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
          </>
        )}
      </div>
   
    </Suspense>
  );
}
