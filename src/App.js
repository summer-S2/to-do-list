import React, { useEffect, useState, useRef, memo } from "react";
import NowDate from './NowDate'
import './App.css';

// 초기 데이터
const initialTasks = [
  {id: "todo-0", name: "목록 1", completed: true},
  {id: "todo-1", name: "목록 2", completed: false},
  {id: "todo-2", name: "목록 3", completed: false},
];


const FILTER_MAP = {
  전체: () => true,
  진행중: task => !task.completed,
  완료: task => task.completed,
};

// FILTER_NAMES 대로 object를 생성
const FILTER_NAMES = Object.keys(FILTER_MAP); // 전체,진행중,완료


function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('전체');
  const [isEditing, setIsEditing] = useState(false); // 수정중 filterbutton 비활성화용

  // tasks 추적하기
  console.log(tasks);

  // task를 추가하고 tasks를 업데이트하는 함수
  function addTask (name) {
    const newTask = {
      id: `todo-${Math.random()}`,
      name,
      completed: false,
    }

    const updatedTasks = [...tasks, newTask];
    console.log(updatedTasks);
    setTasks(updatedTasks);
    setIsEditing(false); // 마지막 tasks를 delete후에 add하는 경우를 대비
    
  }

  // task를 삭제하는 함수
  function deleteTask (id) {
    const remainingTask = tasks.filter(task => task.id !== id);
    setTasks(remainingTask);
    if (tasks.length === 1) { // 삭제하는 순간에 lenth가 1이면 tasks.lenth === 0이 됨
      setIsEditing(true);
    }
  }

  // 완료상태를 바꾸는 함수
  function toggleTaskCompleted (id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  // task의 name을 바꾸는 함수
  function editTask (id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTasks);
  }

  // FILTER_NAMES대로 filter button을 생성
  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={filter === name}
      setFilter={setFilter}
      isEditing={isEditing}
    />
  ));

  // 할 일 목록을 담은 변수
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
      setIsEditing={setIsEditing}
    />
  ));

  return (
    <div className="max-w-sm h-auto duration-300 mx-auto mt-4 border-4 border-double rounded-2xl shadow-xl" id="mainContainer">
      <div className="p-4 rounded-t-2xl">
        <h1 
          className="text-2xl text-white text-center font-bold my-4" id="mainTitle" 
        >
          To Do List
        </h1>
        <NowDate />
      </div>

      <div className="p-4">
        <Form addTask={addTask} />

        <div className="flex flex-nowrap gap-1 mb-4">
          {filterButtons}
        </div>

        <ul className="">
          {taskList}
        </ul>
      </div>
    </div>
  );
}



// task를 추가하는 form
const Form = memo(function Form(props) {
  const [name, setName] = useState("");

  // form의 추가하기를 눌렀을 때
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  return(
    <form
      className="mb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2 focus:outline-none focus:ring focus:ring-[#B2C8DF]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        placeholder="새로 입력하기"
      />
      <button
        type="submit"
        className="p-1 w-full border text-[#6E85B7] font-bold bg-[#F8F9D7] hover:scale-[102%] duration-300  disabled:opacity-50"
        disabled={!name.trim()}
      >
        추가하기
      </button>
    </form>
  )
})

// filter button 컴포넌트
const FilterButton = memo(function FilterButton(props) {
  // console.log(props.isEditing) // Todo의 isEditing 결과를 App으로 보내서 가져옴

  return(
    <button
      className={"p-1 mx-2 w-1/3 border bg-[#F8F9D7] text-[#6E85B7] hover:scale-110 hover:ring hover:ring-[#B2C8DF] duration-300 " + (props.isPressed && "outline outline-[#B2C8DF] font-bold")} // filter === name가 true면 뒤 실행
      onClick={() => props.setFilter(props.name)}
      disabled={props.isEditing}
    >
      {props.name}
    </button>
  )
})

// Todo의 El focus를 위해 이전값을 추적하는 함수
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const Todo = memo(function Todo(props) {
  // console.log(props); // props = 각 task <Todo 컴포넌트에서 전달받음>
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const inputEl = useRef(null); // {current: null}
  const buttonEl = useRef(null);
  const wasEditing = usePrevious(isEditing); // isEditing의 이전값 추적
  // console.log(wasEditing); 

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setIsEditing(false);
    props.setIsEditing(false);
    // input을 비운다
    setNewName("");
  };

  // 포커스 dom 조작
  useEffect(() => { // 비동기 (버츄얼돔때문)
    if (!wasEditing && isEditing) { // 이전에 수정한값이 없고 현재 수정중이면
      inputEl.current.focus();
    }
    if (wasEditing && !isEditing) { // 이전에 수정한값이 있고 현재 수정중이 아니면
      buttonEl.current.focus();
    }
  }, [wasEditing, isEditing]);


  // 기본 모드
  const viewTemplate = (
    <>
      <div className="flex mb-2">
        <label className="cursor-pointer flex items-center">
          <input
            type="checkbox"
            className="peer hidden"
            checked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)} // checkbox에서 onChange는 check
          />
          <div className="relative inline-block h-[16px] w-[16px] mr-2 outline outline-gray-300 rounded-md bg-white peer-checked:bg-[#B2C8DF] duration-500">
            {props.completed && <div className="absolute w-[14px] h-[10px] left-[1px] top-[1px] border-t-4 border-r-4 rotate-[130deg] duration-500"></div>}
          </div>
          <span className="font-medium text-[#F8F9D7] peer-checked:line-through peer-checked:text-gray-400 duration-500">
            {props.name}
          </span>
        </label>
      </div>
      <div className="absolute top-2 right-0 h-6 flex flex-nowrap gap-1 text-xs">
        <button
          type="button"
          className="h-full p-1 border rounded-lg text-[#6E85B7] font-semibold hover:scale-110 duration-500 bg-[#B2C8DF]"
          onClick={() => {setIsEditing(true); props.setIsEditing(true);}}
          ref={buttonEl}
        >
          수정
        </button>
        <button
          className="h-full p-1 border rounded-lg text-[#6E85B7] font-semibold hover:scale-110 duration-300 bg-[#B2C8DF]"
          onClick={() => props.deleteTask(props.id)}
        >
          삭제
        </button>
      </div>
    </>
  );


  // 수정 모드
  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="border px-2 py-1 w-full mb-2 focus:outline-none focus:ring focus:ring-[#B2C8DF] text-xs"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        ref={inputEl}
        placeholder={`이전 목표: ${props.name}`}
      />
      <div>
        <div className="flex h-6 flex-nowrap gap-1 text-xs">
          <button
            type="button"
            className="w-1/2 h-full p-1 border bg-[#F8F9D7] text-[#6E85B7] font-semibold hover:opacity-50 duration-300"
            onClick={() => {setIsEditing(false); props.setIsEditing(false);}}
          >
            취소
          </button>
          <button
            type="submit"
            className="w-1/2 h-full p-1 border disabled:opacity-50 bg-[#F8F9D7] text-[#6E85B7] font-semibold hover:opacity-50 duration-300"
            disabled={!newName.trim()}
          >
            저장
          </button>
        </div>
      </div>
    </form>
  );


  return (
    <li className="relative mb-4 p-2 border-b-2 border-b-[#C4D7E0] " id="taskLi">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
})

export default App;