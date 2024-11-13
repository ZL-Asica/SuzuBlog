import Link from 'next/link';
import {
  FaHouse,
  FaRegNewspaper,
  FaPeopleGroup,
  FaInfo,
} from 'react-icons/fa6';

interface MenuItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

const renderMenuItems = (isMobile: boolean, onClickHandler?: () => void) => {
  const menuItems: MenuItem[] = [
    { href: '/', label: 'Home', icon: <FaHouse /> },
    { href: '/posts', label: 'Posts', icon: <FaRegNewspaper /> },
    { href: '/friends', label: 'Friends', icon: <FaPeopleGroup /> },
    { href: '/about', label: 'About', icon: <FaInfo /> },
  ];

  return menuItems.map((item) => (
    <li
      key={item.href}
      className='group relative'
    >
      <Link
        href={item.href}
        className='relative inline-flex items-center gap-2 p-2 no-underline transition-all duration-300 ease-in-out hover:scale-110'
        onClick={onClickHandler}
        aria-label={`Navigate to ${item.label}`}
      >
        {item.icon}
        {item.label}
        {!isMobile && (
          <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-sakuraPink transition-all duration-300 group-hover:w-full'></span>
        )}
      </Link>
    </li>
  ));
};

export default renderMenuItems;
