const Header = () => {
  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-lg">React TypeScript App</h1>
      <nav className="flex gap-4">
        <a href="/">Home</a>
        <a href="/users">Users</a>
      </nav>
    </header>
  );
};

export default Header;
