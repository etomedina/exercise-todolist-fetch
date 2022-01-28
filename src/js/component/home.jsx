import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [list, setList] = useState(["Go to sleep", "Go to the park"]);
	const [newtask, setNewTask] = useState("");
	return (
		<div>
			<h1 className="Title">todos</h1>
			<div className="lista">
				<input
					type={"text"}
					id="InputTask"
					className="InputTask"
					placeholder="What needs to be done?"
					value={newtask}
					onChange={(e) => {
						setNewTask(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							const NewList = [...list, newtask];
							setList(NewList);
							setNewTask("");
						}
					}}></input>
				<ul className="list-group">
					{list.map((task, index) => {
						return (
							<li
								className="list-group-item list-element"
								key={index}>
								{task}
								<span
									className="close-item"
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
			</div>
			<div className="ShadowList"></div>
			<div className="ShadowList"></div>
		</div>
	);
};

export default Home;
