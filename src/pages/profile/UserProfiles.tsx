import UserAddressCard from '../../components/UserProfile/UserAddressCard';
import UserInfoCard from '../../components/UserProfile/UserInfoCard';
import UserMetaCard from '../../components/UserProfile/UserMetaCard';
import { useGetMeQuery } from '../../redux/features/user/selfManagement';
import PageBreadcrumb from '../shared/PageBreadCrumb';
import PageMeta from '../shared/PageMeta';
import { useEffect, useState } from 'react';
import { IUser } from '../../types';
import { useAppSelector } from '../../redux/hooks';

export default function UserProfiles() {
  const token = useAppSelector((state) => state.auth.token);

  const { data: myInfo, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });
  // const user = myInfo?.data;

  const [user, setUser] = useState<IUser | null>(myInfo?.data);

  console.log(user, 'profile');
  useEffect(() => {
    if (myInfo?.data) setUser(myInfo.data);
  }, [myInfo]);

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
        title="Carhub | Digital solution"
        description="Car hub is the digital platform for buying car without any further delay"
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
