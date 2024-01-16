import React from 'react';
import {Button, Divider} from '@mui/material';

export default function Undo(props) {

    const data = props.data;
    const update = props.update;

    return (
        <>
            <Divider sx={{
                my: 3
            }}/>
            <Button onClick={() => {
                data.undo()
                update()
            }} fullWidth
                    color={"secondary"}
                    variant={"outlined"}>
                Undo
            </Button>
        </>
    )

}
