const FormInput = ({ changehandler, label, ...otherProps }) => (
	<div className="flex gap-3 items-center w-3/12 justify-center ">
		{label && <label className="w-24">{label}</label>}
		<input
			onChange={changehandler}
			{...otherProps}
			className="rounded-full h-10 bg-gray-200 px-5  focus:outline-none"
		/>
	</div>
);

export default FormInput;
