import PersonaCard from "../components/card/personaCard";
import { MOCK_PERSONA_DATA } from "../constants/mockData";

export default function Home() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto p-6">
      <div className="w-[95%] h-[92%] grid grid-cols-12 grid-rows-11 gap-4">
        <PersonaCard
          className="col-span-3 row-span-11"
          data={MOCK_PERSONA_DATA}
        />
        {/* div들 더 채워넣기 */}
      </div>
    </div>
  );
}
