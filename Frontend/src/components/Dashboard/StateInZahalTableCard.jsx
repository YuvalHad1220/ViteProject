/*
props = {
    setGdudQuery,
    isLoading,
    sx
}
*/
import {Box, Button, CircularProgress, Snackbar, Alert, TextField, Typography} from "@mui/material"
import RekemTable from "../Datastructures/RekemTable";
import { useContext, useRef, useState } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import DisplayCard from "../UI/DisplayCard";

const StateInZahalTableCard = (props) => {

    const searchRef = useRef('');
    const ctx = useContext(SiteContext);
    const [queryRekemList, setQueryRekemList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState('');
    const [open, setOpen] = useState(false);


    const headerSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    };

    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        height: '100%',
        ...props.sx
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        ctx.getRekemListByGdud(searchRef.current.value)
        .then((result) => setQueryRekemList(result))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };


    const onDeleteClick = (carNumber, setLoading) => {
        setLoading(true);
        ctx.removeByCarNumber(carNumber)
        .then(() => {
            setQueryRekemList((prevValue) => prevValue.filter(item => item.carNumber !== carNumber));
            setDeleteStatus(`${carNumber} נמחק בהצלחה`);
        })
        .catch((err) => setDeleteStatus(err.message))
        .finally(() => setLoading(false));
    };

    const RekemGroupHeader = (
        <Box sx={headerSX}>
             <Typography sx={{marginTop: 4, marginX: 4, color: 'secondary.light'}} variant="h5">חיפוש לפי גדוד:</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    sx={{m: 2,}}
                    label="חיפוש לפי גדוד"
                    variant="standard"
                    InputLabelProps={{sx: {color: 'secondary.light'}}}
                    inputRef={searchRef}/>
                    <Button type="submit" color="primary" sx={{marginTop: 4}}>חפש</Button>
                </form>
        </Box>
    );


    const wasNotTouched = searchRef.current.value === '';
    const isEmptyQuery = searchRef.current.value !== '' && queryRekemList.length === 0;

    return (
        <>
        {deleteStatus !== '' &&
        <Snackbar open={open} autoHideDuration={6000} onClose={(open) => setOpen(!open)} >
            <Alert severity="success" sx={{ width: '100%' }}>
                {deleteStatus}
            </Alert>
        </Snackbar>
        }
        <DisplayCard sx={boxSX}>
            {RekemGroupHeader}
            {isLoading ? <CircularProgress color="primary" /> 
            :
            isEmptyQuery ? 
            <Typography variant="h5" sx={{p: 4, textAlign: "center"}}>אין רקמים בגדוד זה. לחילופין וודא שהכנסת מספר גדוד נכון</Typography>
            :
            wasNotTouched ? 
            <Typography variant="h5" sx={{p: 4, textAlign: "center"}}>הקלד מספר גדוד ולאחר מכן חפש על מנת להציג רקמים</Typography>
            :
            <RekemTable onDeleteClick={onDeleteClick} gdud={searchRef.current.value} rekemList = {queryRekemList} sx={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: '100%'}} />
            }
        </DisplayCard>
        </>

    );
    
};

export default StateInZahalTableCard;