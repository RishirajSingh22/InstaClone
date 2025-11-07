import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="border p-6 rounded-lg shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-3">
          <Input type="email" placeholder="Email" />
        </div>
        <div className="mb-3">
          <Input type="password" placeholder="Password" />
        </div>
        <Button label="Login" className="w-full" />
      </form>
    </div>
  );
};

export default Login;
