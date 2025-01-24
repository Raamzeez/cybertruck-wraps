import { Button } from "@/components/ui/button";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <FontAwesomeIcon
        icon={faWarning}
        fontSize={60}
        color="orange"
        className="mt-12"
      />
      <h1 className="text-2xl text-center font-semibold mt-5">
        Unable To Find Post
      </h1>
      <Link href="/">
        <Button className="mt-12">Back Home</Button>
      </Link>
    </div>
  );
};

export default Error;
