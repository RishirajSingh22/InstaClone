const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-3 mt-10 border-t">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} React TS App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
