import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MarkEntry = () => {
  const [students, setStudents] = useState([]);
  const [marksAdded, setMarksAdded] = useState(false);
  const [uid, setUid] = useState(null);

  const navigate = useNavigate();

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (user) {
        setUid(user.user_id);
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  // Pending

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/students/")
      .then((response) => {
        const filteredStudents = response.data.filter(
          (student) => student.semester.year === year && student.semester.name === "Odd"
        );
        const updatedStudents = filteredStudents.map((student) => ({
          ...student,
          posted: false,
        }));
        setStudents(updatedStudents);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [year]);

  const handleMarksChange = (studentId, field, value) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          [field]: parseFloat(value),
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const addMarks = async (studentId, marks) => {
    try {
      const authToken = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.post(
        "http://127.0.0.1:8000/marks/create/",
        {
          section: section,
          student: studentId,
          ...marks,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      setMarksAdded(true);
      console.log("Marks added successfully:", response.data);
    } catch (error) {
      console.error("Error adding marks:", error);
    }
  };

  return (
    <div>
      <h1>Marks Entry</h1>

      {marksAdded && <p>Marks added successfully!</p>}

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Final Exam Marks</th>
            <th>CT Marks</th>
            <th>Presentation Marks</th>
            <th>Attendance Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(
            (student) =>
              student.posted === false && (
                <tr key={student.id}>
                  <td>{student.SID}</td>
                  <td>{student.user.first_name}</td>
                  <td>{student.user.last_name}</td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleMarksChange(
                          student.id,
                          "final_exam_marks",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleMarksChange(
                          student.id,
                          "ct_marks",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleMarksChange(
                          student.id,
                          "presentation_marks",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleMarksChange(
                          student.id,
                          "attendance_marks",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        addMarks(student.id, {
                          final_exam_marks: student.final_exam_marks,
                          ct_marks: student.ct_marks,
                          presentation_marks: student.presentation_marks,
                          attendance_marks: student.attendance_marks,
                        })
                      }
                    >
                      Add Marks
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarkEntry;
