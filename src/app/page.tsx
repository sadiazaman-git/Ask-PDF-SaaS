import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-slate-500 to-yellow-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Talk to any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2 ">
            {isAuth && <Button className="p-5 hover:scale-110 hover:duration-300">Go to Chat Rooms</Button>}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-800">
          Join millions of students, researchers, and professionals in using AI to rapidly answer questions and comprehend research.
          </p>
          <div className="w-full mt-4">
            {isAuth? (<h1>file Upload</h1>):
            (<Link href='/sign-in'>
            <Button>Login to get Started
              <LogIn className="w-4 h-4 ml-2"/>
            </Button>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  );
}
