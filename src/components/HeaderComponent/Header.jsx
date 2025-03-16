const Header = () => {
  return (
    <header>
      <div className="w-full bg-gray-300 py-6 px-10">
        <nav className="flex flex-row justify-between items-center">
          <div className="logo basis-2/6 text-center text-xl font-semibold cursor-pointer">
            jyStore
          </div>
          <ul className="flex basis-3/6 items-center justify-end gap-8 uppercase text-sm text-gray-500 font-medium">
            <li className="nva-top-menu-item">
              <a href="#" className="">
                Home
              </a>
            </li>
            <li className="nva-top-menu-item">
              <a href="#" className="">
                Product
              </a>
            </li>
            <li className="nva-top-menu-item">
              <a href="#" className="">
                Blog
              </a>
            </li>
            <li className="nva-top-menu-item">
              <a href="#" className="">
                About
              </a>
            </li>
            <li className="nva-top-menu-item">
              <a href="#" className="">
                Contact
              </a>
            </li>
            <li className="nva-top-menu-item">
              <a href="#" className="">
                StyleGuide
              </a>
            </li>
          </ul>
          <ul className="basis-1/6 flex justify-start items-center ml-16 uppercase text-sm text-gray-600 font-medium">
            <li className="nva-top-menu-item">
              <a href="">
                <span>Cart</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
