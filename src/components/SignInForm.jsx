import { Box, Typography, Card, FormGroup, TextField, Button, FormLabel, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";

/*
props: 
{onSubmitHandler}
{isLoading}
{errorMessage}
*/

const SignInForm = (props) => {
    const {handleSubmit, register, formState} = useForm({
        defaultValues: {
            pernum: ''
        }
    });

    const { errors } = formState;

    const boxSX = {
        padding: 3,
        bgcolor: 'black',
        borderRadius: 6,
    };

    const cardSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        paddingBottom: 4
    };

    const formGroupSX = {marginTop: 3, padding: 3, width:"100%"};

    const buttonSX = {borderRadius: 3, marginTop: 4, padding: 1.5, width: "20%"};
    return (
        <Box sx={boxSX}>
            <Card component='form' onSubmit={handleSubmit(props.onSubmitHandler)} sx={cardSX}>
                <Typography variant="h5" mt={3}>הכנס מספר אישי</Typography>
                <FormGroup sx={formGroupSX}>
                    <TextField {...register("pernum", {required: "שדה זה לא יכול להישאר ריק!", pattern: {value:  /^\d+$/, message: "מספר אישי חייב להכיל רק ספרות"}})} error={!!errors.pernum} />
                    {!!errors.pernum &&<FormLabel error sx={{paddingTop: 1}}>{errors.pernum?.message}</FormLabel>}
                </FormGroup>
                {props.errorMessage !== '' && <FormLabel error sx={{paddingTop: 1}}>{props.errorMessage}</FormLabel>}
                {props.isLoading ? <CircularProgress color="primary" /> : <Button variant="contained" type="submit" sx={buttonSX}>התחבר</Button>}
            </Card>
        </Box>
    );
}

export default SignInForm;