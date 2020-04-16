import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Run from "./run"
import SEO from "./seo"
import { formatDateTImeString } from "../utils/utils"
import { LineChart, Line as ReLine, XAxis, YAxis, Tooltip} from 'recharts';

const Lap = styled.div`
  padding: 0.25rem 0.6rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, max-content)) 1fr;
  border: 1px solid var(--shade-color);
  margin: 0px;
`
const LapData = styled.div`
  padding: 0.25rem 0.6rem;
  &:nth-child(8n + 1),
  &:nth-child(8n + 2),
  &:nth-child(8n + 3),
  &:nth-child(8n + 4) {
    background-color: var(--shade-color);
  }
`
export const query = graphql`
  query($tag: String!) {
    runwith {
      getRun(tag: $tag) {
        id
        total_distance
        total_calories
        start_time
        total_elapsed_time
        enhanced_avg_speed
        timestamp
        laps {
          timestamp
          start_time
          total_elapsed_time
          total_distance
          avg_speed
          enhanced_avg_speed
        }
        path {
          speed
          enhanced_speed
          timestamp
          distance
        }
      }
    }
  }
`
const TooltipContainer = styled.div`
  background-color: rgba(52, 49, 61, 0.75);
  padding: 5px;
`


function CustomTooltip({ payload, label, active, zero }) {
  if (active) {
    return (
      <TooltipContainer>
        <div>{`Tid: ${label.toFixed(2)} `}km</div>
        <div>{`Dist: ${payload[0].value.toFixed(2)} `}km/t</div>
      </TooltipContainer>
    );
  }

  return null;
}

const RunDetails = ({ data }) => {
  const laps = data.runwith.getRun.laps.map((x, count) => {
    const date = new Date(null)
    date.setSeconds(x.total_elapsed_time) // specify value for SECONDS here
    const timeString = date.toISOString().substr(14, 5)
    return (
      <React.Fragment key={x.timestamp}>
        <LapData>{count + 1}</LapData>
        <LapData>{timeString}</LapData>
        <LapData>
          {Math.floor(x.total_distance / 1000)}km{" "}
          {Math.round(x.total_distance % 1000)}m
        </LapData>
        <LapData>{Number(x.enhanced_avg_speed).toFixed(2)} km/t</LapData>
      </React.Fragment>
    )
  })

  const reductionFactor = Math.ceil(data.runwith.getRun.path.length / 800)

  const rechartdata = data.runwith.getRun.path.filter((x, i) => {
    if (i % reductionFactor !== 0) {
      return false
    }
    return true
  }).map((x,i) => {
    const speed = Math.floor(x.enhanced_speed * 100) / 100;
    const distance = Math.floor(x.distance * 100) / 100;
    return {distance, speed}
  });
  //
    const start_tid_string = formatDateTImeString(data.runwith.getRun.start_time);
    const date = new Date(null);
    date.setSeconds(data.runwith.getRun.total_elapsed_time); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    const distanceK = Math.floor(data.runwith.getRun.total_distance / 1000);
    const distanceM = Math.round(data.runwith.getRun.total_distance % 1000);
    const hastighed = Number(data.runwith.getRun.enhanced_avg_speed).toFixed(2);
  //

  let xticks = [];
  for(let i=0; i<= distanceK+0.5; i+=0.5) {
    xticks.push(i);
  }
  console.log(xticks);
  return (
    <React.Fragment>
      <SEO title={`Løb: ${start_tid_string}`} description={`Tid: ${timeString} - Dist. ${distanceK}km ${distanceM}m - Hastighed: ${hastighed}`}/>
      {data.runwith.getRun && <Run start_tid_string={start_tid_string} timeString={timeString} distanceK={distanceK} distanceM={distanceM} total_calories={data.runwith.getRun.total_calories} hastighed={hastighed}/>}
      <Lap>
        <LapData>Lap</LapData>
        <LapData>Tid</LapData>
        <LapData>Dist.</LapData>
        <LapData>Hast.</LapData>
        {laps}
      </Lap>
      <LineChart width={800} height={400} data={rechartdata}>
        <ReLine type="natural" dataKey="speed" stroke="#8884d8" dot={false} />
        <Tooltip content={<CustomTooltip zero="0"/>} animationDuration="250" />
        <XAxis dataKey="distance" ticks={xticks} unit="km"/>
        <YAxis unit="km/t"/>
      </LineChart>
    </React.Fragment>
  )
}

export default RunDetails
