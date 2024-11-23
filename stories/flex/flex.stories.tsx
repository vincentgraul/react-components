import { Flex } from "../../src";

export default {
  title: "Flex",
  component: Flex,
};

export const Basic = () => (
  <>
    <h1>Title</h1>
    <Flex justify="space-between" align="center" padding={{ top: "5%", bottom: "5%" }}>
      <Flex direction="column" align="center" width="50%" margin="10%">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis est at ipsum
          tempor, id elementum odio sollicitudin. Nam accumsan est diam, vitae semper ex dignissim
          lacinia. Morbi vitae massa dapibus, posuere ex ac, rhoncus justo. Curabitur sed varius
          mauris. Nam posuere augue metus, finibus faucibus nulla ullamcorper sed. Vivamus venenatis
          nec lorem quis scelerisque. Suspendisse at elit sed purus commodo vestibulum. Donec sed
          lorem nulla. Nam dolor urna, posuere eget maximus ac, eleifend quis nibh. Maecenas
          interdum porta metus, eu accumsan nunc facilisis nec. Nam id placerat tellus.
        </p>
        <button>Next</button>
      </Flex>
      <Flex direction="column" align="center" width="50%">
        <p>Lorem ipsum dolor sit amet</p>
        <button>Next</button>
      </Flex>
    </Flex>
  </>
);
