import usePagination from "./usePagination";
import mountReactHook from "../mount-react-hook/mountReactHook";

describe("usePagination", () => {
  const Pagination = (props: ObjectLiteral) =>
    props.children(
      usePagination({
        page: 1,
        totalRecords: 15,
        maxRecordsPerPage: 10,
        itemNeighbours: 2,
        minItems: 5,
      }),
    );

  it("should return correct values", () => {
    const { value } = mountReactHook(Pagination);

    expect(value.page).toBe(1);
    expect(value.total).toBe(2);
    expect(value.items).toEqual([1, 2]);
    expect(value.maxRecordsPerPage).toBe(10);
  });
});
