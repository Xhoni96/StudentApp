import { useHistory } from "react-router-dom";

import { Form, Input, Button } from "antd";
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

function SignUp(params) {
	const path = params.login;
	let history = useHistory();

	const onFinish = async (values) => {
		const resp = await fetch(
			`http://localhost:8000/api/v1/users/${
				path === "/signIn" ? "login" : "signup"
			}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		);
		const data = await resp.json();
		if (data.status === "success") {
			localStorage.setItem("user", JSON.stringify(data));
			params.setLoggedIn(JSON.parse(localStorage.getItem("user")));
			history.push("/students");
		}
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="flex justify-center items-center h-[80%]">
			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				{path === "/signIn" ? (
					<>
						<Form.Item
							label=" NID"
							name="nid"
							rules={[
								{
									required: true,
									message: "Ju lutem plotesoni NID!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Ju lutem vendosni passwordin!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>
					</>
				) : (
					<>
						<Form.Item
							label=" NID"
							name="nid"
							rules={[
								{
									required: true,
									message: "Ju lutem plotesoni NID!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label=" Emri"
							name="name"
							rules={[
								{
									required: true,
									message: "Ju lutem vendosni emrin tuaj!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label=" Mbiemri"
							name="surname"
							rules={[
								{
									required: true,
									message: "Ju lutem vendosni mbiemrin tuaj !",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label=" Fjalekalimi"
							name="password"
							rules={[
								{
									required: true,
									message: "Ju lutem vendosni fjalekalimin!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label=" Konfirmo passw &nbsp"
							name="passwordConfirm"
							rules={[
								{
									required: true,
									message: "Ju lutem perserisni fjalekalimin!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</>
				)}
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						{path === "/signIn" ? "Identifikohu" : "Regjistrohu"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default SignUp;
