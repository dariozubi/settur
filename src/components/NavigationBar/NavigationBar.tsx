import { Link } from "@/navigation";
import Text from "../Text";
import { LanguageSelector } from "./LanguageSelector";

function NavigationBar() {
  const textFrom = "Navigation";
  return (
    <nav className="absolute flex py-5 px-20 justify-end w-full">
      <ul className="flex gap-7">
        <li>
          <Link href="/">
            <Text from={textFrom}>contact</Text>
          </Link>
        </li>
        <li>
          <Link href="/">
            <Text from={textFrom}>about</Text>
          </Link>
        </li>
        <li>
          <LanguageSelector />
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
