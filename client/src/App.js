import { Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { SignUp, Students } from "./pages";
import { useState } from "react";

function App() {
	const [loggedIn, setLoggedIn] = useState(
		localStorage.getItem("user") === null
			? false
			: JSON.parse(localStorage.getItem("user"))
	);

	return (
		<div className="bg-gray-100 h-screen ">
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

			<Switch>
				<Route
					path="/signIn"
					component={() => (
						<SignUp
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
							login="/signIn"
						/>
					)}
				/>
				<Route
					path="/signUp"
					component={() => (
						<SignUp
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
							login="/signUp"
						/>
					)}
				/>
				<Route path="/students" component={Students} />
			</Switch>
		</div>
	);
}

export default App;
