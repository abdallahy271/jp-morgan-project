import { ServerRespond } from './DataStreamer';
 //generating values for the row of the graph
export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


//Changed the code to reflect the lowerbound, upperbound as well as the price ratio and return the value in a trigger alert
export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/ 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/ 2;
    const ratio = priceABC/priceDEF;   
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? 
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio <lowerBound) ? ratio:undefined,
    };
  }
}
