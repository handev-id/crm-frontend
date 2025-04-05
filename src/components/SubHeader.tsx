import { Link, useNavigate } from "react-router-dom";

const SubHeader = ({ title, icon }: { title: string; icon: JSX.Element }) => {

  return (
    <div className="flex lg:hidden h-16 rounded my-2 px-3 items-center gap-3">
      <Link to={'/settings'} className="text-2xl cursor-pointer">{icon}</Link>
      <span>{title}</span>
    </div>
  );
};

export default SubHeader;
