import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { MdPerson, MdAccessTimeFilled, MdQuestionAnswer } from "react-icons/md";
import { connect } from "react-redux";
import Button from "../generic/Button";
import Card from "../generic/Card";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Props = ({ children }) => {
	return (
		<div className="flex flex-row items-center w-max subtle mr-4">
			{children}
		</div>
	);
};
const Work = ({ work, isOwner }) => {
	const bigScreenStyle = "hidden md:flex",
		smallScreenStyle = "flex md:hidden";
	const workSpecialActionStyle = "mt-2 sm:ml-2 sm:mt-0";

	return (
		<Card>
			<h2>{work.quiz ? work.quiz.name : "Removed Quiz"}</h2>
			<p>
				{work.quiz
					? work.quiz.desc
					: "The quiz was deleted by the owner, so you can't view it anymore."}
			</p>
			<hr className="mt-4" />
			<div className="flex justify-between flex-col md:flex-row mt-4">
				<div className="flex overflow-x-auto">
					<Props>
						<MdPerson className="mr-2" />
						<span>{work.author.username}</span>
					</Props>
					<Props>
						<MdAccessTimeFilled className="mr-2" />
						<span>{new Date(work.start).toLocaleTimeString()}</span>
					</Props>
				</div>
				{work.quiz && (
					<div className="flex flex-col sm:flex-row mt-4 md:mt-0">
						<Link href={`/review/${work._id}`}>
							<a>
								<Button className={workSpecialActionStyle}>
									Review
								</Button>
							</a>
						</Link>
					</div>
				)}
			</div>
		</Card>
	);
};

const Works = ({ works, author, loggedIn }) => {
	useEffect(() => {
		console.log(works);
	}, []);
	const workElements = works
		.filter((x) => x.quiz)
		.map((work) => {
			return (
				<Work
					key={work._id}
					work={work}
					isOwner={work.author.username === loggedIn.username}
				/>
			);
		});

	return (
		<div className="pt-16">
			<h1 className="text-center">{author.username}&quot;s Works</h1>
			<div
				className={clsx(
					"w-screen px-8 lg:px-32 py-16",
					"grid gap-4 grid-cols-1 2xl:grid-cols-2"
				)}
			>
				{workElements}
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Works);
