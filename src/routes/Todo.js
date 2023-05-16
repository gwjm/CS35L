import React from "react";

function Todo() {
    return (
        <div className="todo">
            <h1>My Todos</h1>

            <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label>Title</label>
                        <input type="text" placeholder="What's the task title?" />
                    </div>
                    <div className='todo-input-item'>
                        <label>Description</label>
                        <input type="text" placeholder="What's the task description?" />
                    </div>
                    <div className='todo-input-item'>
                        <button type='button' className='primaryBtn'>Add</button>
                    </div>
                </div>

                <div className='btn-area'>
                    <button>Todo</button>
                    <button>Completed</button>
                </div>
                <div className='todo-list'>
                    <div className='todo-list-item'>
                        <div>
                            <h3>Task 1</h3>
                            <p>Description</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;