import type { FC, KeyboardEvent } from "react";
import { api } from "@/utils/api";
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader/Loader";

const ENTER = 13;

export const CreateUserForm: FC = () =>{ 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = api.users.addUser.useMutation();
  const utils = api.useContext();



  const handler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === ENTER)
        void handleSend();
  };
    
  const handleSend = async () => {
    setIsLoading(true)
    await mutateAsync({email, password});
    setIsLoading(false)
    await utils.users.getAllUsers.refetch();
  };

  return(
    <div>
      <Card className="w-[350px]" onKeyDown={(e) => handler(e)}>
        <CardHeader>
          <CardTitle> Create user </CardTitle>
          <CardDescription> Enter your account here </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Email"> Email </Label>
                <Input type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Password"> Password </Label>
                <Input type="Password" 
                  id="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSend}
            disabled ={ isLoading || !password || !email }
            type="submit"> 
            {isLoading? <Loader/>: "Create"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
