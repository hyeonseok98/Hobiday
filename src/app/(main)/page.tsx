import HomeDefault from "@/assets/icons/home-default.svg";
import LoadingSpinner from "@/components/commons/spinner";

export default function HomePage() {
  return (
    <section>
      <h2 className="font-bold text-2xl underline">Homepage</h2>
      <LoadingSpinner />

      <HomeDefault />
      <HomeDefault className="fill-blue-300" />
    </section>
  );
}
