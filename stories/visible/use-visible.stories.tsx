import { useRef } from "react";
import { useVisible } from "../../src";

export default {
  title: "useVisible",
  component: useVisible,
};

export const Basic = () => {
  const elementRef = useRef(null);
  const isVisible = useVisible(elementRef);

  return (
    <div>
      <p
        style={{ position: "fixed", fontWeight: "bold", color: "red", zIndex: 2 }}
      >{`Title is visible: ${isVisible}`}</p>
      <h1 ref={elementRef}>Title</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et tortor rutrum,
        sollicitudin neque eu, mollis mi. Mauris mollis neque eu purus volutpat, sed sollicitudin
        risus placerat. Proin ornare magna in nisi ullamcorper, a pharetra velit ultricies. Ut
        tincidunt tellus et ex elementum scelerisque. Integer faucibus, erat nec pellentesque
        commodo, ligula turpis egestas lacus, at sagittis quam ante non ex. Morbi cursus, turpis
        auctor tempus venenatis, leo sem lacinia enim, tristique semper urna diam sed magna. Cras
        vitae tortor est. Cras vitae mattis sapien. Mauris hendrerit mollis egestas. Nulla augue
        eros, vestibulum in mollis et, ultricies at sem. Vivamus sed pretium elit, id vestibulum
        justo. Nam sed quam ex. Nam convallis augue et lorem accumsan, molestie bibendum erat
        bibendum. Morbi varius, dui sed viverra eleifend, nunc mauris rhoncus ligula, non feugiat
        sem urna sit amet metus. Sed in ante nisl. Vestibulum ac risus ipsum. Duis quis lacus magna.
        Maecenas at justo neque. Quisque posuere mi quis fringilla dapibus. Nulla non lorem
        consectetur, egestas est in, semper arcu. Praesent et nunc non nisl tincidunt dignissim.
        Curabitur porta purus non porttitor viverra. Suspendisse potenti. Pellentesque id leo in
        metus tempor cursus. Donec in ultrices ligula, in facilisis lacus. Cras eros tellus, ornare
        pulvinar congue eu, viverra nec ipsum. Proin laoreet arcu ac imperdiet pretium. Mauris
        placerat pulvinar mauris, ac convallis enim semper ac. Aenean et mi eget velit egestas
        commodo a nec metus. Curabitur in mi quis lacus tempus aliquet. Aliquam imperdiet, lorem a
        sagittis lobortis, nisi purus accumsan orci, in euismod magna quam sit amet turpis. Etiam
        quam diam, consectetur id fermentum at, rhoncus eget est. Sed gravida, magna in sollicitudin
        semper, neque risus dapibus dui, sed semper augue lorem eget nulla. Cras et pretium mi, quis
        auctor massa. Nulla convallis ipsum nunc, a maximus sem porta ac. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent sed dui nec
        ex sodales viverra. Sed vehicula ornare urna, a hendrerit ante tristique vel. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Praesent et tortor rutrum, sollicitudin neque
        eu, mollis mi. Mauris mollis neque eu purus volutpat, sed sollicitudin risus placerat. Proin
        ornare magna in nisi ullamcorper, a pharetra velit ultricies. Ut tincidunt tellus et ex
        elementum scelerisque. Integer faucibus, erat nec pellentesque commodo, ligula turpis
        egestas lacus, at sagittis quam ante non ex. Morbi cursus, turpis auctor tempus venenatis,
        leo sem lacinia enim, tristique semper urna diam sed magna. Cras vitae tortor est. Cras
        vitae mattis sapien. Mauris hendrerit mollis egestas. Nulla augue eros, vestibulum in mollis
        et, ultricies at sem. Vivamus sed pretium elit, id vestibulum justo. Nam sed quam ex. Nam
        convallis augue et lorem accumsan, molestie bibendum erat bibendum. Morbi varius, dui sed
        viverra eleifend, nunc mauris rhoncus ligula, non feugiat sem urna sit amet metus. Sed in
        ante nisl. Vestibulum ac risus ipsum. Duis quis lacus magna. Maecenas at justo neque.
        Quisque posuere mi quis fringilla dapibus. Nulla non lorem consectetur, egestas est in,
        semper arcu. Praesent et nunc non nisl tincidunt dignissim. Curabitur porta purus non
        porttitor viverra. Suspendisse potenti. Pellentesque id leo in metus tempor cursus. Donec in
        ultrices ligula, in facilisis lacus. Cras eros tellus, ornare pulvinar congue eu, viverra
        nec ipsum. Proin laoreet arcu ac imperdiet pretium. Mauris placerat pulvinar mauris, ac
        convallis enim semper ac. Aenean et mi eget velit egestas commodo a nec metus. Curabitur in
        mi quis lacus tempus aliquet. Aliquam imperdiet, lorem a sagittis lobortis, nisi purus
        accumsan orci, in euismod magna quam sit amet turpis. Etiam quam diam, consectetur id
        fermentum at, rhoncus eget est. Sed gravida, magna in sollicitudin semper, neque risus
        dapibus dui, sed semper augue lorem eget nulla. Cras et pretium mi, quis auctor massa. Nulla
        convallis ipsum nunc, a maximus sem porta ac. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Praesent sed dui nec ex sodales
        viverra. Sed vehicula ornare urna, a hendrerit ante tristique vel.
      </p>
    </div>
  );
};
