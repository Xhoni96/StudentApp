import { Link } from "react-router-dom";
import React from "react";
import logo from "../img/logo.jpg";
function Header({ loggedIn, setLoggedIn }) {
	const clear = () => {
		if (loggedIn) {
			setLoggedIn(false);
			localStorage.clear();
		}
	};
	return (
		<header className="flex justify-between bg-white p-3 shadow-md relative">
			<div>
				<img
					src={logo}
					alt="Logo"
					className="h-[5rem] w-[5rem] absolute top-[-10px]"
				/>
				;
			</div>
			<div className="flex w-[20%] gap-10 text-black-200">
				<Link
					to="/signIn"
					className="rounded-lg bg-gray-100 p-3 hover:bg-gray-300"
					onClick={clear}
					state="huh"
				>
					{loggedIn ? loggedIn.data.user.name : "Identifikohu"}
				</Link>
				{!loggedIn && (
					<Link
						to="/signUp"
						className="rounded-lg bg-gray-100 p-3 hover:bg-gray-300"
					>
						Regjistrohu
					</Link>
				)}
				{loggedIn && (
					<Link
						to="/students"
						className="rounded-lg bg-gray-100 p-3 hover:bg-gray-300"
					>
						Studentet
					</Link>
				)}
			</div>
		</header>
	);
}

export default Header;
