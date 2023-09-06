import ToDo from "./components/ToDo";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input type="text" placeholder="Add something you want to remember....." />
          {/*For adding To Do*/}
          <div className="add">Add</div>
          </div>
          {/*For listing all To Do*/}
          <div className="list">
            <ToDo text="Hi"/>
            <ToDo text="Hi"/>
            <ToDo text="Hi"/>
          </div>
      </div>      
    </div>
  );
}

export default App;
