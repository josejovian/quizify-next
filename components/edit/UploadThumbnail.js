import clsx from "clsx";
import { useState } from "react";
import { connect } from "react-redux";
import Button from "../generic/Button";
import Picture from "../generic/Picture";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const UploadThumbnail = ({ index, thumbnail = null, saveThumbnail }) => {
	const [disabled, setDisabled] = useState(false);
	const [file, setFile] = useState(thumbnail);
	const [errors, setErrors] = useState([]);

	const identifier = (column = "") => `question-thumbnail-upload${column}`;

	async function readFile() {
		const input = document.getElementById(identifier("fake"));

		// https://stackoverflow.com/a/57272491
		async function toBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});
		}

		if (input && input.files) {
			setErrors([]);
			const file = input.files[0];
			const tempErrors = [];
			let base64 = await toBase64(file);

			if (file.size / 1024 / 1024 > 1)
				tempErrors.push("Image size must be less than 1 MB.");

			if (!file.name.match(/(.png|.jpg)$/))
				tempErrors.push("Image extension must be either .png or .jpg.");

			if (file.size === 0 || base64 === "")
				tempErrors.push("Image must not be empty.");

			if (tempErrors.length === 0) {
				setFile(base64);
				saveThumbnail(base64);
			} else {
				setErrors(tempErrors);
			}
		}
	}

	return (
		<div className={clsx("")}>
			<h2>Upload Thumbnail for Question {index}</h2>
			<div
				className={clsx(
					"w-80 mt-4 p-4",
					"flex flex-col items-center justify-center",
					"border-2 border-dashed border-gray-400",
					""
				)}
			>
				<span className="text-lg text-gray-500">
					Drag and drop the image here
				</span>
				<div className="flex flex-row items-center w-full p-4">
					<hr className="w-full border" />
					<span className="px-4">OR</span>
					<hr className="w-full border" />
				</div>
				<div className="relative">
					<input
						className="absolute left-0 top-0 opacity-0 w-full bg-transparent"
						id={identifier("fake")}
						name={identifier("fake")}
						onChange={readFile}
						type="file"
						placeholder="lastName"
					/>
					<div className="flex flex-col">
						<Button
							className="mt-2 w-full"
							variant="secondary"
							isDisabled={disabled}
						>
							Select Image
						</Button>
						<ul className="mt-4 text-sm text-gray-500">
							<li>Maximum image size is 1 MB.</li>
							<li>Extensions allowed: .png, .jpg.</li>
						</ul>
					</div>
				</div>
			</div>
			{errors && (
				<div className="flex flex-col mt-2">
					{
						errors.map((error) => (
							<span
								key={`error-${error}`}
								className="mt-2 text-left text-red-500"
							>
								{error}
							</span>
						))
					}
				</div>
			)}
			{file && (
				<div className="flex flex-col mt-8">
					<div className="w-fit">
						<Picture
							src={file}
							width="320"
							height="180"
						/>
					</div>
					<Button variant="danger" className="mt-8" onClick={() => {
						setFile(null);
						saveThumbnail(null);
					}}>
						Remove Thumbnail
					</Button>
				</div>
			)}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadThumbnail);
