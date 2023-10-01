import renderer from "react-test-renderer";
import StartDateComp from "../StartDateComp/StartDateComp";

it("changes the class when hovered", () => {
  const component = renderer.create(<StartDateComp></StartDateComp>);
  let tree = component.toJSON() as any;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    tree.props.onSubmitDate();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
