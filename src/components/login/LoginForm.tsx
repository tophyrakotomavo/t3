import { useEffect, useState, type FC} from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Loader } from "@/components/loader/Loader";
import { signIn, useSession } from 'next-auth/react';

let timeout: string | number | NodeJS.Timeout | undefined;
const ENTER = 13;

export const LoginFrom: FC = () => {
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      timeout = setTimeout(() => {
        setError(false)
      }, 7000
      )
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const handleSend = ()  => {
    void (setIsLoading(true),  
    signIn('credentials', 
    { email, password, callbackUrl: '/files' }))
  } 

  const handler = (e: { keyCode: number; }) => {
    if (e.keyCode === ENTER)
      void handleSend();
  };

  return (
    <div>
      <Card className="w-[350px] m-auto mt-52" onKeyDown={(e) => handler(e)}>
        <CardHeader>
        {error &&
          <div className="fixed top-5 left-5 right-500">
            <Alert variant="destructive" className="flex">
              <div>
                <AlertCircle className="h-4 w-4"/>
              </div>
              <div>
                <AlertTitle> Error </AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        }
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email"> Email </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password"> Password </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button
          onClick={handleSend}
          type="submit"
          disabled={!email || !password || isLoading || status === "loading"}>
          {isLoading? <Loader/>: "Login"}
        </Button>
        </CardFooter>
      </Card>
    </div>
  );
}