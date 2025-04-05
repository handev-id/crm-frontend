import { GoCloudOffline } from "react-icons/go";

const OfflineMessage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-neutral z-[9999] bg-Dark">
      <img src="/apple-touch-icon.png" alt="" className="w-[150px]" />
      <h2 className="flex items-center gap-2 mt-3 text-2xl">
        <span className="text-neutral">
          <GoCloudOffline />
        </span>{" "}
        Anda Offline
      </h2>
    </div>
  );
};

export default OfflineMessage;
