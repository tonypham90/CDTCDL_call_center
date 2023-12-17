'use client';
import * as React from 'react';

import DataFactory  from 'data/api';
import ServiceOrder from '../../services/ServiceOrder';
import { Metadata } from 'next';


const dataOrder = DataFactory.createData("order");


export default function Home() {
  const [order, setOrder] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<any[]>([]);
  const [listServiceOrder, setListServiceOrder] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [id, setId] = React.useState('');
  const [page, setPage] = React.useState<number>(1);
  const [metadata, setMetadata] = React.useState<Metadata>({}); // pagination
  const ServiceOrderTable = React.lazy(() => import('../../components/serviceOrderTable'));
  const [TableService , setTableService] = React.useState<any>();

  React.useEffect(() => { 
    listOrder();
    

  }, []);

  const listOrder = async () => {
    try {
      setLoading(true);
      const data = await dataOrder.getAll(page);
      setOrder(data.data);
      setMetadata(data.metadata);
      console.log(data);
      const dataService = [];
      for (let i = 0; i < data.data.length; i++) {
        const service = new ServiceOrder(data.data[i].id);
        dataService.push(service);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


    

  return (
    <div>
      <h1>history Page</h1>
      <p>This is the home page content.</p>
        <h2>Service Order</h2>
        <React.Suspense fallback={<div>Loading...</div>}>
    <ServiceOrderTable order={order} />
  </React.Suspense>
    </div>
  );
}