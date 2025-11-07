import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import UserList from "@/features/users/pages/UserList";
import NotFound from "@/pages/NotFound";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-[80vh] p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
