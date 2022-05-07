import Image from "next/image";

const Landing = () => {
	return (
		<>
			<div
				id="landing-background"
				className="absolute top-0 left-0 w-screen h-screen opacity-20"
			>
				<Image src="/landing.jpg" layout="fill" />
			</div>
			<div className="flex flex-col items-center justify-center text-center">
				<h1 className="text-4xl md:text-8xl z-20">Quizify</h1>
				<p className="mt-8 text-xl md:text-4xl z-20">
					Make, do and review quizzes.
					<br />
					Sign up to gain access to the site's features.
				</p>
			</div>
		</>
	);
};

export default Landing;
