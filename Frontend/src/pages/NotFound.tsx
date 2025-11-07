const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-gray-600">
      <h1 className="text-4xl font-bold mb-3">404</h1>
      <p className="text-lg">Page Not Found</p>
      <a href="/" className="text-blue-600 mt-2">
        Go back home
      </a>
    </div>
  );
};

export default NotFound;
