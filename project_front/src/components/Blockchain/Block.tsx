import {Paper, CardContent, Typography, Button} from '@mui/material';
import {IBlock} from "../../types";
import React, {useState} from "react";
import {blockchainApi} from "../../api/blockchain";

export const Block = ({block}: { block: IBlock }) => {
    const {index, timestamp, data, prevHash, hash} = block;
    const [id, transactionTimestamp, sender, recipient, amount, signature] = data.split(';');
    const [verified, setVerified] = useState('Not verified')
    const verifyTransaction = async (e) => {
        const result = await blockchainApi.verify(data);
        if (result && result.data && result.data.isValid === true){
            setVerified('Verified')
        } else if (result && result.data && result.data.isValid === false) {
            setVerified('INVALID TRANSACTION')
        }
    }
    const getFormattedTimestamp = (timestamp: string) => {
        const currentTime = new Date();
        const blockTime = new Date(timestamp);

        const diffInMinutes = Math.floor(
            (currentTime.getTime() - blockTime.getTime()) / 1000 / 60
        );

        return `${diffInMinutes} minutes ago`;
    };
    const formattedTimestamp = getFormattedTimestamp(timestamp);

    return (
        <Paper elevation={4} className={'card-block'}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {index === 0 ? 'GENESIS BLOCK' : `Block #${index}`}
                </Typography>
                <div className={'block-content'}>
                    <div className={'block-details'}><Typography variant="body1">
                        Timestamp: {formattedTimestamp}
                    </Typography>
                        <Typography variant="body1">
                            Data:
                        </Typography>

                        <Typography variant="body1">
                            Previous Hash: <b>{prevHash}</b>
                        </Typography>
                        <Typography variant="body1">
                            Hash: <b>{hash}</b>
                        </Typography></div>
                    <div className={'transaction-details'}>
                        <Typography variant="body1">
                            <b>Transaction details: </b>
                        </Typography>
                        <Typography variant="body2">
                            Sender: {sender}
                        </Typography>
                        <Typography variant="body2">
                            Recipient: {recipient}
                        </Typography>
                        <Typography variant="body2">
                            Amount: {amount}
                        </Typography>
                        <Typography variant="body2">
                            Signature: {signature}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            <div style={{display: "flex"}}>
                <Button onClick={e => verifyTransaction(e)}>Verify</Button> <Typography
                variant='body1'>{verified}</Typography>
            </div>
        </Paper>
    );
}