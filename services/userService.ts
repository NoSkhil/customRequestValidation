const getAllData = async(email:string) : Promise<{err?:string, data?: object}> => {
    try {
        const userObject = {name:"efeaf",email , id:"aedad"};
        return {data:userObject};
    }
    catch(err) {
        return {err};
    }
};

export default {getAllData};