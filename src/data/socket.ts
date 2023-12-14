import { io, Socket } from 'socket.io-client';
import { IExistingOrder, ILocation } from '../models/interface';
import data from './data';
import ServiceOrder from 'services/ServiceOrder';

class SocketData {
    private static instance: SocketData;
    private socket: Socket;

    constructor() {
        // Initialize the socket connection
        this.socket = io(process.env.API_SERVER || 'https://grabapi-192a6fe739cb.herokuapp.com', { autoConnect: true, transports: ['websocket'], upgrade: false, rejectUnauthorized: false, secure: true, reconnection: true, reconnectionDelay: 1000, reconnectionDelayMax: 5000, reconnectionAttempts: Infinity, timeout: 20000 });
        // Add event listeners for socket events
        this.socket.on('connect', this.onConnect);
        this.socket.on('data', this.onData);
        this.socket.on('disconnect', this.onDisconnect);
        this.socket.on('getOrders', this.onGetOrders);
        this.socket.emit('getOrders', 'getOrders');
    }

    public static getInstance(): SocketData {
        if (!SocketData.instance) {
            SocketData.instance = new SocketData();
        }
        return SocketData.instance;
    }

    onGetOrders(arg0: string, onGetOrders: any) {
        throw new Error('Method not implemented.');
    }

    private onConnect() {
        console.log('Connected to socket server');
    }

    private onData(data: any) {
        console.log('Received data:', data);
        // Process the received data here
    }

    private onDisconnect() {
        console.log('Disconnected from socket server');
    }

    public sendData(data: any) {
        // Send data to the server
        this.socket.emit('data', data);
    }

    public getDriverLocation(orderId: string) {
        let location: ILocation = { latitude: 0, longitude: 0 };
        // Send data to the server
        this.socket.emit('driverOfOrderLocation', orderId);
        // Listen for the response
        this.socket.on('location', (data: ILocation) => {
            location = data
        })
        return location;
    }

    public getAvailableOrders() {
        let orders: IExistingOrder[] = [];
        let output: ServiceOrder[] = [];
        // Send data to the server
        this.socket.emit('getConnectedOrders', 'getOrders');
        // Listen for the response
        this.socket.on('connectedOrders', (data) => {
            orders = data as IExistingOrder[];
        })
        orders.forEach(order => {
            output.push(new ServiceOrder(order));
        })

        return output;
    }
}

export default SocketData.getInstance();
