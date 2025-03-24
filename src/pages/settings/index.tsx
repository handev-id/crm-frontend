import SearchInput from "../../components/form/SearchInput";

const Settings = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="w-full bg-neutral/50 top-0 left-0 z-10 dark:bg-neutralHover border-b border-Dark/10 dark:border-neutral/10 sm:pl-[80px] p-6 pb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-4">Settings</h1>
          <div>{/* <SearchInput show={(val) => {}} /> */}</div>
        </div>
        <div className="flex space-x-8">
          <a className="text-gray-500 hover:text-gray-800" href="#">
            General
          </a>
          <a className="text-gray-500 hover:text-gray-800" href="#">
            Contact
          </a>
          <a className="text-gray-500 hover:text-gray-800" href="#">
            Payment
          </a>
          <a className="text-gray-500 hover:text-gray-800" href="#">
            Subscription
          </a>
          <a className="text-blue-600 font-semibold relative" href="#">
            Account
          </a>
        </div>
      </div>
      <div className="sm:pl-[80px] p-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <p className="text-gray-500 mb-6">
          Please update your profile settings here
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 border border-gray-300 rounded-l-lg px-4 py-2">
              siothui.com/
            </span>
            <input
              className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value="X-AE-A-19"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 border border-gray-300 rounded-l-lg px-4 py-2">
              <img alt="Country flag" src="https://placehold.co/20x20" />
            </span>
            <input
              className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value="+44 (158) 008-9987"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            <img
              alt="Profile picture"
              className="w-12 h-12 rounded-full"
              src="https://placehold.co/50x50"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Delete
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Biography
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          >
            Hi there! 👋 I'm X-AE-A-19, an AI enthusiast and fitness aficionado.
            When I'm not crunching numbers or optimizing algorithms, you can
            find me hitting the gym.
          </textarea>
          <p className="text-gray-500 text-sm mt-2">325 characters remaining</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
