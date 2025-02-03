import { Link, useSearchParams } from 'react-router';
import { useVerifyOrderQuery } from '../../redux/features/admin/orderManagement.api';
import { FaCheckCircle } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import Button from '../shared/Button';

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get('order_id'),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData = data?.data?.[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Order Verification
      </h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>
              <span className="font-semibold">Order ID:</span>{' '}
              {orderData?.order_id}
            </p>
            <p>
              <span className="font-semibold">Amount:</span>{' '}
              {orderData?.currency} {orderData?.amount?.toFixed(2)}
            </p>
            <p>
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-white ${
                  orderData?.bank_status === 'Success'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              >
                {orderData?.bank_status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              {new Date(orderData?.date_time)?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <p>
              <span className="font-semibold">Method:</span> {orderData?.method}
            </p>
            <p>
              <span className="font-semibold">Transaction ID:</span>{' '}
              {orderData?.bank_trx_id}
            </p>
            <p>
              <span className="font-semibold">Invoice No:</span>{' '}
              {orderData?.invoice_no}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <p>
              <span className="font-semibold">Name:</span> {orderData?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {orderData?.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              {orderData?.phone_no}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{' '}
              {orderData?.address}, {orderData?.city}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Verification Status</h2>
            <div className="flex items-center justify-center gap-2">
              {orderData?.is_verify === 1 ? (
                <>
                  <FaCheckCircle className="text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <FiAlertCircle className="text-yellow-500" />
                  <span>Not Verified</span>
                </>
              )}
            </div>

            <Link to="/user/dashboard/orders/" className="mt-4 inline-block">
              <Button type="submit" size="lg" text="View Orders" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyOrder;
