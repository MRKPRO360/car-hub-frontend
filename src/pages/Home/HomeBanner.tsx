import Carousel from '../../components/carousel/Carousel';
import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';

const HomeBanner = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  console.log(cars?.data);

  return (
    <div>
      <Carousel />
    </div>
  );
};

export default HomeBanner;
