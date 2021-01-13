import React from 'react';
import {Typography, List, ListItem, ListItemText} from "@material-ui/core";

const ResultsList = ({results}) => {
    console.log(results)
    if (!results.tracks || results.tracks.length === 0) {
        return (
            <Typography>
                No Results!
            </Typography>
        )
    }
    return (
        <List>
            {results.tracks.map(track => (
                <ListItem item xs={12} key={track.id}>
                    <ListItemText>
                        {track.name} - {track.artists ? track.artists[0].name : ''}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    )
}

export default ResultsList;