import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Select } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};
let selectedVal = [];
function handleChange(val) {
	selectedVal.push(val);
}
function handleDeselect(val) {
	const index = selectedVal.indexOf(val);
	selectedVal.splice(index, 1);
}
function findRow(record, field, self, generateOption) {
	const row = self.state.dataSource.find((row) => row._id === record._id)[
		field
	];
	if (generateOption)
		return row.map((item) => (
			<Option key={item} value={item}>
				{item}
			</Option>
		));
	return row;
}
const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} eshte i detyrueshem.`,
					},
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

class Students extends React.Component {
	constructor(props) {
		super(props);

		this.columns = [
			{
				title: "NID studenti",
				dataIndex: "nid",
				editable: true,
			},
			{
				title: "Emer studenti",
				dataIndex: "name",
				editable: true,
			},
			{
				title: "Mbiemer studenti",
				dataIndex: "surname",
				editable: true,
			},
			{
				title: "Nota mesatare",
				dataIndex: "avgGrade",
				editable: true,
			},
			{
				title: "Profesioni i deshiruar",
				dataIndex: "desiredProfession",
				editable: true,
			},
			{
				title: "Te dhena te pergjithshme",
				dataIndex: "generalData",
				editable: true,
			},

			{
				title: "Zgjidh Lende per subscribe",
				dataIndex: "subjects",
				render: (_, record) => (
					<Select
						mode="multiple"
						style={{ width: "100%" }}
						onSelect={handleChange}
						onDeselect={handleDeselect}
						showArrow
						placeholder="Subscribe lendet"
					>
						{findRow(record, "subjects", this, true)}
					</Select>
				),
			},
			{
				title: "Lendet ku jeni subscribe",
				dataIndex: "subscribed",
				render: (_, record) => (
					<Select
						style={{ width: "100%" }}
						defaultValue={findRow(record, "subscribed", this).join(",")}
						optionLabelProp="label"
						placeholder="Lendet ku jeni subscribe"
					>
						{findRow(record, "subscribed", this, true)}
					</Select>
				),
			},
			{
				title: "Ruaj te dhenat",
				dataIndex: "operation",
				render: (_, record, restProps) =>
					this.state.dataSource.length >= 1 ? (
						<Popconfirm
							title="Deshironi te ruani te dhenat per kete rekord ?"
							onConfirm={() => this.handleUpdate(record, restProps)}
						>
							<a>Ruaj</a>
						</Popconfirm>
					) : null,
			},
			{
				title: "Fshi te dhenat",
				dataIndex: "operation",
				render: (_, record) =>
					this.state.dataSource.length >= 1 ? (
						<Popconfirm
							title="Jeni I sigurt qe doni te fshini rekordin?"
							onConfirm={() => this.handleDelete(record.key)}
						>
							<a>Delete</a>
						</Popconfirm>
					) : null,
			},
		];
		this.state = {
			dataSource: [],
			count: this.dataSource,
		};
	}
	async componentDidMount() {
		const data = await fetch("http://localhost:8000/api/v1/users");
		const parsed = await data.json();
		parsed.data.forEach((item) => (item.key = item._id));
		this.setState({
			dataSource: parsed.data,
			count: this.state.dataSource.length,
		});
	}

	handleUpdate = async (record, restProps) => {
		record.subscribed = selectedVal;
		await fetch(`http://localhost:8000/api/v1/users/${record._id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(record),
		});
	};

	handleAdd = () => {
		const { count, dataSource } = this.state;
		const newData = {
			key: count + 1,
			_id: "a8017216-50ad-4c0a-91f4-06237b11cf2d",
			nid: "Plotesoni te dhenat",
			name: "Plotesoni te dhenat",
			surname: "Plotesoni te dhenat",
			age: "Plotesoni te dhenat",
			address: "Plotesoni te dhenat",
		};
		this.setState({
			dataSource: [...dataSource, newData],
			count: count + 1,
		});
	};
	handleSave = (row) => {
		const newData = [...this.state.dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		this.setState({
			dataSource: newData,
		});
	};
	handleDelete = async (key) => {
		await fetch(`http://localhost:8000/api/v1/users/${key}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		<div>Hiiii</div>;

		const dataSource = [...this.state.dataSource];
		this.setState({
			dataSource: dataSource.filter((item) => item.key !== key),
		});
	};

	render() {
		const { dataSource } = this.state;
		const components = {
			body: {
				row: EditableRow,
				cell: EditableCell,
			},
		};
		const columns = this.columns.map((col) => {
			if (!col.editable) {
				return col;
			}

			return {
				...col,
				onCell: (record) => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: this.handleSave,
				}),
			};
		});
		return (
			<div className="w-[90%] m-auto mt-5 ">
				<Button
					onClick={this.handleAdd}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					Shto nje rrjesht te ri
				</Button>

				<Table
					components={components}
					rowClassName={() => "editable-row"}
					bordered
					dataSource={dataSource}
					columns={columns}
				/>
			</div>
		);
	}
}

export default Students;
