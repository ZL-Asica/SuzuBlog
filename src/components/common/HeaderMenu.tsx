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

interface HeaderMenuProperties {
  translation: Translation;
  isMobile: boolean;
  ulClassName?: string;
  onClickHandler?: () => void;
}

const HeaderMenu = ({
  translation,
  isMobile,
  ulClassName = '',
  onClickHandler,
}: HeaderMenuProperties) => {
  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <FaHouse /> },
    {
      href: '/posts',
      label: translation.posts.title,
      icon: <FaRegNewspaper />,
    },
    {
      href: '/friends',
      label: translation.friends.title,
      icon: <FaPeopleGroup />,
    },
    { href: '/about', label: translation.about.title, icon: <FaInfo /> },
  ];

  return (
    <ul className={`gap-4 ${ulClassName}`}>
      {menuItems.map((item, index) => (
        <>
          {/* Link as Full Width */}
          <li
            key={item.href}
            className='group relative flex w-full items-center justify-center rounded-lg hover:bg-[var(--lightGray)]'
          >
            <Link
              href={item.href}
              title={item.label}
              className={`relative flex w-full items-center gap-4 px-4 py-3 text-lg font-medium no-underline transition-all duration-300 ease-in-out group-hover:text-[var(--sakuraPink)]`}
              onClick={onClickHandler}
              aria-label={`${translation.navigate} ${item.label}`}
            >
              <span className='inline-block transition-transform duration-300 ease-in-out group-hover:scale-125'>
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>

          {/* Divider */}
          {isMobile && index < menuItems.length - 1 && (
            <li className='w-full'>
              <div className='h-[1px] w-full bg-gradient-to-r from-[var(--lightGray)] via-[var(--sakuraPink)] to-[var(--lightGray)]'></div>
            </li>
          )}
        </>
      ))}
    </ul>
  );
};

export default HeaderMenu;
