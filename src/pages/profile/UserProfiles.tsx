import UserAddressCard from '../../components/UserProfile/UserAddressCard';
import UserInfoCard from '../../components/UserProfile/UserInfoCard';
import UserMetaCard from '../../components/UserProfile/UserMetaCard';
import { useGetMeQuery } from '../../redux/features/admin/userManagement.api';
import PageBreadcrumb from '../shared/PageBreadCrumb';
import PageMeta from '../shared/PageMeta';

export default function UserProfiles() {
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
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/1 lg:p-6">
        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} />
          <UserAddressCard user={user} />
        </div>
      </div>
    </>
  );
}
