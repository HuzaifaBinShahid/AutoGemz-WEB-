import Link from "next/link";
import Button from "@/components/common/Button";


export default function NotFound() {
  return (
  
    <div className="flex flex-col items-center justify-center my-28 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-display font-bold text-customRed dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-3xl font-display font-semibold text-black dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-[#A5A5A5] font-mulish mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="default" className="!font-display !font-medium uppercase tracking-widest">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

