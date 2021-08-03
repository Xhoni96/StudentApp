import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
function SignIn() {
	const [signInData, setSignInData] = useState({
		nid: "",
		password: "",
	});
	const [message, setMessage] = useState({
		showSuccessAlert: false,
		showFailAlert: false,
	});

	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(signInData),
	};

	const changehandler = (e) => {
		setSignInData({ ...signInData, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const resp = await fetch(
				"http://localhost:8000/api/v1/users/login",
				requestOptions
			);
			const data = await resp.json();
			if (data.status === "success")
				setMessage({ showSuccessAlert: true, showFailAlert: false });
			setSignInData({
				nid: "",
				password: "",
			});
		} catch (error) {
			setMessage({ showSuccessAlert: false, showFailAlert: true });
		}
	};
	return (
		<form
			className="flex flex-col items-center gap-3 mt-32"
			onSubmit={submitHandler}
		>
			{message.showSuccessAlert && (
				<label className="p-2 pl-10 pr-10 rounded-lg mb-4  bg-green-300 ">
					Sukses
				</label>
			)}
			{message.showFailAlert && (
				<label className="p-2 pl-10 pr-10 rounded-lg mb-4  bg-red-700-300 ">
					Error
				</label>
			)}

			<FormInput
				changehandler={changehandler}
				type="text"
				name="nid"
				label="NID"
				// value={postData.nid}
				required
			/>
			<FormInput
				changehandler={changehandler}
				type="password"
				name="password"
				label="Fjalekalimi"
				// value={postData.name}
				autoComplete="off"
				required
			/>

			<Button name="Identifikohu" type="submit" isBlack="true" />
		</form>
	);
}

export default SignIn;
