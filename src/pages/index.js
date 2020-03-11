import React from "react"
import { Link } from "gatsby"
import Run from "../components/run"
import styled from "styled-components"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { formatDateTImeString } from "../utils/utils"

const Runs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
`

const RunLink = styled(Link)`
  text-decoration: none;
  color: #f8f8f8;
  &:hover {
    background-color: var(--shade-color);
  }
`
export const query = graphql`
  query {
    runwith {
      getRuns {
        id
        tag
        total_distance
        total_calories
        start_time
        total_elapsed_time
        enhanced_avg_speed
        timestamp
      }
    }
  }
`
const RunList = ({ data }) => {
  return (
    <Runs>
      <SEO title="Hjem"/>
      {data.runwith.getRuns &&
        data.runwith.getRuns
          .sort((a, b) => b.start_time - a.start_time)
          .map(x => {
              const start_tid_string = formatDateTImeString(x.start_time);
            const date = new Date(null);
            date.setSeconds(x.total_elapsed_time); // specify value for SECONDS here
            const timeString = date.toISOString().substr(11, 8);
            const distanceK = Math.floor(x.total_distance / 1000);
            const distanceM = Math.round(x.total_distance % 1000);
            const hastighed = Number(x.enhanced_avg_speed).toFixed(2);
              return (
            <RunLink key={x.id} to={`/${x.tag}`}>
              <Run {...{start_tid_string, timeString, distanceK, distanceM, hastighed, total_calories: x.total_calories }} />
            </RunLink>
          )})}
    </Runs>
  )
}

export default RunList
