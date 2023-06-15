import {useEffect, useState} from "react";
import {blockchainApi} from "../../api/blockchain";
import {IBlockChain, Transaction} from "../../types";
import {TextField, Button} from '@mui/material';
import './BlockChain.css'
import {Block} from "./Block";

export const BlockChain = () => {
    const [chain, setChain] = useState<IBlockChain>([]);
    const [transaction, setTransaction] = useState<Transaction>({
        sender: '',
        recipient: '',
        amount: 0,
    });
    const getChain = async () => {
        const result = await blockchainApi.getChain();
        setChain(result.data);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setTransaction((prevTransaction) => ({
            ...prevTransaction,
            [name]: value,
        }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        blockchainApi.postBlock(transaction)
            .then((response) => {
                getChain();
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        // Reset the form
        setTransaction({sender: '', recipient: '', amount: 0});
    };

    useEffect(() => {
        getChain();
    }, [])

    return <div className={'blockchain-container'}>
        <div className={'transaction-form-container'}>
            <form className={'transaction-form'} onSubmit={handleSubmit}>
                <TextField
                    className={'transaction-form-field'}
                    name="sender"
                    label="Sender"
                    disabled={true}
                    value={transaction.sender}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    className={'transaction-form-field'}
                    name="recipient"
                    label="Recipient"
                    value={transaction.recipient}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    className={'transaction-form-field'}
                    name="amount"
                    label="Amount"
                    type="number"
                    value={transaction.amount}
                    onChange={handleInputChange}
                    fullWidth
                    inputProps={{min: 0}}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Send Transaction
                </Button>
            </form>
        </div>
        <div className={'blockchain-chain'}>{chain.map(block => <Block block={block}></Block>)}</div>

    </div>
}
