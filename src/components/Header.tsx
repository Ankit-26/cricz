import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#303371] px-6 py-4 ">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a
          className="font-semibold text-2xl tracking-tight cursor-pointer"
          href="/"
        >
          CRICZONE
        </a>
      </div>
    </nav>
  );
}

export default Header;
