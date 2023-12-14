'use client';
import { IExistingOrder } from 'models/interface';
import { useEffect, useState } from 'react';
import ServiceOrder from 'services/ServiceOrder';
import { useRouter } from "next/navigation";
import SocketDataHandler from '../../data/socket';

const Order = () => {
  const socket = SocketDataHandler;
  const [data, setData] = useState<ServiceOrder[]>(socket.getAvailableOrders());
  const router = useRouter();
  

  useEffect(() => {
    const fetchData = async () => {
    try {
      const result = await socket.getAvailableOrders();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
    fetchData();
  }, [socket]) ;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Passenger Name</th>
            <th>Passenger Phone Number</th>
            <th>Departure Address</th>
            <th>Destination Address</th>
            <th>Driver Name</th>
            <th>Driver Phone Number</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
              <tr key={index}>
                <td>{row.passenger?.name()}</td>
                <td>{row.passenger?.phone()}</td>
                <td>{row.order?.departure.address}</td>
                <td>{row.order?.destination.address}</td>
                <td>{row.driver?.name()}</td>
                <td>{row.driver?.phone()}</td>
                <td>{row.order?.status}</td>
                <td>
                    <button
                        onClick={() => {
                    router.push(`/order?id=${row.order?.id}`);
                        }}
                    >
                        Detail
                    </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
