import Filters from '@/components/Filters';
import ReadyMadeFilters from '@/components/ReadyMadeFilters';
import ManualFilter from './ManualFilter';

function FilterPage() {
  return (
    <div>
      <ReadyMadeFilters />

      <div className="w-full gap-4 p-4 px-12 m-2 my-5 bg-gray-800 shadow-md rounded-md flex flex-col items-center">
        <Filters />
      </div>
      <ManualFilter />
    </div>
  );
}

export default FilterPage;
