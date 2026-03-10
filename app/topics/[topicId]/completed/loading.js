export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-pulse">
        <div className="h-12 w-12 rounded-full bg-green-100 mx-auto mb-4" />
        <div className="h-8 w-56 bg-gray-200 mx-auto mb-3 rounded" />
        <div className="h-5 w-3/4 bg-gray-100 mx-auto mb-8 rounded" />
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-3">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-5/6 bg-gray-100 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />
        </div>
        <div className="h-10 w-full bg-black rounded-lg mb-3" />
        <div className="h-4 w-44 bg-gray-100 rounded mx-auto" />
      </div>
    </div>
  );
}
