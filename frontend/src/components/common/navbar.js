import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import { useContext } from 'react';

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const { currentProfileImage, updateAuthStatus } = useContext(GlobalStateContext);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const openBlogDropdown = () => {
    setIsBlogDropdownOpen(true);
  };

  const closeBlogDropdown = () => {
    setIsBlogDropdownOpen(false);
  };

  const handleSignout = () => {
    updateAuthStatus(false)
  }

  return (
    <nav className="bg-gray-100 h-16">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-full">
          {/* Left side: Logo and navigation links */}
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0">
              <img className="h-16 w-auto" src="pictures/logo.png" alt="Your Company" />
            </div>
            <div className="hidden md:block">
              <div className="flex mr-10 space-x-4"> {/* Reduced ml value */}
                <Link to="/home" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium">Home</Link>
                {/* Blog Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={openBlogDropdown}
                  onMouseLeave={closeBlogDropdown}
                >
                  <button className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium focus:outline-none">
                    Blogs <span className="ml-1">&#9660;</span> {/* Downward-facing arrow icon */}
                  </button>
                  {isBlogDropdownOpen && (
                    <div className="absolute left-1/2 transform -translate-x-1/2  w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-1" onMouseEnter={openBlogDropdown} onMouseLeave={closeBlogDropdown}>
                      <div className="py-1 flex flex-col items-center" role="none">
                        <Link to="/blogs?category=" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium" role="menuitem">All Blogs</Link>
                        <Link to="/blogs?category=Business" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium" role="menuitem">Business</Link>
                        <Link to="/blogs?category=Travel" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium" role="menuitem">Travel</Link>
                        <Link to="/blogs?category=Finance" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium" role="menuitem">Finance</Link>
                        <Link to="/blogs?category=Sports" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium" role="menuitem">Sports</Link>
                        <Link to="/blogs?category=Technology" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium" role="menuitem">Technology</Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/postblog" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium">Post Blog</Link>
                <Link to="/aboutus" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium">About Us</Link>
                <Link to="/contactus" className="text-neutral-700 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium">Contact Us</Link>
              </div>
            </div>
          </div>


          {/* Right side: Profile menu and social icons */}
          <div className="flex items-center">
            <div className="ml-3 relative flex items-center">
              {/* Social Icons */}
              <div className="flex items-center space-x-3 mr-3">
                <a href='#'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    {/* Instagram icon */}
                  </svg>
                </a>
                <a href='#'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-snapchat" viewBox="0 0 16 16">
                    {/* Snapchat icon */}
                    <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.4.4 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a1 1 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464" />
                  </svg>
                </a>

                <a href='#'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    {/* LinkedIn icon */}
                  </svg>
                </a>
              </div>
              {/* Profile Icon */}
              <div className='ml-3'>
                <button
                  onClick={toggleProfileMenu}
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <img className="h-8 w-8 rounded-full" src={`http://localhost:5001/api/fetchImage?path=${currentProfileImage}`} alt="" />
                </button>
                {isProfileMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="py-1" role="none">
                      <a href="/" onClick={handleSignout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                    </div>
                  </div>
                )}
              </div>



            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
