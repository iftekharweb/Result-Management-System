import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Results = () => {
  const [marksArray, setMarksArray] = useState([]);
  const [totalMarksArray, setTotalMarksArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getMarks = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/marks/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMarksArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMarks();
  }, []);
  useEffect(() => {
    const summedMarks = {};

    marksArray.forEach((mark) => {
      const studentId = mark.student.id;
      const courseId = mark.section.course.code;

      if (!summedMarks[studentId]) {
        summedMarks[studentId] = {};
      }

      if (!summedMarks[studentId][courseId]) {
        summedMarks[studentId][courseId] = {
          totalMarks: 0,
          marks: [],
        };
      }

      const totalMarks =
        parseFloat(mark.final_exam_marks) +
        parseFloat(mark.ct_marks) +
        parseFloat(mark.presentation_marks) +
        parseFloat(mark.attendance_marks);
      summedMarks[studentId][courseId].totalMarks += totalMarks;
      summedMarks[studentId][courseId].marks.push({
        finalExamMarks: parseFloat(mark.final_exam_marks),
        ctMarks: parseFloat(mark.ct_marks),
        presentationMarks: parseFloat(mark.presentation_marks),
        attendanceMarks: parseFloat(mark.attendance_marks),
      });
    });
    const summedMarksArray = Object.keys(summedMarks).map((studentId) => {
      return {
        studentId: parseInt(studentId),
        SID: marksArray.find((mark) => mark.student.id === parseInt(studentId))
          .student.SID,
        courses: Object.keys(summedMarks[studentId]).map((courseId) => {
          const courseInfo = marksArray.find(
            (mark) => mark.section.course.code === parseInt(courseId)
          ).section.course;
          console.log(courseInfo.title);
          return {
            courseId: parseInt(courseId),
            title: courseInfo.title,
            credit: parseFloat(courseInfo.credit),
            totalMarks: summedMarks[studentId][courseId].totalMarks,
            marks: summedMarks[studentId][courseId].marks,
          };
        }),
      };
    });

    let result = [];

    summedMarksArray.forEach((student) => {
      let CmulG = 0;
      let totalC = 0;

      student.courses.forEach((course) => {
        let T = course.credit * 25;
        let P = (course.totalMarks / T) * 100;
        let grade = 0;
        if (P < 40) grade = 0;
        else if (P < 45) grade = 2.0;
        else if (P < 50) grade = 2.25;
        else if (P < 55) grade = 2.5;
        else if (P < 60) grade = 2.75;
        else if (P < 65) grade = 3.0;
        else if (P < 70) grade = 3.25;
        else if (P < 75) grade = 3.5;
        else if (P < 80) grade = 3.75;
        else grade = 4.0;

        totalC += course.credit;
        CmulG += grade * course.credit;
      });

      const cgpa = totalC !== 0 ? parseFloat((CmulG / totalC).toFixed(2)) : 0;

      result.push({ student: student.SID, cgpa: cgpa });
    });

    setTotalMarksArray(result);
    console.log(result);
  }, [marksArray]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMarks = totalMarksArray.filter((data) =>
    data.student.toString().includes(searchQuery)
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row justify-between items-center p-4">
        <p className="font-semibold text-3xl">Students Result</p>
        <div className="px-4">
        <input
          type="text"
          placeholder="Search by student ID"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        </div>
      </div>
      <div className="w-full flex flex-col p-2 justify-start items-center">
        <div className="w-[50%] flex flex-row justify-between bg-[#1b1b1b] text-white font-semibold px-5 py-2 rounded-md">
          <p>Student Id</p>
          <p>CGPA</p>
        </div>
        {filteredMarks.map((data) => (
          <div className="w-[50%] flex flex-row justify-between px-5 py-2 rounded-md">
            <p>{data.student}</p>
            {data.cgpa != 0 ? (
              <p>{data.cgpa}</p>
            ) : (
              <p className="text-red-600">Failed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
