export interface Transaction {
    sender: string;
    recipient: string;
    amount: number;

}

export interface IBlock {
    index: number;
    timestamp: string;
    data: string;
    prevHash: string;
    hash: string;
}

export type IBlockChain = IBlock[]
