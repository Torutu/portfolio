import { usePage } from "../pageContext";

export function RightSide() {
  const { page } = usePage();

  return (
    <div className="rightSide">
      <div className="rightSide__inner">
        <h1 className="rightSide__h">{page}</h1>
      </div>
    </div>
  );
}
