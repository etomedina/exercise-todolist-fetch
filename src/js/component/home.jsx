import factoryWithTypeCheckers from "prop-types/factoryWithTypeCheckers";
import React, { useEffect, useState } from "react";

//Component Home
const Home = () => {
	const [list, setList] = useState([
		// { label: "Go to sleep", done: false },
		// { label: "Make the dinner", done: true },
	]);
	const [newtask, setNewTask] = useState({ label: "", done: false });

	//Funcion para obtener la lista que tenemos en la API
	const getTodoList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/etomedina"
		);
		const body = await response.json();
		if (!response.ok) {
			createUserList();
			return;
		}
		setList(body);
	};

	// Estado para obtener la lista luego del primer renderizado
	useEffect(() => {
		getTodoList();
	}, []);

	//Funcion para crear el user
	const createUserList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/etomedina",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			}
		);
		if (!response.ok) {
			alert(
				`fallo el GET, y luego el POST: ${response.status}: ${body.msg}`
			);
		}
		getTodoList();
	};

	//Funcion para cargar tareas en el payload
	const putList = async (ListNew) => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/etomedina",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(ListNew),
			}
		);
		return response;
	};

	const deleteList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/etomedina",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			}
		);
		return response;
	};

	//Funcion para agregar tareas a la API

	// function PutList() {
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/etomedina", {
	// 		method: "PUT",
	// 		body: JSON.stringify(todos),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((resp) => {
	// 			console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
	// 			console.log(resp.status); // el código de estado = 200 o código = 400 etc.
	// 			console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
	// 			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	// 		})
	// 		.then((data) => {
	// 			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda

	// 			console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	// 		})
	// 		.catch((error) => {
	// 			//manejo de errores
	// 			console.log(error);
	// 		});
	// }

	//Funcion para eliminar el usuario de la API

	// function DeleteList() {
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/etomedina", {
	// 		method: "DELETE",
	// 		body: JSON.stringify(todos),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((resp) => {
	// 			console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
	// 			console.log(resp.status); // el código de estado = 200 o código = 400 etc.
	// 			console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
	// 			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	// 		})
	// 		.then((data) => {
	// 			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda

	// 			console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	// 		})
	// 		.catch((error) => {
	// 			//manejo de errores
	// 			console.log(error);
	// 		});
	// }

	return (
		<div>
			<h1 className="Title">todos</h1>
			<div className="lista">
				<div className="listatop">
					<input
						type={"text"}
						id="InputTask"
						className="InputTask"
						placeholder="What needs to be done?"
						value={newtask.label}
						onChange={(e) => {
							setNewTask({
								label: e.target.value,
								done: false,
							});
						}}
						onKeyDown={async (e) => {
							if (e.key === "Enter") {
								const NewList = [...list, newtask];
								const putResponse = await putList(NewList);
								if (!putResponse.ok) {
									alert("Trouble");
									return;
								}
								//setList(NewList);
								setNewTask({
									label: "",
									done: false,
								});
								getTodoList();
							}
						}}></input>
					<button
						type="button"
						className="btn btn-warning"
						onClick={(e) => {
							deleteList();
							setList([]);
						}}>
						Delete Tasks
					</button>
				</div>

				<ul className="list-group">
					{list.map((task, index) => {
						return (
							<li
								className="list-group-item list-element"
								key={index}>
								{task.label}
								<span
									className="close"
									onClick={(e) => {
										setList(
											list.filter((task1, i) => {
												if (index == i) {
													return false;
												} else {
													return true;
												}
											})
										);
									}}>
									x
								</span>
							</li>
						);
					})}
				</ul>

				<div className="counter">
					{list.length == 0
						? "No tasks, add a task"
						: list.length + " item(s) left"}
				</div>
			</div>
			<div className="bottom-page-1"></div>
			<div className="bottom-page-2"></div>
		</div>
	);
};

export default Home;
