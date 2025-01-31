import { Button } from "@/components/ui/button";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
  message?: string;
  showHomeButton?: boolean;
}

const Error = ({
  message = "Unable To Find Post",
  showHomeButton = true,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <FontAwesomeIcon
        icon={faWarning}
        fontSize={60}
        color="orange"
        className="mt-12"
      />
      <h1 className="text-2xl text-center font-semibold mt-5 dark:text-white">
        {message}
      </h1>
      {showHomeButton && (
        <Link href="/">
          <Button className="mt-12">Back Home</Button>
        </Link>
      )}
    </div>
  );
};

export default Error;
