import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Run from "./run"
import SEO from "./seo"

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
        }
        path {
          speed
        }
      }
    }
  }
`

const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

const controlPoint = (current, previous, next, reverse) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current
  const n = next || current // The smoothing ratio
  const smoothing = 0.2 // Properties of the opposed-line
  const o = line(p, n) // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length
  const y = Number.parseFloat(current[1]) + Math.sin(angle) * length
  return [x, y]
}

const RunDetails = ({ data }) => {
  const laps = data.runwith.getRun.laps.map((x, count) => {
    const date = new Date(null)
    date.setSeconds(x.total_elapsed_time) // specify value for SECONDS here
    const timeString = date.toISOString().substr(14, 5)
    return (
      <React.Fragment key={x.timestamp}>
        <SEO />
        <LapData>{count + 1}</LapData>
        <LapData>{timeString}</LapData>
        <LapData>
          {Math.floor(x.total_distance / 1000)}km{" "}
          {Math.round(x.total_distance % 1000)}m
        </LapData>
        <LapData>{Number(x.avg_speed / 1000).toFixed(2)} km/t</LapData>
      </React.Fragment>
    )
  })

  let max = 0
  let min = 99999
  const reductionFactor = Math.ceil(data.runwith.getRun.path.length / 800)
  //console.log(reductionFactor)
  const gqlpdata = data.runwith.getRun.path.filter((x, i) => {
    if (i % reductionFactor !== 0) {
      return false
    }
    if (x.speed > max) {
      max = x.speed
    }
    if (x.speed < min) {
      min = x.speed
    }
    return true
  })
  //console.log(data.runwith.getRun.path.length)

  //console.log(min, max)
  const graphXMaxCount = gqlpdata.length * 2
  const graphValueMax = Math.ceil(max / 10000) * 100
  const graphYMaxValue = (graphXMaxCount / 16) * 4
  const graphYFactor = graphYMaxValue / graphValueMax
  //console.log(graphValueMax, graphXMaxCount, graphYFactor, graphYMaxValue)

  const pathdata = gqlpdata
    .map((d, i) => {
      return [
        i * 2,
        graphYMaxValue - Math.round(d.speed / 100).toFixed(2) * graphYFactor,
      ]
    })
    .reduce((acc, cur, i, a) => {
      if (i === 0) {
        return `M ${cur[0]},${cur[1]}`
      }

      const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], cur) // end control point
      const [cpeX, cpeY] = controlPoint(cur, a[i - 1], a[i + 1], true)
      return `${acc} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${cur[0]},${cur[1]}`
    }, "")
  const vb = `0 0 ${graphXMaxCount} ${graphYMaxValue}`
  return (
    <React.Fragment>
      {data.getRun && <Run {...data.getRun} />}
      <Lap>
        <LapData>Lap</LapData>
        <LapData>Tid</LapData>
        <LapData>Dist.</LapData>
        <LapData>Hast.</LapData>
        {laps}
      </Lap>
      <div
        style={{ width: "100%", maxWidth: "800px", padding: "0.25rem 0.6rem" }}
      >
        <svg viewBox={vb} preserveAspectRatio="xMinYMid meet">
          <g>
            <path
              d={pathdata}
              fill="none"
              stroke="white"
              strokeWidth={reductionFactor / 2}
            ></path>
          </g>
          <line
            x1="0"
            y1={graphYMaxValue}
            x2={graphXMaxCount}
            y2={graphYMaxValue}
            stroke="white"
            strokeWidth={reductionFactor}
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={graphYMaxValue}
            stroke="white"
            strokeWidth={reductionFactor}
          />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default RunDetails
