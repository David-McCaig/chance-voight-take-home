import { fetchTableData } from "@/app/lib/data";
import UserTable from "./user-table"

export default async function Component() {

  return (
    <div className="flex min-h-screen flex-col items-center pt-8">
        <UserTable fetchTableData={fetchTableData} />
    </div>
  );
}