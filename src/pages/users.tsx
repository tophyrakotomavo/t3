import { type NextPage } from "next";
import {type Role } from "@/server/db/type";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import {
 TableBody, TableHead, TableHeader, TableRow, Table
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreateUserForm } from "@/components/createUserFrom/CreateUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "@/components/loader/Loader";
import { adminGuard } from "@/utils/middleware";

export const getServerSideProps = adminGuard();

const Users: NextPage = () => {

  const { data, isLoading } = api.users.getAllUsers.useQuery();
  const { mutateAsync } = api.users.remove.useMutation();
  const { mutate } = api.users.changeRole.useMutation();
  const utils = api.useContext();

  const handleRemove = async (id: number) => {
    await mutateAsync({ id });
    await utils.users.getAllUsers.refetch();
  };

  const handleSelectRole = (id: number, role: Role) => {
    mutate({ id, role });
  };

  return (
    <div className="md:flex sm:flex-nowrap md:justify-around justify-center">
      <div className="w-96 mt-4">
        <CreateUserForm />
      </div>
      <div>
        <ScrollArea className="w-96 h-96">
          <Table className="h-96 w-96">
            <TableHeader>
              <TableRow>
                <TableHead > User list </TableHead>
              </TableRow>
            </TableHeader>
              <TableBody>
                {data?.map((items) => (
                  <TableRow className="flex justify-between p-2 items-center" key={items.id}>
                    {!isLoading? <span className="font-semibold"> {items.email} </span>: 
                      <Loader/>
                    }
                    <Select
                      defaultValue={items.Role}
                      onValueChange={(v: Role) => handleSelectRole(items.id, v)}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Select a role"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ADMIN"> Admin </SelectItem>
                          <SelectItem value="USER"> User </SelectItem>
                          <SelectItem value="READ"> Read </SelectItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" className="ml-4 text-red-500 border-none">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your
                                  account and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemove(items.id)}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Users;
