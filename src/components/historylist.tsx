'use client';
import { IExistingOrder } from "models/interface";
import ServiceOrder from "services/ServiceOrder";
import { useRouter } from "next/navigation";
import DataFactory from "data/api";
import React,{useState,useEffect} from "react";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";



const dataOrder = DataFactory.createData("order");

export default function HistoryLog() {
    const [page, setPage] = React.useState<number>(1);
    const [data, setData] = React.useState<IExistingOrder[]>([]);
    const [metadata, setMetadata] = React.useState<Metadata>({}); // pagination
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [serviceorders, setServiceOrders] = React.useState<any[]>([]);
    const list = dataOrder.getAll(page);
    React.useEffect(() => {
        function handleScroll() {
            dataOrder.getAll(page).then((data) => {
                setData(data.data);
                setMetadata(data.metadata);
                
            }
            );
        }
        
        handleScroll();
    }, [page]);

    


    const router = useRouter();

    let serviceOrders: ServiceOrder[] = [];
    for (let i = 0; i < data.length; i++) {
        serviceOrders.push(new ServiceOrder(data[i]));
    }
    
    
    return ( 
        <div>
            <h2>Service Order</h2>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <button onClick={() => setPage(page - 1)}>Prev</button>
            <table>
                <thead>
                    <tr>
                        <th>Passenger ID</th>
                        <th>is Vip</th>
                        <th>Departure Address</th>
                        <th>Destination Address</th>
                        <th>Driver ID</th>

                        <th>Status</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceOrders.map((row, index) => (
                        <tr key={index}>
                            <td>{row.order?.passengerId}</td>
                            <td>{row.order?.isVip}</td>
                            <td>{row.order?.departure?.address}</td>
                            <td>{row.order?.destination?.address}</td>
                            <td>{row.order?.driverId}</td>
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