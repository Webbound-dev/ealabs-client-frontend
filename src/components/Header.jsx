import Location from "./ui/header/Location";
import Logo from "./ui/header/Logo";
import NavBar from "./ui/header/NavBar";
import SearchBar from "./ui/header/SearchBar";
import SocialIcons from "./ui/header/SocialIcons ";

const Header = () => (
  <header className="bg-white text-gray-800 shadow-md w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 md:h-20">

        <div className="flex justify-start flex-1 md:flex-none">
          <Logo />
        </div>

        <div className="hidden sm:flex flex-1 justify-center px-4 max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center justify-end flex-1 sm:flex-none space-x-2 sm:space-x-4">
          <Location />
          <div className="flex sm:hidden">
            <NavBar />
          </div>
          <div className="hidden sm:block">
            <SocialIcons />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3">
        <div className="w-full sm:hidden mb-3 px-1">
          <SearchBar />
        </div>

        <div className="hidden sm:block w-full sm:w-auto">
          <NavBar />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
