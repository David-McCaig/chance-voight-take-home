import { fetchTableData } from "@/app/lib/data";
import UserTable from "./user-table";
import { Suspense } from "react";

export default async function Component() {
  return (
    <Suspense>
      <div className="flex min-h-screen flex-col items-center pt-8">
        <UserTable fetchTableData={fetchTableData} />
      </div>
    </Suspense>
  );
}
