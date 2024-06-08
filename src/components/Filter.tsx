import { useState } from 'react';

function Filter({
  children,
  onFilterClick,
  isActivable = true,
}: {
  children: string;
  onFilterClick: (children: string, active: boolean) => void;
  isActivable?: boolean;
}) {
  const [active, setActive] = useState(false);

  function handleClick() {
    onFilterClick(children, !active);

    if (isActivable) setActive(!active);
  }

  return (
    <button
      onClick={handleClick}
      className="bg-slate-600 hover:bg-slate-500 transform transition duration-150 ease-in-out hover:scale-105 p-2 rounded-md m-2"
    >
      {children} {active && '✅'}
    </button>
  );
}

export default Filter;
