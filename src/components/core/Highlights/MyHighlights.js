import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import HighlightTable from "./HighlightTable"

export default function MyHighlights() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    const FetchHighlights = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setHighlights(result)
      }
    }
    FetchHighlights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {highlights && <HighlightTable highlights={highlights} setHighlights={setHighlights} />}
    </div>
  )
}