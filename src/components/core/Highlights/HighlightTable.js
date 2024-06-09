import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

// import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
// import { FaCheck } from "react-icons/fa"
// import { FiEdit2 } from "react-icons/fi"
// import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"

import { formatDate } from "../../../services/formatDate"
import { deleteCourse,fetchInstructorCourses} from "../../../services/operations/courseDetailsAPI"
import ConfirmationModal from "../../common/ConfirmationModal"


export default function HighlightTable({ highlights, setHighlights }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleHighlightDelete = async (highlightId) => {
    setLoading(true)
    console.log("Deleting: ",highlightId)
    await deleteCourse({ _id: highlightId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setHighlights(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <Table className="rounded-xl border border-gray-800 ">

        <Thead>
          <Tr className="flex pl-16 gap-x-12 sticky rounded-t-md border-b text-left text-xl font-medium text-amber-900 uppercase border-b-gray-800 px-6 py-2">
            <Th className="flex-1 sticky">
              Highlight
            </Th>
            <Th className="flex-1">Url</Th>
            <Th>Created</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>

        <Tbody>

          {highlights?.length === 0 ? (

            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-gray-700">
                No highlights found
              </Td>
            </Tr>

          ) : (

            highlights?.map((highlight) => (

              <Tr
                key={highlight._id}
                className="flex gap-x-10 border-b border-gray-800 px-6 py-8 pr-10"
              >

                <Td className=" flex-1 gap-x-4">
                    {highlight.text}
                </Td>

                <Td className="text-sm flex-1 text-blue-500 cursor-pointer underline font-medium hover:text-blue-600 ">
                  <a href={highlight.url} target="_blank" rel="noopener noreferrer">
                      {highlight.url}
                  </a>
                </Td>

                <Td className="text-sm font-medium  mr-[-8px]">
                    {formatDate(highlight.createdAt)}
                </Td>

                <Td className="text-sm font-medium text-richblack-100 ">

                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this highlight?",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleHighlightDelete(highlight._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>

              </Tr>

            ))
          )}
        </Tbody>

      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}