export default function RepoCard({ className = "" }: { className?: string }) {
  return (
    // 💡 원래 있던 클래스명 맨 뒤에 ${className}을 싹 더해줍니다!
    <div
      className={`w-full h-full bg-mainbg border-2 border-magenta p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg ${className}`}
    >
      <h2 className="text-xl font-bold text-white mb-4">Repository</h2>
      <p className="text-lg text-white">Repository Area</p>
    </div>
  );
}
