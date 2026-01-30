import Link from "next/link";

export default function ProblemCard({problem,disabled}) {
    const {quizTag,title,difficulty,completed} = problem;

    return(
        <div className="border rounded p-4 flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{difficulty}</p>
            </div>

            {completed?(
                <span className="text-green-600 font-medium">Completed</span>
            ):(
                <Link
                    href={disabled ? '#':`/quiz/${quizTag}`}
                    className={`px-4 py-2 rounded text-sm ${
                        disabled
                        ? "bg-gray-300 cursor-not-allowed"
                        :"bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                Start
                </Link>
            )}
        </div>
    );
}