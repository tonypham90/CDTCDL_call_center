import { IExistingOrder } from 'models/interface';
import { useEffect, useState } from 'react';
import ServiceOrder from 'services/ServiceOrder';
import ServiceUser from 'services/ServiceUser';
import { io } from 'socket.io-client';

const SERVER_URL = process.env.API_SERVER || 'https://grabapi-192a6fe739cb.herokuapp.com'; // replace with your server URL
let listOrder: ServiceOrder[] = [];
const Order = () => {
  const [data, setData] = useState<IExistingOrder[]>([]);

  for (let i = 0; i < data.length; i++) {
    const order = new ServiceOrder(data[i]);
    listOrder.push(order);
  }
  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.emit('getConnectedOrders');

    socket.on('connectedOrders', (newData: IExistingOrder[]) => {
      setData(newData);
    });

    // cleanup function will run when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

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
              <td>{row.passenger}</td>
              <td>{row.column2}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
