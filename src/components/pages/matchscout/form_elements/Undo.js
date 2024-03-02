import React from 'react';
import {Button} from '@mui/material';

export default function Undo(props) {

    const data = props.data;
    const update = props.update;

    const shouldUndoDataCondition = props.shouldUndoDataCondition || (() => true);

    return (
        <Button onClick={() => {
            if (shouldUndoDataCondition()) data.undo();
            update()
        }} fullWidth
                color={"secondary"}
                variant={"outlined"}>
            Undo
        </Button>
    )

}
