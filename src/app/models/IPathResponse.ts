export default interface IPathResponse {
  origin: string;
  destination: string;
  price: number;
  flightCarrier?: string;
  flightNumber?: string;
}
