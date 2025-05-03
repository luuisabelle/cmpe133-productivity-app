import React from 'react';
import Widgets from './Widgets.jsx';
import Chatbot from '../components/Chatbot.jsx';

const HomePage = ({ setIsSavingTodo, setIsSavingSchedule }) => {
  return (
      <>
        <title>Home</title>
        <Widgets setIsSavingTodo={setIsSavingTodo} setIsSavingSchedule={setIsSavingSchedule} />
        <Chatbot />
      </>
  );
};

export default HomePage;
