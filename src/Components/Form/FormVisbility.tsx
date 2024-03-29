import * as React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Dialog, DialogActions, DialogContent, Divider, IconButton, Paper,} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormLayout from "./FormLayout";
import {RequestQueryStatus} from "../../Type/type";
import LinearBuffer from "../LinearBuffer";
import QRcode from "../QRcode";
import {toggleVisibility} from "../../hooks/useSmc";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";


interface Iprops {
    children?: React.ReactNode,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    title?: string | undefined,
    description?: string | undefined,
    action?: string,
    disabled?: boolean,
    hash: string,
}

const FormVisbility = (props: Iprops) => {

    const { open = false, setOpen, title, action, disabled} = props;
    const {NONE, LOADING, SUCCESS, ERROR} = RequestQueryStatus
    const [requestStatus, setRequestStatus] = useState<RequestQueryStatus>(NONE);
    const [response, setResponse] = useState<string>("")
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCertifiedVisibility = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRequestStatus(LOADING);
        toggleVisibility(props.hash).then((res) => {
            setResponse(res.events.evtCertifiedVisibility.returnValues[0])
            setRequestStatus(SUCCESS);
        }).catch((err) => {
            setRequestStatus(ERROR);
        })
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(props.hash)
    }
    const renderContent = () => {
        switch (requestStatus) {
            case LOADING:
                return <div style={{display: "flex"}}>
                    <LinearBuffer/>
                </div>;
            case SUCCESS:
                return <div><Typography variant={"h5"}>Visbility
                    status</Typography><Typography
                    noWrap={true}>{response}</Typography>
                    <Divider sx={{p:1}} variant={"middle"}/>
                    <Typography variant={"h5"} sx={{pt:1}}>Hash Template</Typography><Typography
                        noWrap={true}>{props.hash}</Typography>
                    <IconButton>
                        <ContentCopyIcon color="secondary" onClick={handleCopy}/>
                    </IconButton>
                    <QRcode hash={props.hash}/>

               </div>;
            case ERROR:
                return <Typography>Error</Typography>;
            default:
                return <Typography variant='h5'>Please notice that this action will hide the personal information of the user concerned by
                    this
                    certification</Typography>;
        }
    }
    return (
        <div>
            <Card sx={{maxWidth: 345}} style={{borderRadius: 20}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Divider/>
                    <Typography gutterBottom sx={{mb: 2, mt: 1}} variant="body2" color="text.secondary">

                    </Typography>

                    {disabled ?
                        <Button disabled variant="contained" onClick={handleClickOpen}>{action}</Button> :
                        <Button variant="contained" onClick={handleClickOpen}>{action}</Button>}
                </CardContent>
            </Card>
            <Dialog
                sx={{borderRadius: 20}}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <div><DialogContent> <FormLayout title={title} description={""}/> {renderContent()}
                </DialogContent></div>

                <DialogActions>
                    {requestStatus===NONE? <Button onClick={(e) => handleCertifiedVisibility(e)}>Confirm</Button>:<></>}
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>)
}

export default FormVisbility
