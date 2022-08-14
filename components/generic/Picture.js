import Image from "next/image";
import { useEffect, useState } from "react";

// https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs

const Picture = ({ src, fallback, width, height, ...rest }) => {
	const [source, setSource] = useState(src);

	const [dimension, setDimension] = useState({
		width: width,
		height: height,
	})

	function displayFallback() {
		if(fallback)
			setSource(fallback);
	}

	useEffect(() => {
		setSource(src);
	}, [src]);

	return (
		<Image
			{...rest}
			src={source}
			width={dimension.width ?? width}
			height={dimension.height ?? height}
			onLoadingComplete={(result) => {
				if (result.naturalWidth === 0) {
					displayFallback();
				} else if(result.naturalWidth !== 0) {
					// If image is not broken, then resize the image to be its original size.
					setDimension({
						width: result.naturalWidth,
						height: result.naturalHeight
					})
				}
			}}
			// https://github.com/vercel/next.js/discussions/21921
			onErrorCapture={() => {
				displayFallback();
			}}
		/>
	);
};

export default Picture;
