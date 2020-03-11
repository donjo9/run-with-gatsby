import React from "react";
import styled from "styled-components";
import { formatDateTImeString } from "../utils/utils";
const RunCard = styled.div`
    display: flex;
    text-decoration: none;
    flex-direction: column;
    color: #f8f8f8;
    margin: 8px;
    padding: 0px 16px;
    border: 1px solid var(--shade-color);
    
`;

const Header = styled.h3`
    margin: 4px;
`;

const RunData = styled.div`
    margin: 4px;
`;

const Run = props => {
    const start_tid_string = formatDateTImeString(props.start_time);
    const date = new Date(null);
    date.setSeconds(props.total_elapsed_time); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    return (
        <RunCard>
            <Header>{start_tid_string}</Header>
            <RunData>Tid: {timeString}</RunData>
            <RunData>
                Distance: {Math.floor(props.total_distance / 1000)}km{" "}
                {Math.round(props.total_distance % 1000)}m
            </RunData>
            <RunData>Hastighed: {Number(props.enhanced_avg_speed).toFixed(2)}km/h</RunData>
            <RunData>kcal: {props.total_calories}</RunData>
        </RunCard>
    );
};

export default Run;