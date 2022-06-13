import useMatchResolution from "./useMatchResolution";
import mountReactHook from "../mount-react-hook/mountReactHook";

describe("useMatchResolution", () => {
  let addResizeListener: jest.SpyInstance;
  let removeResizeListener: jest.SpyInstance;

  const MatchResolution = (props: ObjectLiteral) => props.children(useMatchResolution());

  beforeAll(() => {
    addResizeListener = jest.spyOn(window, "addEventListener");
    removeResizeListener = jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add 'resize' event when component is mounted", () => {
    mountReactHook(MatchResolution);

    expect(addResizeListener).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("should remove 'resize' event when component is unmounted", () => {
    const { unmount } = mountReactHook(MatchResolution);

    unmount();

    expect(removeResizeListener).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
