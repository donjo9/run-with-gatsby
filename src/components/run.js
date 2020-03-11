import React from "react";
import styled from "styled-components";
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
    
    return (
        <RunCard>
            <Header>{props.start_tid_string}</Header>
            <RunData>Tid: {props.timeString}</RunData>
            <RunData>
                Distance: {props.distanceK}km {props.distanceM}m
            </RunData>
            <RunData>Hastighed: {props.hastighed}km/h</RunData>
            <RunData>kcal: {props.total_calories}</RunData>
        </RunCard>
    );
};

export default Run;