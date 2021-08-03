function Button({ name, isBlack }) {
	return (
		<button
			className={`${
				isBlack && "bg-black text-white"
			} p-3 w-80 rounded-full mt-3 ml-3`}
		>
			{name}
		</button>
	);
}

export default Button;
