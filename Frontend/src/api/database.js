/*
Just one file for whole project because it is small, 
usually should be splitted into different categories,
for example "auth.js", "userRetrival.js" etc
*/

import axios from 'axios';
import mappings from '../mappings';


/*
    Creates a session with the server based on pernum
 */
export const userLogIn = async (pernum) => {
    try {
        const response = await axios.post(mappings.API_login, {pernum});
        const sessionExpiryDate = new Date(response.data.sessionExpiry);
        return {...response.data,
                sessionExpiry: sessionExpiryDate};
    }
    catch (err) {
        return {
                error: true,
                error_message: err.message
            };
        }
};

/*
    Destroys session in backend
*/
export const userLogOut = async () => {
    try {
        const response = await axios.get(mappings.API_logout, {withCredentials: true});
        return response.data;
    }

    catch (err) {
        return {
            data: {
                error: true,
                error_message: err.message
            }
        };
    }
};


// /*
//     Returns a list of rekems of user's gdud.
// */
// export const getRekemsOfUser = async () => {
//     try {
//         const response = await axios.get(mappings.API_get_rekems_of_user, {withCredentials: true});
//         return response.data.results;
//     }
//     catch (err) {
//         return {
//             error: true,
//             error_message: err.message
//         };
//     }
// };


/*
    Returns a summarized list of rekems at user's gdud
*/
export const getSummarizedRekemsOfUser = async() => {
    try {
        const response = await axios.get(mappings.API_get_summarized_rekems_of_user, {withCredentials: true});
        return response.data.results;
    }

    catch (err) {
        return {
            error: true,
            error_message: err.message
        };
    }
}

/*
    Returns a list of rekems of choice. Will return a valid result only if user is admin.
*/
export const getRekemsByGdud = async (gdud) => {
    try {
        const response = await axios.get(mappings.API_get_rekems_by_gdud(gdud), {withCredentials: true});
        return response.data.results;
    }
    catch (err) {
        return {
            error: true,
            error_message: err.message
        };
    }
};


/*
    Adds a rekem to user's gdud.
*/

export const addRekemToGdud = async (rekemData) => {
    try {
        const response = await axios.post(mappings.API_add_rekem, rekemData, {withCredentials: true});
        return response.data;
    }

    catch (err) {
        return {
            error: true,
            error_message: err.message
        };
    }
};


/*
    Removes by carNumber from database
*/

export const removeByCarNumber = async (carNumber) => {
    try {
        const response = await axios.delete(mappings.API_delete_rekem(carNumber), {withCredentials: true})
        return response.data;
    }

    catch (err) {
        return {
            error: true,
            error_message: err.message
        }
    }
};