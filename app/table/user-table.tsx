"use client";
import { useEffect, useState } from "react";

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

export default function Component({ fetchTableData}: any) {

  const [data, setData] = useState<any>([]);


  useEffect(() => {
    async function getTableData() {
      setData(await fetchTableData());
    }
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                {data.map((user: any) => (
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
      </Card>
    </div>
  );
}