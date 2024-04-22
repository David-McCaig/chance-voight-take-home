import { fetchTableData } from "@/app/lib/data";
import UserTable from "./user-table";
import { Suspense } from "react";

/**
 * Renders the main component for the table page.
 * Passes fetchTableData server action to the UserTable component.
 */
export default async function Component() {
  return (
    <Suspense>
      <div className="flex min-h-screen flex-col items-center pt-8">
        <UserTable fetchTableData={fetchTableData} />
      </div>
    </Suspense>
  );
}
