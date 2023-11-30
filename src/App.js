
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomeView from "./layouts/HomeView";
import AdminView from "./layouts/AdminView"
import StudyProgramList from './components/StudyProgram.js/StudyProgramList';
import StudyProgramAdd from './components/StudyProgram.js/StudyProgramAdd'
import StudyProgramUpdate from './components/StudyProgram.js/StudyProgramUpdate';
import LectureUpdate from './components/Lecture/LectureUpdate';
import LecturerUpdate from './components/Lecturer/LecturerUpdate';
import LectureDateUpdate from './components/LectureDate/LectureDateUpdate';
import LectureList from "./components/Lecture/LectureList";
import LecturerList from "./components/Lecturer/LecturerList";
import LectureDateList from "./components/LectureDate/LectureDateList";
import LectureAdd from "./components/Lecture/LectureAdd";
import Dashboard from "./components/Dashboard";
import Calender from "./components/Calender";
import LectureDateAdd from "./components/LectureDate/LectureDateAdd";
import LecturerAdd from "./components/Lecturer/LecturerAdd";
import HomePageTextView from "./layouts/HomePageTextView";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/homepage" element={<HomePageTextView />} />
        <Route path="/admin" element={<AdminView />} >
          <Route index element={<StudyProgramList />} />
          <Route path="/admin/studyprograms" element={<StudyProgramList />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/calender" element={<Calender/>} />
          <Route path="/admin/add-study-program" element={<StudyProgramAdd />} />
          <Route path="/admin/add-lecturedate" element={<LectureDateAdd />} />
          <Route path="/admin/add-lecturer" element={<LecturerAdd />} />
          <Route path="/admin/edit-study-program/:id" element={<StudyProgramUpdate />} />
          <Route path="/admin/edit-lecturedate/:id" element={<LectureDateUpdate />} />
          <Route path="/admin/edit-lecture/:id" element={<LectureUpdate />} />
          <Route path="/admin/edit-lecturer/:id" element={<LecturerUpdate />} />
          <Route path="/admin/lectures" element={<LectureList />} />
          <Route path="/admin/lecturers" element={<LecturerList />} />
          <Route path="/admin/lecturedates" element={<LectureDateList />} />
          <Route path="/admin/add-lecture" element={<LectureAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
