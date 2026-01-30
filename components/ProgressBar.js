export default function ProgressBar({completed,total,percentage}) {
    return(
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>
                    Progress: {completed}/{total}
                </span>
                <span>{percentage}</span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded">
                <div
                    className="h-3 bg-green-500 rounded transition-all"
                    style={{width: `${percentage}%`}}
                />
            </div>
        </div>
    );
}