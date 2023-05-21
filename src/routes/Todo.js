import React, { useState, useEffect } from "react";
import Icon, { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

export function Todo() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);

    const [form] = Form.useForm();

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        };

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr)); //store array as string to local storage
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, index + 1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo);
    };

    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = mm + '-' + dd + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn
        }

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    };

    const handleDeleteCompletedTodo = (index) => {
        let reducedTodo = [...completedTodos];
        reducedTodo.splice(index, index + 1);

        localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo);
    }

    const onFinish = () => {
        handleAddTodo();
        form.resetFields();
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'))
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
        if (savedTodo) {
            setTodos(savedTodo);
        }

        if (savedCompletedTodo) {
            setCompletedTodos(savedCompletedTodo);
        }

    }, [])

    return (
        <div className="todo">
            <h1>My Todos</h1>

            <div className='todo-wrapper'>
                <Form
                    form={form}
                    layout="inline"
                    onFinish={onFinish}
                >
                    <div className='todo-input'>
                        <div className='todo-input-item'>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a title for your task!',
                                    },
                                ]}
                            >
                                <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title?" />
                            </Form.Item>
                        </div>
                        <div className='todo-input-item'>
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <Input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description?" />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <div className='todo-input-item'>
                                <Button type='primary' htmlType="submit" className='primaryBtn'>Add</Button>
                            </div>
                        </Form.Item>
                    </div>
                </Form>

                <div className='btn-area'>
                    <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
                    <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
                </div>
                <div className='todo-list'>
                    {isCompleteScreen === false && allTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <DeleteOutlined className='icon' onClick={() => handleDeleteTodo(index)} title="Delete?" />
                                    <CheckOutlined className='check-icon' onClick={() => handleComplete(index)} title="Complete?" />
                                </div>
                            </div>
                        )
                    })}

                    {isCompleteScreen === true && completedTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed on: {item.completedOn}</small></p>
                                </div>
                                <div>
                                    <DeleteOutlined className='icon' onClick={() => handleDeleteCompletedTodo(index)} title="Delete?" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </div >
    )
}

export default Todo;