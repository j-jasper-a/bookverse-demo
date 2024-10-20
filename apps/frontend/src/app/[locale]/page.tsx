import { helloFromLibsInside } from "@bookverse-demo/libs/hello/hello";

export default function Home() {
  return (
    <main>
      <p>Hello, world.</p>
      <p>{helloFromLibsInside()}</p>
    </main>
  );
}
