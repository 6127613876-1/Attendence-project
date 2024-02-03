import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, serverTimestamp } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data';

function App() {
  const [attendence, setAttendence] = useState([]);
  const [submittedStudents, setSubmittedStudents] = useState([]);

  const attendenceCollectionRef = collection(db, "attendence");

  const onSubmitAttendence = async (student) => {
    try {
      // Store the attendance data and current date/time in Firestore
      await addDoc(attendenceCollectionRef, {
        regno: student.Register_No,
        attendence: true,
        date_and_time: serverTimestamp(),
      });

      // Update the submittedStudents state
      setSubmittedStudents((prevStudents) => [...prevStudents, student.Register_No]);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    const getAttendence = async () => {
      try {
        const data = await getDocs(attendenceCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAttendence(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getAttendence();
  }, [attendenceCollectionRef]);

  

  return (
    <div className="App">
      <div st>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name of the Student</th>
                <th>Register Number</th>
                <th>Roll Number</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td style={{ color: submittedStudents.includes(item.Register_No) ? "green" : "red" }}>
                    {item.Name_of_the_student}
                  </td>
                  <td className={attendence.find(a => a.Regno === item.Register_No)?.Attendence ? 'submitted' : 'not-submitted'}>
                    {item.Register_No}
                  </td>
                  <td>{item.Roll_No}</td>
                  <td>
                    <button onClick={() => onSubmitAttendence(item)}>
                      Submit Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default App;
