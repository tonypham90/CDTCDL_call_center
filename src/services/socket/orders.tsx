import { IExistingOrder } from 'models/interface';
import { useEffect, useState } from 'react';
import ServiceOrder from 'services/ServiceOrder';
import { io } from 'socket.io-client';
import {useRouter} from "next/router";

const SERVER_URL = process.env.API_SERVER || 'https://grabapi-192a6fe739cb.herokuapp.com'; // replace with your server URL
let listOrder: ServiceOrder[] = [];
const Order = () => {
  const [data, setData] = useState<IExistingOrder[]>([]);
  const router = useRouter();



  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.emit('getConnectedOrders');

    socket.on('connectedOrders', (newData: IExistingOrder[]) => {
      setData(newData);
    });

    for (let i = 0; i < data.length; i++) {
      const order = new ServiceOrder(data[i]);
      listOrder.push(order);
    }

    // cleanup function will run when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {listOrder.map((row, index) => (
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
                          router.push(`/order/${row.order?.id}`);
                        }}
                    >
                        Detail
                    </button>
                </td>

                {/* Add more cells as needed */}
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
