import React from "react"
import { Link } from "gatsby"
import Run from "../components/run"
import styled from "styled-components"
import SEO from "../components/seo"
import { graphql } from "gatsby"

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
      <SEO />
      {data.runwith.getRuns &&
        data.runwith.getRuns
          .sort((a, b) => b.start_time - a.start_time)
          .map(x => (
            <RunLink key={x.id} to={`/${x.tag}`}>
              <Run {...x} />
            </RunLink>
          ))}
    </Runs>
  )
}

export default RunList
