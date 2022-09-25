import React from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import { FiMessageSquare, FiFolder, FiShoppingCart } from 'react-icons/fi';
import { RiSettings4Line } from 'react-icons/ri';

const Sidebar = () => {
  const menus = [
    {
      name: 'dashboard',
      link: '/dashboard',
      icon: <MdOutlineDashboard onClick={(name) => handleClick(name)} />,
    },
    { name: 'user', link: '/', icon: <AiOutlineUser /> },
    { name: 'messages', link: '/', icon: <FiMessageSquare /> },
    { name: 'analytics', link: '/', icon: <TbReportAnalytics /> },
    { name: 'File Manager', link: '/', icon: <FiFolder /> },
    { name: 'Cart', link: '/', icon: <FiShoppingCart /> },
    { name: 'Saved', link: '/', icon: <AiOutlineHeart /> },
    { name: 'Setting', link: '/', icon: <RiSettings4Line /> },
  ];

  const handleClick = (name) => {};
  return (
    <section className="flex gap-6">
      <div className="bg-[#0e0e0e] min-h-screen w-72 text-gray-100 px-4">
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu) => (
            <Link
              to={`${menu.link}`}
              key={menu.name}
              className="flex flex-row gap-4 items-center mx-4"
            >
              <div>{menu.icon}</div>
              <h2>{menu.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
