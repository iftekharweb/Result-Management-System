import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Results = () => {
  // Original marks array
  const [marksArray, setMarksArray] = useState([]);
  const [totalMarksArray, setTotalMarksArray] = useState([]);

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
        SID: marksArray.find(mark => mark.student.id === parseInt(studentId)).student.SID,
        courses: Object.keys(summedMarks[studentId]).map((courseId) => {
          const courseInfo = marksArray.find(mark => mark.section.course.code === parseInt(courseId)).section.course;
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
    setTotalMarksArray(summedMarksArray);
  }, [marksArray]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center items-center p-4">
        <p className="font-semibold text-3xl">Students Result</p>
      </div>
      <div className="w-full flex flex-col p-2">

      </div>
    </div>
  );
};

export default Results;
