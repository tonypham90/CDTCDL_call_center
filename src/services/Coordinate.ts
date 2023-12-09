import { ILocation } from '../models/interface';
class CoordinateService {
    displayMap(LocationDeparture: ILocation, LocationDriver: ILocation) {
        // Display the map using the provided latitude and longitude
    }

    convertAddressToCoordinates(address: string): { latitude: number, longitude: number } {
        // Convert the provided address to coordinates and return them
        return { latitude: 0, longitude: 0 };
    }

    findLocationOnMap(location: string) {
        // Find the provided location on the map
    }
}
