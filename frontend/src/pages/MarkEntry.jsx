import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MarkEntry = ({ semester, year, section, handleState, sectionName, courseName }) => {
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/students/");
      const filteredStudents = response.data.filter(
        (student) =>
          student.semester.year === year && student.semester.name === semester
      );
      const updatedStudents = filteredStudents.map((student) => ({
        ...student,
        active: false,
        posted: false,
      }));
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [section]);


  const [fullExamMark, setFullExamMark] = useState(null);
  const [presentationMark, setPresentationMark] = useState(null);
  const [ctMark, setCtMark] = useState(null);
  const [attendanceMark, setAttendanceMark] = useState(null);

  const [currUid, setCurrUid] = useState(null);
  const [currSID, setCurrSID] = useState(null);

  const activeStatus = (_uid, _sid) => {
    setCurrUid(_uid);
    setCurrSID(_sid);
    const newStudents = students.map((student) => {
      if (student.id === _uid) {
        return {
          ...student,
          active: true,
        };
      } else {
        return {
          ...student,
          active: false,
        };
      }
    });
    setStudents(newStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const s = {
      section: section,
      student: currUid,
      final_exam_marks: parseFloat(fullExamMark),
      ct_marks: parseFloat(ctMark),
      presentation_marks: parseFloat(presentationMark),
      attendance_marks: parseFloat(attendanceMark)
    }
    console.log(s);
    try {
      const authToken = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.post(
        "http://127.0.0.1:8000/marks/create/",
        {
          section: section,
          student: currUid,
          final_exam_marks: parseFloat(fullExamMark),
          ct_marks: parseFloat(ctMark),
          presentation_marks: parseFloat(presentationMark),
          attendance_marks: parseFloat(attendanceMark)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      const updatedStudents = students.map((student) => {
        if (student.id === currUid) {
          return {
            ...student,
            posted: true,
          };
        }
        return student;
      });
      setStudents(updatedStudents);
    } catch (error) {
      console.error(error)
    }
    
    setFullExamMark(0.0);
    setPresentationMark(0.0);
    setCtMark(0.0);
    setAttendanceMark(0.0);
    setCurrSID(null);
    setCurrUid(null);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-semibold">Marks Entry</h1>
        <p>ICE {courseName} | Section {sectionName}</p>
      </div>

      <div className="w-full flex flex-row ">
        <div className="w-[50%] flex flex-col p-3">
          <div className="w-full flex flex-row p-2 bg-slate-200 rounded-md m-2 font-serif font-semibold">
            <div className="w-[40%] px-2">
              <p>Student ID</p>
            </div>
            <div className="w-[40%] px-2">
              <p>Session</p>
            </div>
          </div>
          {students.map(
            (student) =>
              student.posted === false && (
                <div key={student.id}>
                  <div className="w-full flex flex-row p-2 bg-slate-200 rounded-md m-2">
                    <div className="w-[40%] px-2">
                      <p>{student.SID}</p>
                    </div>
                    <div className="w-[40%] px-2">
                      <p>{student.session}</p>
                    </div>
                    {student.posted ? (
                      <div className="w-[20%] px-2">
                        <div className="p-3 rounded-lg bg-green-600"></div>
                      </div>
                    ) : (
                      <div className="w-[20%] px-2">
                        {student.active ? (
                          <button className="text-red-700 rounded-md font-bold">
                            Adding
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              activeStatus(student.id, student.SID)
                            }
                            className="text-sky-800 rounded-sm font-semibold"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
        <div className="w-[50%]">
          {currSID && (
            <div className="w-full flex justify-center items-center">
              <p className="text-red-500 font-bold">Add marks for {currSID}</p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-4 rounded-md m-2"
          >
            <div className="mb-4">
              <label
                htmlFor="fullExamMark"
                className="block font-semibold mb-2"
              >
                Full Exam Mark
              </label>
              <input
                type="number"
                id="fullExamMark"
                value={fullExamMark}
                onChange={(e) => setFullExamMark(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="presentationMark"
                className="block font-semibold mb-2"
              >
                Presentation Mark
              </label>
              <input
                type="number"
                id="presentationMark"
                value={presentationMark}
                onChange={(e) => setPresentationMark(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ctMark" className="block font-semibold mb-2">
                CT Mark
              </label>
              <input
                type="number"
                id="ctMark"
                value={ctMark}
                onChange={(e) => setCtMark(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="attendanceMark"
                className="block font-semibold mb-2"
              >
                Attendance Mark
              </label>
              <input
                type="number"
                id="attendanceMark"
                value={attendanceMark}
                onChange={(e) => setAttendanceMark(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Marks
            </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <button
          onClick={handleState}
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-10 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MarkEntry;
