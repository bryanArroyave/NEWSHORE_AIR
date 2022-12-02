/* eslint-disable no-restricted-syntax */
import IFligthResponse from './IFligthResponse';
import IPathResponse from './IPathResponse';
import { Journey } from './Journey';

export class AirGraph {
  private MDistances: number[][] = [];
  private MFinal: number[][] = [];
  private MPath: string[][] = [];
  private nodesLabels: string[];
  private nodes: Array<Journey>;
  constructor() {
    this.nodes = [];
    this.nodesLabels = [];
  }

  addNode(origin: string, data: Partial<IFligthResponse>) {
    let journey = this.nodes.find(node => node.origin === origin);
    if (!this.nodes.find(node => node.origin === origin)) {
      journey = new Journey(origin);
      this.nodesLabels.push(origin);
      this.nodes.push(journey);
    }
    journey.addFligth(data.arrivalStation, data.price, data.flightCarrier, data.flightNumber);
  }


  private floydWAlgorithm() {
    const dist = this.init(this.MDistances);
    const size = this.MDistances.length;
    for (let k = 0; k < size; k += 1) {
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            this.MPath[i][j] = this.nodesLabels[k];
          }
        }
      }
    }
    return dist;
  }


  private init(graph: any): any {
    const dist = [];
    const size = graph.length;
    for (let i = 0; i < size; i += 1) {
      dist[i] = [];
      for (let j = 0; j < size; j += 1) {
        if (i === j) {
          dist[i][j] = 0;
        } else if (!Number.isFinite(graph[i][j])) {
          dist[i][j] = Infinity;
        } else {
          dist[i][j] = graph[i][j];
        }
      }
    }
    return dist;
  }


  fill() {
    for (let i = 0; i < this.nodes.length; i++) {
      const xFill = [];
      const xFill2 = [];
      for (let j = 0; j < this.nodes.length; j++) {
        let value;
        let value2;
        const hasFlight = this.nodes[i].hasFlight(this.nodesLabels[j]);
        if (i === j) {
          value = 0;
          value2 = '-';
        } else if (hasFlight) {
          value = hasFlight.price;
          value2 = this.nodesLabels[j];
        } else {
          value = Infinity;
          value2 = this.nodesLabels[j];
        }
        xFill.push(value);
        xFill2.push(value2);
      }
      this.MDistances.push(xFill);
      this.MPath.push(xFill2);
    }
    this.MFinal = this.floydWAlgorithm();

    this.show(this.MFinal);
    this.show(this.MPath);

    return this.MFinal;
  }

  getTotal(origin: string, destination: string) {
    const originIndex = this.nodesLabels.findIndex(label => label === origin);
    const destinationIndex = this.nodesLabels.findIndex(label => label === destination);

    return this.MFinal[originIndex][destinationIndex];
  }


  getPath(origin: string, destination: string, cant: number, path: any[] = []): IPathResponse[] {
    if (cant > 0 && path.length >= cant) {
      return [];
    }
    const originIndex = this.nodesLabels.findIndex(label => label === origin);
    const destinationIndex = this.nodesLabels.findIndex(label => label === destination);
    const nodeStr = this.MPath[originIndex][destinationIndex];
    if (nodeStr === destination) {
      const node = this.nodes.find(el => el.origin === origin);

      const flights = node.searchFlight(destination);

      return [{ ...flights.transport, origin, destination, price: this.MFinal[originIndex][destinationIndex] }, ...path];
    }
    const newDestinationIndex = this.nodesLabels.findIndex(label => label === nodeStr);
    const node = this.nodes.find(el => el.origin === nodeStr);
    const flights = node.searchFlight(destination);

    return this.getPath(
      origin,
      nodeStr,
      cant,
      [{ ...flights.transport, origin: nodeStr, destination, price: this.MFinal[originIndex][newDestinationIndex] }, ...path]
    );
  }


  show(graph: any[][]) {
    let data = '';
    for (const label of this.nodesLabels) {
      data += `\t${label}`;
    }
    data += '\n';

    for (let i = 0; i < graph.length; i++) {
      data += `${this.nodesLabels[i]}`;
      for (let j = 0; j < graph.length; j++) {
        if (typeof graph[i][j] !== 'string' && !Number.isFinite(graph[i][j])) {
          data += '\tINF';
        } else {
          data += `\t${graph[i][j]}`;
        }
      }
      data += '\n';
    }
    console.log(data);
  }
}


