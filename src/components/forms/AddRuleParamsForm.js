import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addParameters } from '../../services/operations/createRuleAPI';

const AddRuleParamsForm = () => {
    const { register, control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'parameters',
    });

    const onSubmit = async (data) => {
        console.log(data);
        let result = await addParameters(data);
        if (result) {
            console.log(result)
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-5 max-h-[89.5vh] overflow-y-scroll scrollbar-hide">
                {fields.map((parameter, index) => (
                    <div
                        key={parameter.id}
                        className="bg-white p-4 rounded-md shadow-md flex flex-col gap-y-3"
                    >
                        <TextField
                            {...register(`parameters.${index}.name`)}
                            label="Parameter Name"
                            className=""
                            fullWidth
                        />
                        <Button
                            type="button"
                            variant="contained"
                            color="error"
                            onClick={() => remove(index)}
                            className="mt-2 bg-red-600 text-white w-[20%]"
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
            <div className='flex gap-x-3 w-full justify-center items-center mt-4'>
                <Button
                    type="button"
                    onClick={() => append({ name: '' })}
                    className="mt-4 mr-2 bg-blue-500 text-white p-2 rounded z-10"
                    variant='contained'
                >
                    Add Parameter
                </Button>
                <Button type="submit" variant="contained" className="mt-4 mr-2 bg-green-400 text-white p-2 rounded z-10">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AddRuleParamsForm;
