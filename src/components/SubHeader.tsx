import { useNavigate } from "react-router-dom";

const SubHeader = ({ title, icon }: { title: string; icon: JSX.Element }) => {
  const navigate = useNavigate();

  return (
    <div className="flex lg:hidden h-16 rounded my-2 px-3 items-center gap-3">
      <span onClick={() => navigate(-1)} className="text-2xl cursor-pointer">{icon}</span>
      <span>{title}</span>
    </div>
  );
};

export default SubHeader;
