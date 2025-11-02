import Link from "next/link";

const Home = () => {
    return (
    <div className="h-screen w-screen font-bold text-4xl text-white bg-violet-800 text-center">
      <Link href="/quiz">شروع</Link>
    </div>
    );
};

export default Home;