'use client';
import { IExistingOrder } from "models/interface";
import ServiceOrder from "services/ServiceOrder";
import { useRouter } from "next/navigation";

export default function ServiceOrderTable(data: IExistingOrder[]) {
    const router = useRouter();
    let serviceOrders: ServiceOrder[] = [];
    for (let i = 0; i < data.length; i++) {
        serviceOrders.push(new ServiceOrder(data[i]));
    }
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
                    {serviceOrders.map((row, index) => (
                        <tr key={index}>
                            <td>{row.passenger?.fullName}</td>
                            <td>{row.passenger?.phone}</td>
                            <td>{row.order?.departure.address}</td>
                            <td>{row.order?.destination.address}</td>
                            <td>{row.driver?.fullName}</td>
                            <td>{row.driver?.phone}</td>
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
    )
}