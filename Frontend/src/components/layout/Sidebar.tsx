const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 border-r h-screen p-4">
      <ul className="space-y-2">
        <li>
          <a href="/" className="block p-2 hover:bg-gray-200 rounded">
            Home
          </a>
        </li>
        <li>
          <a href="/users" className="block p-2 hover:bg-gray-200 rounded">
            Users
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
