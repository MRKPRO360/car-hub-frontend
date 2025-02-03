import { FaCalendar, FaLock, FaUnlock, FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useGetMeQuery } from '../../redux/features/admin/userManagement.api';

const ManageProfile = () => {
  const { data: myInfo, isLoading } = useGetMeQuery(undefined);

  const user = myInfo?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl shadow-blue/20 rounded-sm p-6 max-w-2xl w-full flex flex-col sm:flex-row items-center sm:items-start">
        <img
          src={user.profileImg}
          alt={user.name}
          className="w-40 h-40 rounded-full border-4 border-blue/80 sm:mr-6"
        />
        <div className="text-center sm:text-left flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2 sm:mt-0 flex items-center gap-2">
            <FaUser className="w-5 h-5 text-gray-700" /> {user.name}
          </h2>
          <p className="text-gray-600 flex items-center gap-2">
            <IoMdMail className="w-5 h-5 text-gray-700" /> {user.email}
          </p>

          <div className="mt-4 space-y-2">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${
                user.isBlocked
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {user.isBlocked ? (
                <FaLock className="w-4 h-4" />
              ) : (
                <FaUnlock className="w-4 h-4" />
              )}
              {user.isBlocked ? 'Blocked' : 'Active'}
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-500 flex items-center gap-2">
            <FaCalendar className="w-5 h-5 text-gray-700" />
            Joined on {new Date(user.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
